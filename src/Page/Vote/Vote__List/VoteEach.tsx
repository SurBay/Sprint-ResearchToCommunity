import React from "react";
import styled from "styled-components";
import axios from "axios";
import ReactGA from "react-ga";
import { useAppContext } from "../../../App/AppProvider";
import {
    getVoteParticipantsNumber,
    getUpcomingVoteDate,
    isDatePassed,
} from "../../../Util";
import { VoteProp } from "../../../Type";
import { API_ENDPOINT } from "../../../Constant";
import {
    StylelessLink,
    SvgIcon,
    FlexSpaceBetweenDiv,
    FlexCenteringDiv,
} from "../../../Style";
import checkIcon from "../../../Resource/svg/checked-icon.svg";
import uncheckIcon from "../../../Resource/svg/unchecked-icon.svg";

export default function VoteEach({
    vote,
    showParticipated,
    showAuthor,
}: {
    vote: VoteProp;
    showParticipated: boolean;
    showAuthor: boolean;
}) {
    const { tempUserInfo } = useAppContext();

    function visitVote(voteId: string) {
        axios.patch(`${API_ENDPOINT}/api/votes/visit`, {
            voteId,
        });
    }

    return (
        <VoteContainer
            onClick={() => {
                visitVote(vote._id);
                ReactGA.event({
                    category: "Vote",
                    action: "Look Around Other Vote",
                });
            }}
        >
            <StylelessLink to={`/vote/${vote._id}`}>
                <>
                    <VoteTitleRow>
                        <VoteTitleLeft>
                            <VoteTitleText>{vote.title}</VoteTitleText>
                            {isDatePassed(vote.deadline) && (
                                <VoteDoneTag>마감</VoteDoneTag>
                            )}
                        </VoteTitleLeft>
                        <VoteTitleRight>
                            {showParticipated && (
                                <>
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
                                </>
                            )}
                        </VoteTitleRight>
                    </VoteTitleRow>
                    <VoteContentRow>{vote.content}</VoteContentRow>
                    {showAuthor && (
                        <>
                            <br />
                            <VoteAuthorText>{vote.author}</VoteAuthorText>
                            <VoteCreateText>
                                {getUpcomingVoteDate(vote.deadline)}
                            </VoteCreateText>
                        </>
                    )}
                </>
            </StylelessLink>
        </VoteContainer>
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
