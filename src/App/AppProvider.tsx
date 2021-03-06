import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    RefObject,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import ReactGA from "react-ga";
import {
    isUserConnectOnMobile,
    initializeKakaoSDK,
    isDatePassed,
} from "../Util";
import { TempUserProp, VoteProp, initialTempUser, ChildrenProp } from "../Type";
import { API_ENDPOINT } from "../Constant";
import { handleAxiosError } from "../Axios/axios.error";

export type LandingType =
    | "paidAd"
    | "Insta"
    | "AppNotice"
    | "PPo"
    | "koPas"
    | "kakao"
    | "EveryTime"
    | "seyoen"
    | "Dang"
    | "etc"
    | "unknown";

type CookieType =
    | "email"
    | "kakaoId"
    | "jwt"
    | "reservedVoteId"
    | "landingType"
    | "reservedSelectedOptions";

type AppContextProp = {
    landingType: LandingType;
    tempUserInfo: TempUserProp;
    firstVisitFlag: boolean;
    connectOnMobile: boolean;
    allVoteLoaded: boolean;
    showInteractiveComment: boolean;
    allVote?: RefObject<VoteProp[]>;
    hotVotes: VoteProp[];
    recentVotes: VoteProp[];
    getCookie: (name: CookieType) => string | number[];
    setCookie: (name: CookieType, value: string | number[]) => void;
    removeCookie: (name: CookieType) => void;
    setLandingType: (landingType: LandingType) => void;
    setTempUserInfo: (userInfo: TempUserProp) => void;
    setFirstVisitFlag: (state: boolean) => void;
    loadVote: () => void;
    applyUpdatedSelectedVote: (updatedVote: VoteProp) => void;
    setShowInteractiveComment: (state: boolean) => void;
};

const InitialAppContext: AppContextProp = {
    landingType: "unknown",
    tempUserInfo: initialTempUser,
    firstVisitFlag: true,
    connectOnMobile: true,
    allVoteLoaded: false,
    showInteractiveComment: true,
    hotVotes: [],
    recentVotes: [],
    getCookie: () => "",
    setCookie: () => {},
    removeCookie: () => {},
    setLandingType: () => {},
    setTempUserInfo: () => {},
    setFirstVisitFlag: () => {},
    loadVote: () => {},
    applyUpdatedSelectedVote: () => {},
    setShowInteractiveComment: () => {},
};

const AppContext = createContext(InitialAppContext);
export function useAppContext() {
    return useContext(AppContext);
}

