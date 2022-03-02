import React from "react";
import styled from "styled-components";
import axios from "axios";
import ReactGA from "react-ga";
import { useAppContext } from "../../../App/AppProvider";
import { API_ENDPOINT } from "../../../Constant";
import {
    StylelessLink,
    SvgIcon,
    FlexSpaceBetweenDiv,
    FlexCenteringDiv,
} from "../../../Style";
import { getVoteParticipantsNumber, isDatePassed } from "../../../Util";
import flagIcon from "../../../Resource/svg/flag-icon.svg";
import checkIcon from "../../../Resource/svg/checked-icon.svg";
import uncheckIcon from "../../../Resource/svg/unchecked-icon.svg";

// Reference: VoteEach.tsx
export default function VoteDetailVoteHeader() {
    const { tempUserInfo, hotVotes } = useAppContext();

    function visitVote(voteId: string) {
        axios.patch(`${API_ENDPOINT}/api/votes/visit`, {
            voteId,
        });
    }

    return (
        <StylelessLink to={`/vote/${hotVotes[0]?._id}`}>
            <Container
                onClick={() => {
                    visitVote(hotVotes[0]?._id);
                    ReactGA.event({
                        category: "Vote",
                        action: "Look Around Other Vote with Detail Header Vote",
                    });
                }}
            >
                <SvgIcon src={flagIcon} width={"3vw"} />
                <VoteTitle>{hotVotes[0]?.title}</VoteTitle>
                <VoteParticipateInfo>
                    <SvgIcon
                        src={
                            tempUserInfo.participatedVoteIds.includes(
                                hotVotes[0]?._id
                            ) || isDatePassed(hotVotes[0]?.deadline)
                                ? uncheckIcon
                                : checkIcon
                        }
                        width={"4vw"}
                    />
                    <VoteParticipateNum>
                        {hotVotes[0] && getVoteParticipantsNumber(hotVotes[0])}
                    </VoteParticipateNum>
                </VoteParticipateInfo>
            </Container>
        </StylelessLink>
    );
}

const Container = styled(FlexSpaceBetweenDiv)`
    padding: 20px 5vw;
    border-bottom: 5px solid
        ${(props) => props.theme.vote.voteDetailHeaderBorder};
`;

const VoteTitle = styled.div`
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;
    font-size: 3.5vw;
    color: #666666;
    padding: 1px 0px;
`;

const VoteParticipateInfo = styled(FlexCenteringDiv)``;

const VoteParticipateNum = styled.span`
    font-size: 3.5vw;
    color: #555555;
    padding-left: 5px;
`;
