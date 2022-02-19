import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { sendKakaoFeedMessage } from "../../../Util";
import { PollProp } from "../../../Type";
import {
    FlexCenteringDiv,
    FlexSpaceBetweenDiv,
    StylelessButton,
} from "../../../Style";

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
                    카카오톡 공유
                </KakaoShareButton>
            </ShareButtonRow>
        </Container>
    );
}

function VoteOption({ poll }: { poll: PollProp }) {
    return (
        <VoteOptionContainer>
            <VoteOptionContentRow>
                <VoteOptionContent>{poll.content}</VoteOptionContent>
                <VoteOptionPercentage>53%</VoteOptionPercentage>
            </VoteOptionContentRow>
            <VoteResultBarContainer>
                <VoteResultBar percentage={53} />
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
`;

const VoteOptionContainer = styled(FlexCenteringDiv)`
    position: relative;
    width: 94%;
    height: 50px;
    margin: 12px auto;
`;

const VoteOptionContentRow = styled(FlexSpaceBetweenDiv)`
    width: 100%;
    padding: 0px 12px;
`;

const VoteOptionContent = styled.span``;

const VoteOptionPercentage = styled.span``;

const VoteResultBarContainer = styled.div`
    position: absolute;
    bottom: 0px;
    display: flex;
    width: 96%;
    height: 8px;
    background-color: gray;
    border-radius: 4px;
    overflow: hidden;
`;

const VoteResultBar = styled.div<{ percentage: number }>`
    ${(props) => `width:${props.percentage}%`};
    background-color: blue;
`;

const ShareButtonRow = styled(FlexSpaceBetweenDiv)`
    width: 94%;
    height: 60px;
`;

const URLShareButton = styled(StylelessButton)`
    width: 48%;
    height: 100%;
    background-color: gray;
    border-radius: 10px;
`;

const KakaoShareButton = styled(URLShareButton)`
    background-color: gray;
`;
