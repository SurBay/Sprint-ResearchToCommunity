import React from "react";
import { useLocation } from "react-router-dom";
import VoteListPageHeader from "./VoteListPageHeader";
import VoteDetailPageHeader from "./VoteDetailPageHeader";

export default function Header() {
    const pathname = useLocation().pathname;

    switch (pathname) {
        case "/":
            return <VoteListPageHeader />;
        case "/vote":
            return <VoteDetailPageHeader />;
        default:
            return null;
    }
}
