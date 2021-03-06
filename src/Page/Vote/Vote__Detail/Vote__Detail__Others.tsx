import React from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { StylelessLink, FlexCenteringDiv } from "../../../Style";

export default function VoteDetailOthers() {
    const { hotVote, prevVote, nextVote } = useVoteDetailContext();

    return (
        <VoteDetailOtherContainer>
            <SeeOtherVoteText>다른 투표 둘러보기</SeeOtherVoteText>
            <OtherVoteRow>
                <OtherVoteHotTag>HOT</OtherVoteHotTag>
                {hotVote._id ? (
                    <OtherVoteTitle
                        onClick={() => {
                            ReactGA.event({
                                category: "Vote",
                                action: "Look Around Other Vote",
                            });
                        }}
                    >
                        <StylelessLink to={`/vote/${hotVote._id}`}>
                            {hotVote.title}
                        </StylelessLink>
                    </OtherVoteTitle>
                ) : (
                    <OtherVoteTitle>{hotVote.title}</OtherVoteTitle>
                )}
            </OtherVoteRow>
            <OtherVoteRow>
                <OtherVoteTag>이전</OtherVoteTag>
                {prevVote._id ? (
                    <OtherVoteTitle
                        onClick={() => {
                            ReactGA.event({
                                category: "Vote",
                                action: "Look Around Other Vote",
                            });
                        }}
                    >
                        <StylelessLink to={`/vote/${prevVote._id}`}>
                            {prevVote.title}
                        </StylelessLink>
                    </OtherVoteTitle>
                ) : (
                    <OtherVoteTitle>{prevVote.title}</OtherVoteTitle>
                )}
            </OtherVoteRow>
            <OtherVoteRow>
                <OtherVoteTag>다음</OtherVoteTag>
                {nextVote._id ? (
                    <OtherVoteTitle
                        onClick={() => {
                            ReactGA.event({
                                category: "Vote",
                                action: "Look Around Other Vote",
                            });
                        }}
                    >
                        <StylelessLink to={`/vote/${nextVote._id}`}>
                            {nextVote.title}
                        </StylelessLink>
                    </OtherVoteTitle>
                ) : (
                    <OtherVoteTitle>{nextVote.title}</OtherVoteTitle>
                )}
            </OtherVoteRow>
        </VoteDetailOtherContainer>
    );
}

const VoteDetailOtherContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 15px;
    gap: 8px;
    * {
        font-size: 3.7vw;
    }
`;

const SeeOtherVoteText = styled.span`
    line-height: 40px;
    color: ${(props) => props.theme.vote.voteOtherHeaderColor};
`;

const OtherVoteRow = styled(FlexCenteringDiv)`
    justify-content: flex-start;
    width: 100%;
    height: 30px;
`;

const OtherVoteTag = styled(FlexCenteringDiv)`
    width: 70px;
    height: 100%;
    color: ${(props) => props.theme.vote.voteOtherTagColor};
    border: 1px solid #eeeeee;
    border-radius: 15px;
`;

const OtherVoteHotTag = styled(FlexCenteringDiv)`
    width: 70px;
    height: 100%;
    color: white;
    background-color: ${(props) => props.theme.hotTagColor};
    border-radius: 15px;
`;

const OtherVoteTitle = styled(FlexCenteringDiv)`
    justify-content: flex-start;
    width: calc(100% - 70px);
    max-width: calc(100% - 70px);
    color: ${(props) => props.theme.vote.voteOtherTitleColor};
    padding: 0px 12px;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
