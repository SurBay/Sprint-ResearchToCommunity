import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { SvgIcon, FlexSpaceBetweenDiv, StylelessButton } from "../../../Style";
import { PollProp } from "../../../Type";
import checkIcon from "../../../Resource/svg/checked-icon.svg";

export default function VoteDetailSelect() {
    const { selectedVote, selectedOptions, submitVote } =
        useVoteDetailContext();

    return (
        <Container>
            <AllVoteOptionContainer>
                {selectedVote.polls.map((poll, index) => {
                    return (
                        <VoteOption
                            key={`${index}:${poll.content}`}
                            poll={poll}
                            index={index}
                        />
                    );
                })}
            </AllVoteOptionContainer>
            <VoteSubmitButton
                disabled={!selectedOptions.length}
                onClick={() => {
                    submitVote();
                }}
            >
                투표하기
            </VoteSubmitButton>
        </Container>
    );
}

function VoteOption({ poll, index }: { poll: PollProp; index: number }) {
    const { selectedOptions, toggleVoteOption } = useVoteDetailContext();

    return (
        <VoteOptionContainer
            onClick={() => {
                toggleVoteOption(index);
            }}
            selected={selectedOptions.includes(index)}
        >
            <VoteOptionTitle>{poll.content}</VoteOptionTitle>
            {selectedOptions.includes(index) && (
                <SvgIcon src={checkIcon} width={"30px"} />
            )}
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

const VoteOptionContainer = styled(FlexSpaceBetweenDiv)<{ selected: boolean }>`
    width: 98%;
    height: 56px;
    border: 1px solid
        ${(props) =>
            props.selected
                ? props.theme.voteOptionSelectedBorderColor
                : props.theme.vote.voteDetailSelectOptionBorder};
    border-radius: 28px;
    padding: 0px 20px;
    margin: 12px auto;
    cursor: pointer;
`;

const VoteOptionTitle = styled.span``;

const VoteSubmitButton = styled(StylelessButton)`
    width: 94%;
    height: 60px;
    color: white;
    background-color: ${(props) => props.theme.voteSubmitButtonBackgroundColor};
    border-radius: 12px;
    :disabled {
        background-color: gray;
    }
`;
