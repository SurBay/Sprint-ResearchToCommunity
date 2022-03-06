// DEPRECATED:
// VoteDetailBody 에서 관리하던 요소들을 VoteDetailContainer가 한꺼번에 관리하도록 설정했음

// import React from "react";
// import styled from "styled-components";
// import { useAppContext } from "../../../App/AppProvider";
// import { useVoteDetailContext } from "./Vote__DetailProvider";
// import VoteDetailPhoto from "./Vote__Detail__Photo";
// import VoteDetailSelect from "./Vote__Detail__Select";
// import VoteDetailResult from "./Vote__Detail__Result";
// import { isDatePassed } from "../../../Util";

// export default function VoteDetailBody() {
//     const { tempUserInfo } = useAppContext();
//     const { selectedVote } = useVoteDetailContext();

//     return (
//         <Container>
//             <VoteTitle>{selectedVote.title}</VoteTitle>
//             <br />
//             <VoteContent>{selectedVote.content}</VoteContent>
//             <br />
//             {selectedVote.with_image && <VoteDetailPhoto />}
//             {tempUserInfo.participatedVoteIds.includes(selectedVote._id) ||
//             isDatePassed(selectedVote.deadline) ? (
//                 <VoteDetailResult />
//             ) : (
//                 <VoteDetailSelect />
//             )}
//         </Container>
//     );
// }

// const Container = styled.div`
//     display: block;
//     padding: 0px 6vw;
//     margin-bottom: 35px;
// `;

// const VoteTitle = styled.span`
//     font-size: 4.5vw;
//     line-height: 7vw;
//     color: ${(props) => props.theme.vote.voteDetailBodyTitleColor};
//     padding-bottom: 12px;
// `;

// const VoteContent = styled.span`
//     font-size: 3.7vw;
//     line-height: 6vw;
//     color: ${(props) => props.theme.vote.voteDetailBodyContentColor};
//     padding-bottom: 12px;
// `;
