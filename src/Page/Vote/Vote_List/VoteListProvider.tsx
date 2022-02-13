import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../../App/AppProvider";
import { VoteProp, ChildrenProp } from "../../../Type";

type VoteListContextProp = {};

const InitialVoteListContext: VoteListContextProp = {};

const VoteListContext = createContext(InitialVoteListContext);
export function useVoteListContext() {
    return useContext(VoteListContext);
}

export default function VoteListProvider({ children }: ChildrenProp) {
    const navigate = useNavigate();
    const location = useLocation();
    const { firstVisitFlag, setFirstVisitFlag } = useAppContext();

    // 처음 접속했을 때만 사용
    useEffect(() => {
        if (firstVisitFlag) {
            setFirstVisitFlag(false);
            // LandingPageRedirector에서 발신
            const redirectedVoteId = location.state as string;
            if (redirectedVoteId) {
                navigate("/vote", {
                    state: redirectedVoteId,
                });
            }
        }
        return () => {};
    }, []);

    const voteListContext = {};

    return (
        <VoteListContext.Provider value={voteListContext}>
            {children}
        </VoteListContext.Provider>
    );
}
