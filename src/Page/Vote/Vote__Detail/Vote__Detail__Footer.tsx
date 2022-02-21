import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../../App/AppProvider";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { getVoteParticipantsNumber, getVoteLikedNumber } from "../../../Util";
import { SvgIcon, FlexCenteringDiv, FlexSpaceBetweenDiv } from "../../../Style";
import checkIcon from "../../../Resource/svg/checked-icon.svg";
import uncheckIcon from "../../../Resource/svg/unchecked-icon.svg";
import filledStarIcon from "../../../Resource/svg/filled-star-icon.svg";
import unfilledStarIcon from "../../../Resource/svg/unfilled-star-icon.svg";

export default function VoteDetailFooter() {
    const { tempUserInfo } = useAppContext();
    const { selectedVote, toggleLike } = useVoteDetailContext();

    return (
        <VoteDetailFooterContainer>
            <VoteParticipatesDiv>
                <SvgIcon
                    src={
                        tempUserInfo.participatedVoteIds.includes(
                            selectedVote._id
                        )
                            ? checkIcon
                            : uncheckIcon
                    }
                    width={"24px"}
                />
                {`${getVoteParticipantsNumber(selectedVote)}명 참여`}
            </VoteParticipatesDiv>
            <VoteLikesDiv onClick={toggleLike}>
                <SvgIcon
                    src={
                        tempUserInfo.likedVoteIds.includes(selectedVote._id)
                            ? filledStarIcon
                            : unfilledStarIcon
                    }
                    width={"24px"}
                />
                {getVoteLikedNumber(selectedVote)}
            </VoteLikesDiv>
        </VoteDetailFooterContainer>
    );
}

const VoteDetailFooterContainer = styled(FlexSpaceBetweenDiv)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 15px;
    margin-bottom: 45px;
`;

const VoteParticipatesDiv = styled(FlexCenteringDiv)`
    font-size: 16px;
    gap: 8px;
    color: ${(props) => props.theme.vote.voteDetailFooterTextColor};
`;

const VoteLikesDiv = styled(VoteParticipatesDiv)``;
