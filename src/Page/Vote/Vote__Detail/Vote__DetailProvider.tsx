import axios from "axios";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    RefObject,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../App/AppProvider";
import { API_ENDPOINT } from "../../../Constant";
import { RedirectedVoteIdProp, VoteProp, ChildrenProp } from "../../../Type";

type VoteDetailContextProp = {
    vote: VoteProp | null;
};

const InitialVoteDetailContext: VoteDetailContextProp = {
    vote: null,
};

const VoteDetailContext = createContext(InitialVoteDetailContext);
export function useVoteDetailContext() {
    return useContext(VoteDetailContext);
}

export default function VoteDetailProvider({ children }: ChildrenProp) {
    const location = useLocation();
    const navigate = useNavigate();
    const { setFirstVisitFlag } = useAppContext();
    const [vote, setVote] = useState<VoteProp | null>(null);

    useEffect(() => {
        const vote = location.state as RedirectedVoteIdProp | VoteProp;
        // url을 수기로 쳐서 들어온 경우
        if (!vote) {
            navigate("/", { replace: true });
        } else {
            // 처음 접속하여 홈 화면에서 리다이렉트된 경우
            if ("voteId" in vote) {
                setFirstVisitFlag(false);
            }
            // 홈 화면에서 버튼을 눌러 들어온 경우
            else {
                setVote(vote);
            }
        }

        return () => {};
    }, []);

    async function getVoteDetail(): Promise<boolean> {
        let vote;
        await axios
            .get<VoteProp>(`${API_ENDPOINT}/`)
            .then((res) => {
                vote = res.data;
            })
            .catch((error) => {
                console.error(`[ERROR]: ${error}`);
            });

        if (vote) {
            setVote(vote);
            return true;
        } else {
            return false;
        }
    }

    const voteDetailContext = { vote };

    return (
        <VoteDetailContext.Provider value={voteDetailContext}>
            {children}
        </VoteDetailContext.Provider>
    );
}
