import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    RefObject,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../App/AppProvider";
import { API_ENDPOINT } from "../../../Constant";
import { VoteProp, ChildrenProp } from "../../../Type";

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
    const { allVote } = useAppContext();
    const [vote, setVote] = useState<VoteProp | null>(null);
    const [selectedOption, setSelectedOption] = useState<VoteProp | null>(null);

    useEffect(() => {
        const voteId = location.state as string;
        // url을 수기로 쳐서 들어온 경우
        if (!voteId) {
            navigate("/", { replace: true });
        } else {
            // 처음 접속하여 홈 화면에서 리다이렉트된 경우
            getVoteDetail(voteId);
        }

        return () => {};
    }, []);

    async function getVoteDetail(voteId: string) {
        await axios
            .get<VoteProp>(`${API_ENDPOINT}/api/votes/${voteId}`)
            .then((res) => {
                setVote(res.data);
            })
            .catch((error) => {
                navigate("/", { replace: true });
                console.error(`[ERROR]: ${error}`);
            });
    }

    const voteDetailContext = { vote };

    return (
        <VoteDetailContext.Provider value={voteDetailContext}>
            {children}
        </VoteDetailContext.Provider>
    );
}
