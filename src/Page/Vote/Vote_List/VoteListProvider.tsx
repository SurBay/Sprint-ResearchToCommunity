import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../../App/AppProvider";
import { RedirectedVoteIdProp, VoteProp, ChildrenProp } from "../../../Type";

type VoteListContextProp = {
    displayingVotes: VoteProp[];
    selectedVoteId: string | null;
    setSelectedVoteId: (voteId: string | null) => void;
};

const InitialVoteListContext: VoteListContextProp = {
    displayingVotes: [],
    selectedVoteId: "",
    setSelectedVoteId: () => {},
};

const VoteListContext = createContext(InitialVoteListContext);
export function useVoteListContext() {
    return useContext(VoteListContext);
}

export default function VoteListProvider({ children }: ChildrenProp) {
    const initialVotes: VoteProp[] = [
        {
            _id: "123123",
            title: "다음 생에 고양이로 태어난다면",
            content: "닥전 아닙니까? ㅡㅡ",
            author: "작성자",
        },
        {
            _id: "456456",
            title: "다음 생에 고양이로 태어난다면",
            content: "닥전 아닙니까? ㅡㅡ",
            author: "작성자",
        },
        {
            _id: "789789",
            title: "다음 생에 고양이로 태어난다면",
            content: "닥전 아닙니까? ㅡㅡ",
            author: "작성자",
        },
        {
            _id: "012012",
            title: "다음 생에 고양이로 태어난다면",
            content: "닥전 아닙니까? ㅡㅡ",
            author: "작성자",
        },
        {
            _id: "345345",
            title: "다음 생에 고양이로 태어난다면",
            content: "닥전 아닙니까? ㅡㅡ",
            author: "작성자",
        },
    ];
    const navigate = useNavigate();
    const location = useLocation();
    const { firstVisitFlag } = useAppContext();
    const [displayingVotes, setDisplayingVotes] =
        useState<VoteProp[]>(initialVotes);
    const [selectedVoteId, setSelectedVoteId] = useState<string | null>(null);

    ///////////////////////////////////////////////////////

    // 처음 접속했을 때만 사용
    useEffect(() => {
        if (firstVisitFlag) {
            // LandingPageRedirector에서 발신
            const redirectedVoteId = location.state as RedirectedVoteIdProp;
            if (redirectedVoteId && redirectedVoteId.voteId) {
                navigate("/vote", {
                    state: { voteId: redirectedVoteId.voteId },
                });
            }
        }
        return () => {};
    }, []);

    ///////////////////////////////////////////////////////

    const voteListContext = {
        displayingVotes,
        selectedVoteId,
        setSelectedVoteId,
    };

    return (
        <VoteListContext.Provider value={voteListContext}>
            {children}
        </VoteListContext.Provider>
    );
}
