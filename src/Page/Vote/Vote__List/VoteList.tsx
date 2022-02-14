import React from "react";
import VoteListProvider from "./VoteListProvider";
import VoteListContainer from "./VoteListContainer";

export default function VoteList() {
    return (
        <VoteListProvider>
            <VoteListContainer />
        </VoteListProvider>
    );
}
