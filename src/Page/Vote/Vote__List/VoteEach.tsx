import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../../App/AppProvider";
import { getVoteParticipantsNumber, isDatePassed } from "../../../Util";
import {
    StylelessLink,
    SvgIcon,
    FlexSpaceBetweenDiv,
    FlexCenteringDiv,
} from "../../../Style";
import { VoteProp } from "../../../Type";
import checkIcon from "../../../Resource/svg/checked-icon.svg";
import uncheckIcon from "../../../Resource/svg/unchecked-icon.svg";

export default function VoteEach({
    vote,
    showAuthor,
}: {
    vote: VoteProp;
    showAuthor: boolean;
}) {
    const { tempUserInfo } = useAppContext();

    return (
        <StylelessLink to={`/vote/${vote._id}`}>
            <VoteContainer>
                <VoteTitleRow>
                    <VoteTitleLeft>
                        <VoteTitleText>{vote.title}</VoteTitleText>
                        {isDatePassed(vote.deadline) && (
                            <VoteDoneTag>마감</VoteDoneTag>
                        )}
                    </VoteTitleLeft>
                    <VoteTitleRight>
                        <SvgIcon
                            src={
                                tempUserInfo.participatedVoteIds.includes(
                                    vote._id
                                )
                                    ? checkIcon
                                    : uncheckIcon
                            }
                            width={"4vw"}
                        />
                        {` ${getVoteParticipantsNumber(vote)}`}
                    </VoteTitleRight>
                </VoteTitleRow>
                <VoteContentRow>{vote.content}</VoteContentRow>
                {showAuthor && (
                    <>
                        <br />
                        <VoteAuthorText>{vote.author}</VoteAuthorText>
                        <VoteCreateText>{`08:55`}</VoteCreateText>
                    </>
                )}
            </VoteContainer>
        </StylelessLink>
    );
}

const VoteContainer = styled.div`
    display: block;
    padding: 10px 15px;
`;

const VoteTitleRow = styled(FlexSpaceBetweenDiv)``;

//// 투표 참여 여부, 참여 인원 수
const VoteTitleRight = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 22%;
    gap: 5px;
    color: ${(props) => props.theme.vote.voteEachParticipantsColor};
    font-size: 3.5vw;
`;

const VoteTitleLeft = styled.div`
    display: flex;
    align-items: center;
    width: 78%;
`;

const VoteTitleText = styled.div`
    display: inline-block;
    max-width: calc(100% - 55px);
    color: ${(props) => props.theme.vote.voteEachTitleColor};
    font-size: 4.2vw;
    line-height: 7.5vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const VoteDoneTag = styled(FlexCenteringDiv)`
    width: 40px;
    height: 24px;
    font-size: 10px;
    margin-left: 15px;
    border-radius: 12px;
    color: gray;
    background-color: ${(props) => props.theme.voteDoneBackgroundColor};
`;

// 투표 본문
const VoteContentRow = styled.div`
    display: inline-block;
    max-width: 100%;
    color: ${(props) => props.theme.vote.voteEachContentColor};
    font-size: 3.5vw;
    line-height: 6vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

//// 투표 작성자/작성일시 정보
const VoteAuthorText = styled.span`
    color: ${(props) => props.theme.vote.voteEachAuthorColor};
    font-size: 3vw;
    line-height: 5vw;
`;

const VoteCreateText = styled(VoteAuthorText)`
    padding-left: 10px;
`;
