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
import { ModalType } from "../Enum";
import {
    TempUserProp,
    VoteProp,
    initialTempUser,
    initialVote,
    ChildrenProp,
} from "../Type";
import { API_ENDPOINT } from "../Constant";
import { handleAxiosError } from "../Axios/axios.error";

type AppContextProp = {
    modalType: ModalType | null;
    tempUserInfo: TempUserProp;
    firstVisitFlag: boolean;
    connectOnMobile: boolean;
    hotVotes: VoteProp[];
    recentVotes: VoteProp[];
    selectedVote: VoteProp;
    allVote?: RefObject<VoteProp[]>;
    setModalType: (modalType: ModalType | null) => void;
    setTempUserInfo: (userInfo: TempUserProp) => void;
    setSelectedVote: (vote: VoteProp) => void;
    setFirstVisitFlag: (state: boolean) => void;
    loadVote: () => void;
    updateUserVoteParticipationInfo: () => void;
    updateVoteParticipatedUserInfo: (selectedOptions: number[]) => void;
};

const InitialAppContext: AppContextProp = {
    modalType: null,
    tempUserInfo: initialTempUser,
    firstVisitFlag: true,
    connectOnMobile: true,
    hotVotes: [],
    recentVotes: [],
    selectedVote: initialVote,
    setModalType: () => {},
    setTempUserInfo: () => {},
    setSelectedVote: () => {},
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
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [tempUserInfo, setTempUserInfo] =
        useState<TempUserProp>(initialTempUser);
    const [firstVisitFlag, setFirstVisitFlag] = useState<boolean>(true);
    const [connectOnMobile, setConnectOnMobile] = useState<boolean>(true);
    const [hotVotes, setHotVotes] = useState<VoteProp[]>([]);
    const [recentVotes, setRecentVotes] = useState<VoteProp[]>([]);
    const [selectedVote, setSelectedVote] = useState<VoteProp>(initialVote);
    const votePage = useRef<number>(0); // InfiniteScroll시 스킵하고 가져올 vote page
    const allVote = useRef<VoteProp[]>([]);

    // 카카오 SDK 활성화 + 접속환경이 모바일인지 확인
    useEffect(() => {
        // BEFORE PUBLISH: 카카오톡 initialize 조건 변경
        initializeKakaoSDK();
        if (!isUserConnectOnMobile()) {
            setConnectOnMobile(false);
        } else {
            // initializeKakaoSDK();
            // TODO: 임시 유저 전체 정보 백엔드에서 가져올 것
            const email = cookies.get("email");
            if (email) {
                setTempUserInfo(email);
            }
        }
        return;
    }, []);

    useEffect(() => {
        // 처음 접속하면 전체 투표 세팅
        getAllVote();
        return;
    }, []);

    // 전체 투표 로드: 현재는 절대적인 투표 수가 적으므로 가능한 방식
    async function getAllVote() {
        await axios
            .get<VoteProp[]>(`${API_ENDPOINT}/api/votes`)
            .then((res) => {
                setHotVotes(res.data.slice(0, 1));
                setRecentVotes(res.data.slice(0, 9));
                allVote.current = res.data;
                votePage.current += 1;
            })
            .catch((error) => {
                handleAxiosError(error, getAllVote.name);
            });

        return;
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

    // 투표 참여시 userInfo에 반영
    function updateUserVoteParticipationInfo() {
        const updatedUserInfo = { ...tempUserInfo };
        updatedUserInfo.participatedVoteIds.push(selectedVote._id);
        setTempUserInfo(updatedUserInfo);
    }

    // 투표 참여시 selectedVote, recentVotes, allVote에 반영
    function updateVoteParticipatedUserInfo(selectedOptions: number[]) {
        const updatedSelectedVote = { ...selectedVote };
        selectedOptions.forEach((index) => {
            if (tempUserInfo.email) {
                updatedSelectedVote.polls[
                    index
                ].participatedTempUserEmails.push(tempUserInfo.email);
            }
            if (tempUserInfo.kakaoId) {
                updatedSelectedVote.polls[
                    index
                ].participatedTempUserKakaoIds.push(tempUserInfo.kakaoId);
            }
        });

        // selectedVote 업데이트
        setSelectedVote(updatedSelectedVote);
        const index = recentVotes.findIndex(
            (vote) => vote._id == selectedVote._id
        );
        if (index != -1) {
            // recentVote 업데이트
            const updatedRecentVotes = { ...recentVotes };
            updatedRecentVotes[index] = updatedSelectedVote;
            // allVote 업데이트
            allVote.current[index] = updatedSelectedVote;
        }
    }

    const appContext = {
        modalType,
        tempUserInfo,
        firstVisitFlag,
        connectOnMobile,
        hotVotes,
        recentVotes,
        selectedVote,
        allVote,
        setModalType,
        setTempUserInfo,
        setSelectedVote,
        setFirstVisitFlag,
        loadVote,
        updateUserVoteParticipationInfo,
        updateVoteParticipatedUserInfo,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
