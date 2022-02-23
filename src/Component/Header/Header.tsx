// DEPRECATED:
// 주소마다 헤더를 다르게 세팅하려고 했으나
// voteDetail의 경우 voteId가 바뀌어서 불가
// (가능하긴 한데 코드가 지저분해 짐)

// import React from "react";
// import { useLocation } from "react-router-dom";
// import VoteListPageHeader from "./VoteListPageHeader";
// import VoteDetailPageHeader from "./VoteDetailPageHeader";

// export default function Header() {
//     const pathname = useLocation().pathname;

//     switch (pathname) {
//         case "/":
//             return <VoteListPageHeader />;
//         case "/vote":
//             return <VoteDetailPageHeader />;
//         default:
//             return null;
//     }
// }