export default function AppProvider({ children }: ChildrenProp) {
    const [cookies, setCookies, removeCookies] = useCookies([
        "email",
        "kakaoId",
        "jwt",
        "reservedVoteId",
        "reservedSelectedOptions",
        "landingType",
    ]);
    const [landingType, setLandingType] = useState<LandingType>("unknown");
    const [tempUserInfo, setTempUserInfo] =
        useState<TempUserProp>(initialTempUser);
    const [firstVisitFlag, setFirstVisitFlag] = useState<boolean>(true);
    const [connectOnMobile, setConnectOnMobile] = useState<boolean>(true);
    const [hotVotes, setHotVotes] = useState<VoteProp[]>([]);
    const [recentVotes, setRecentVotes] = useState<VoteProp[]>([]);
    const votePage = useRef<number>(0); // InfiniteScroll??? ???????????? ????????? vote page
    const allVote = useRef<VoteProp[]>([]);
    const [allVoteLoaded, setAllVoteLoaded] = useState<boolean>(false);
    const [showInteractiveComment, setShowInteractiveComment] =
        useState<boolean>(true);

    /////////////////////////////////////////////////////////////////////
    // useEffect Part

    // ????????? SDK ????????? + ??????????????? ??????????????? ??????
    useEffect(() => {
        // BEFORE PUBLISH: ???????????? initialize ?????? ??????
        // if (!isUserConnectOnMobile()) {
        //     setConnectOnMobile(false);
        // } else {
        // ?????? ????????????: ?????? ??????????????? ?????? ??????, ???????????? API ?????? ??????(index.html ????????? script), ?????? ?????? ??????, ???????????? ?????? ??????, ?????? ?????? ??????
        ReactGA.initialize("UA-221434188-1", {
            gaOptions: { userId: "221434188" },
        });
        initializeKakaoSDK();
        getAllVote();
        getUserInfo();
        getPreviousLandingType();
        // }
        return;
    }, []);

    // ?????? ?????? ??????: ????????? ???????????? ?????? ?????? ???????????? ????????? ??????
    async function getAllVote() {
        await axios
            .get<VoteProp[]>(`${API_ENDPOINT}/api/votes`)
            .then((res) => {
                allVote.current = res.data;
                getHotVotes(res.data.slice(0, 19));
                setRecentVotes(res.data.slice(0, 10));
                votePage.current += 1;
            })
            .catch((error) => {
                handleAxiosError(error, getAllVote.name);
            });
        setAllVoteLoaded(true);
        return;
    }

    // HOT ?????? ?????? (?????? ??? ?????? ???)
    async function getHotVotes(votes: VoteProp[]) {
        const liveVotes: VoteProp[] = [];
        const doneVotes: VoteProp[] = [];
        votes.forEach((vote) => {
            if (isDatePassed(vote.deadline)) {
                doneVotes.push(vote);
            } else {
                liveVotes.push(vote);
            }
        });
        liveVotes.sort((a, b) => {
            if (a.visit > b.visit) return -1;
            return 1;
        });
        doneVotes.sort((a, b) => {
            if (a.visit > b.visit) return -1;
            return 1;
        });

        setHotVotes([
            liveVotes[0],
            liveVotes[1],
            doneVotes[0],
            liveVotes[2],
            liveVotes[3],
            doneVotes[1],
        ]);
    }

    // ????????? ????????? ????????? ?????? ?????? ??????????????? ????????? ????????? ?????????
    async function getUserInfo() {
        const email = cookies.email;
        const kakaoId = cookies.kakaoId;
        const jwt = cookies.jwt;
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

    // useEffect Part
    /////////////////////////////////////////////////////////////////////

    // InfiniteScroll: 10?????? ?????? ??????
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

    // selectedVote ?????? ????????? recentVotes, allVote??? ?????? (VoteDetailProvider?????? ??????)
    function applyUpdatedSelectedVote(updatedSelectedVote: VoteProp) {
        const index = allVote.current.findIndex((vote) => {
            return vote._id == updatedSelectedVote._id;
        });

        if (index != -1) {
            // recentVote ????????????
            const updatedRecentVotes = [...recentVotes];
            updatedRecentVotes[index] = updatedSelectedVote;
            setRecentVotes(updatedRecentVotes);
            // allVote ????????????
            allVote.current[index] = updatedSelectedVote;
        }
    }

    function getPreviousLandingType() {
        const previousLandingType = getCookie("landingType");
        if (previousLandingType) setLandingType(previousLandingType);
    }

    // Cookie ?????? ??????
    type CookieKey = keyof typeof cookies;

    function getCookie(name: CookieKey) {
        return cookies[name] || "";
    }

    function setCookie(name: CookieKey, value: string | number[]) {
        setCookies(name, value, { path: "/" });
        return;
    }

    function removeCookie(name: CookieKey) {
        removeCookies(name);
        return;
    }

    const appContext = {
        landingType,
        tempUserInfo,
        firstVisitFlag,
        connectOnMobile,
        allVote,
        allVoteLoaded,
        showInteractiveComment,
        hotVotes,
        recentVotes,
        getCookie,
        setCookie,
        removeCookie,
        setLandingType,
        setTempUserInfo,
        setFirstVisitFlag,
        loadVote,
        applyUpdatedSelectedVote,
        setShowInteractiveComment,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
