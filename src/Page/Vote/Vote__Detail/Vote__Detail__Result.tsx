import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import {
    sendKakaoFeedMessage,
    getVoteParticipantsNumber,
    getPollParticipantsNumber,
    getWinningPollParticipantsNumber,
} from "../../../Util";
import { PollProp } from "../../../Type";
import {
    SvgIcon,
    FlexCenteringDiv,
    FlexSpaceBetweenDiv,
    StylelessButton,
} from "../../../Style";
import KakaoCommentIcon from "../../../Resource/svg/kakaotalk-comment-icon.svg";

export default function VoteDetailResult() {
    const { selectedVote } = useVoteDetailContext();

    return (
        <Container>
            <AllVoteOptionContainer>
                {selectedVote.polls.map((poll, index) => {
                    return (
                        <VoteOption
                            key={`${index}:${poll.content}`}
                            poll={poll}
                        />
                    );
                })}
            </AllVoteOptionContainer>
            <ShareButtonRow>
                <URLShareButton>URL 공유</URLShareButton>
                <KakaoShareButton
                    onClick={() => {
                        sendKakaoFeedMessage(selectedVote);
                    }}
                >
                    <KakaoButtonContent>
                        <SvgIcon src={KakaoCommentIcon} width={"15px"} />
                        카카오톡 공유
                    </KakaoButtonContent>
                </KakaoShareButton>
            </ShareButtonRow>
        </Container>
    );
}

function VoteOption({ poll }: { poll: PollProp }) {
    const { selectedVote } = useVoteDetailContext();
    const pollPercentage = (
        (getPollParticipantsNumber(poll) /
            getVoteParticipantsNumber(selectedVote)) *
        100
    ).toFixed(1);

    return (
        <VoteOptionContainer>
            <VoteOptionContentRow>
                <VoteOptionContent>{poll.content}</VoteOptionContent>
                <VoteOptionPercentage
                    winning={
                        getPollParticipantsNumber(poll) >=
                        getWinningPollParticipantsNumber(selectedVote)
                    }
                >{`${pollPercentage}%`}</VoteOptionPercentage>
            </VoteOptionContentRow>
            <VoteResultBarContainer>
                <VoteResultBar
                    winning={
                        getPollParticipantsNumber(poll) >=
                        getWinningPollParticipantsNumber(selectedVote)
                    }
                    percentage={pollPercentage}
                />
            </VoteResultBarContainer>
        </VoteOptionContainer>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const AllVoteOptionContainer = styled.div`
    display: block;
    width: 100%;
    padding: 10px 0px 15px 0px;
    border: 1px solid
        ${(props) => props.theme.vote.voteDetailResultContainerBorder};
    border-radius: 10px;
    box-shadow: rgba(156, 156, 156, 0.24) 2px 2px 8px;
`;

const VoteOptionContainer = styled(FlexCenteringDiv)`
    position: relative;
    width: 94%;
    height: 56px;
    margin: 0px auto;
    margin-bottom: 12px;
`;

const VoteOptionContentRow = styled(FlexSpaceBetweenDiv)`
    width: 100%;
    padding: 0px 12px;
`;

const VoteOptionContent = styled.span``;

const VoteOptionPercentage = styled.span<{ winning: boolean }>`
    color: ${(props) =>
        props.winning
            ? props.theme.vote.voteDetailResultWinningPercentageColor
            : props.theme.vote.voteDetailResultPercentageColor};
`;

const VoteResultBarContainer = styled.div`
    position: absolute;
    bottom: 0px;
    display: flex;
    width: 96%;
    height: 8px;
    background-color: ${(props) =>
        props.theme.vote.voteDetailResultBarContainerColor};
    border-radius: 4px;
    overflow: hidden;
`;

const VoteResultBar = styled.div<{
    winning: boolean;
    percentage: number | string;
}>`
    ${(props) => `width:${props.percentage}%`};
    height: 100%;
    background-color: ${(props) =>
        props.winning
            ? props.theme.vote.voteDetailResultWinningBarColor
            : props.theme.vote.voteDetailResultBarColor};
    border-radius: 4px;
`;

const ShareButtonRow = styled(FlexSpaceBetweenDiv)`
    width: 94%;
    height: 60px;
`;

const URLShareButton = styled(StylelessButton)`
    width: 48%;
    height: 100%;
    font-size: 15px;
    color: white;
    background-color: ${(props) =>
        props.theme.vote.voteDetailResultURLShareButtonColor};
    border-radius: 10px;
`;

const KakaoShareButton = styled(URLShareButton)`
    color: black;
    background-color: ${(props) => props.theme.kakao.shareButtonYellow};
`;

const KakaoButtonContent = styled.div`
    display: flex;
    gap: 10px;
`;
