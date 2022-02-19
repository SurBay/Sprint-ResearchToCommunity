import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    RefObject,
} from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
import { isUserConnectOnMobile, initializeKakaoSDK } from "../Util";
import { TempUserProp, VoteProp, initialTempUser, ChildrenProp } from "../Type";
import { API_ENDPOINT } from "../Constant";
import { handleAxiosError } from "../Axios/axios.error";

type AppContextProp = {
    tempUserInfo: TempUserProp;
    firstVisitFlag: boolean;
    connectOnMobile: boolean;
    allVote?: RefObject<VoteProp[]>;
    allVoteLoaded: boolean;
    hotVotes: VoteProp[];
    recentVotes: VoteProp[];
    setTempUserInfo: (userInfo: TempUserProp) => void;
    setFirstVisitFlag: (state: boolean) => void;
    loadVote: () => void;
    updateUserVoteParticipationInfo: (userId: string) => void;
    updateVoteParticipatedUserInfo: (updatedVote: VoteProp) => void;
};

const InitialAppContext: AppContextProp = {
    tempUserInfo: initialTempUser,
    firstVisitFlag: true,
    connectOnMobile: true,
    allVoteLoaded: false,
    hotVotes: [],
    recentVotes: [],
    setTempUserInfo: () => {},
    setFirstVisitFlag: () => {},
    loadVote: () => {},
    updateUserVoteParticipationInfo: () => {},
    updateVoteParticipatedUserInfo: () => {},
};

const AppContext = createContext(InitialAppContext);
export function useAppContext() {
    return useContext(AppContext);
}

export default function AppProvider({ children }: ChildrenProp) {
    const cookies = new Cookies();
    const [tempUserInfo, setTempUserInfo] =
        useState<TempUserProp>(initialTempUser);
    const [firstVisitFlag, setFirstVisitFlag] = useState<boolean>(true);
    const [connectOnMobile, setConnectOnMobile] = useState<boolean>(true);
    const [hotVotes, setHotVotes] = useState<VoteProp[]>([]);
    const [recentVotes, setRecentVotes] = useState<VoteProp[]>([]);
    const votePage = useRef<number>(0); // InfiniteScroll시 스킵하고 가져올 vote page
    const allVote = useRef<VoteProp[]>([]);
    const [allVoteLoaded, setAllVoteLoaded] = useState<boolean>(false);

    // 카카오 SDK 활성화 + 접속환경이 모바일인지 확인
    useEffect(() => {
        // BEFORE PUBLISH: 카카오톡 initialize 조건 변경
        // if (!isUserConnectOnMobile()) {
        //     setConnectOnMobile(false);
        // } else {
        // 처음 접속하면: 카카오톡 API 사용 설정, 모든 투표 설정, 접속했던 유저 설정
        initializeKakaoSDK();
        getAllVote();
        getUserInfo();
        // }
        return;
    }, []);

    // 전체 투표 로드: 현재는 절대적인 투표 수가 적으므로 가능한 방식
    async function getAllVote() {
        await axios
            .get<VoteProp[]>(`${API_ENDPOINT}/api/votes`)
            .then((res) => {
                allVote.current = res.data;
                setHotVotes(res.data.slice(0, 1));
                setRecentVotes(res.data.slice(0, 9));
                votePage.current += 1;
            })
            .catch((error) => {
                handleAxiosError(error, getAllVote.name);
            });
        setAllVoteLoaded(true);
        return;
    }

    // 쿠키에 사용자 정보가 있는 경우 백엔트에서 사용자 정보를 받아옴
    async function getUserInfo() {
        const email = cookies.get("email");
        const kakaoId = cookies.get("kakaoId");
        const jwt = cookies.get("jwt");
        if ((email || kakaoId) && jwt) {
            await axios
                .get<TempUserProp | null>(
                    `${API_ENDPOINT}/api/temp-users?email=${email}&kakaoId=${kakaoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                )
                .then((res) => {
                    if (res.data) {
                        setTempUserInfo(res.data);
                    }
                })
                .catch((error) => {
                    handleAxiosError(error, getUserInfo.name);
                });
        }
    }

    // InfiniteScroll: 10개씩 투표 로드
    function loadVote() {
        if (votePage.current * 10 < allVote.current.length) {
            const nextVotes = allVote.current.slice(
                votePage.current * 10,
                votePage.current * 10 + 9
            );
            setRecentVotes((recentVotes) => [...recentVotes, ...nextVotes]);
            votePage.current += 1;
        }
    }

    // 투표 참여시 tempUserInfo에 반영 (VoteDetailProvider에서 사용)
    function updateUserVoteParticipationInfo(participatedVoteId: string) {
        const updatedUserInfo = { ...tempUserInfo };
        updatedUserInfo.participatedVoteIds.push(participatedVoteId);
        setTempUserInfo(updatedUserInfo);
    }

    // 투표 참여시 recentVotes, allVote에 반영 (VoteDetailProvider에서 사용)
    function updateVoteParticipatedUserInfo(updatedSelectedVote: VoteProp) {
        const index = allVote.current.findIndex((vote) => {
            return vote._id == updatedSelectedVote._id;
        });

        if (index != -1) {
            // recentVote 업데이트
            const updatedRecentVotes = { ...recentVotes };
            updatedRecentVotes[index] = updatedSelectedVote;
            setRecentVotes(updatedRecentVotes);
            // allVote 업데이트
            allVote.current[index] = updatedSelectedVote;
        }
    }

    const appContext = {
        tempUserInfo,
        firstVisitFlag,
        connectOnMobile,
        allVote,
        allVoteLoaded,
        hotVotes,
        recentVotes,
        setTempUserInfo,
        setFirstVisitFlag,
        loadVote,
        updateUserVoteParticipationInfo,
        updateVoteParticipatedUserInfo,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
