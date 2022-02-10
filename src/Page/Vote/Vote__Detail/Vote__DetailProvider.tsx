import React, { createContext, useContext, useState, useEffect } from "react";
import { ChildrenProp } from "../../../Type";

type VoteDetailContextProp = {};

const InitialVoteDetailContext: VoteDetailContextProp = {};

const VoteDetailContext = createContext(InitialVoteDetailContext);
export function useVoteDetailContext() {
    return useContext(VoteDetailContext);
}

export default function VoteDetailProvider({ children }: ChildrenProp) {
    const voteDetailContext = {};
    return (
        <VoteDetailContext.Provider value={voteDetailContext}>
            {children}
        </VoteDetailContext.Provider>
    );
}
