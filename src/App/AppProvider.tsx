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
import { initializeKakaoSDK } from "../Util/kakao.util";
import { isUserConnectOnMobile } from "../Util/environment";
import { ModalType } from "../Enum";
import { VoteProp, NumberedVoteProp, ChildrenProp } from "../Type";
import { API_ENDPOINT } from "../Constant";

type AppContextProp = {
    modalType: ModalType | null;
    userEmail: string | undefined;
    firstVisitFlag: boolean;
    connectOnMobile: boolean;
    hotVotes: NumberedVoteProp[];
    recentVotes: NumberedVoteProp[];
    allVote?: RefObject<NumberedVoteProp[]>;
    setModalType: (modalType: ModalType | null) => void;
    setFirstVisitFlag: (state: boolean) => void;
    loadVote: () => void;
};

const InitialAppContext: AppContextProp = {
    modalType: null,
    userEmail: undefined,
    firstVisitFlag: true,
    connectOnMobile: true,
    hotVotes: [],
    recentVotes: [],
    setModalType: () => {},
    setFirstVisitFlag: () => {},
    loadVote: () => {},
};

const AppContext = createContext(InitialAppContext);
export function useAppContext() {
    return useContext(AppContext);
}

export default function AppProvider({ children }: ChildrenProp) {
    const cookies = new Cookies();
    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
    const [firstVisitFlag, setFirstVisitFlag] = useState<boolean>(true);
    const [connectOnMobile, setConnectOnMobile] = useState<boolean>(true);
    const [hotVotes, setHotVotes] = useState<NumberedVoteProp[]>([]);
    const [recentVotes, setRecentVotes] = useState<NumberedVoteProp[]>([]);
    const votePage = useRef<number>(0);
    const allVote = useRef<NumberedVoteProp[]>([]);

    // 카카오 SDK 활성화 + 접속환경이 모바일인지 확인
    useEffect(() => {
        if (!isUserConnectOnMobile()) {
            setConnectOnMobile(false);
        } else {
            initializeKakaoSDK();

            const email = cookies.get("email");
            if (email) {
                setUserEmail(email);
            }
        }
        return;
    }, []);

    // 전체 투표 세팅
    useEffect(() => {
        getAllVote();
        return;
    }, []);

    async function getAllVote() {
        await axios
            .get<VoteProp[]>(`${API_ENDPOINT}/api/votes`)
            .then((res) => {
                const numberedVotes: NumberedVoteProp[] = res.data.map(
                    (vote, index) => {
                        return { ...vote, index };
                    }
                );
                setHotVotes(numberedVotes.slice(0, 1));
                setRecentVotes(numberedVotes.slice(0, 9));
                allVote.current = numberedVotes;
                votePage.current += 1;
            })
            .catch((error) => {
                console.error(error);
            });

        return;
    }

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

    const appContext = {
        modalType,
        userEmail,
        firstVisitFlag,
        connectOnMobile,
        hotVotes,
        recentVotes,
        allVote,
        setModalType,
        setFirstVisitFlag,
        loadVote,
    };

    return (
        <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
    );
}
