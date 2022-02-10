import React from "react";
import VoteDetailProvider from "./Vote__DetailProvider";
import VoteDetailContainer from "./Vote__DetailContainer";

export default function VoteDetail() {
    return (
        <VoteDetailProvider>
            <VoteDetailContainer />
        </VoteDetailProvider>
    );
}
