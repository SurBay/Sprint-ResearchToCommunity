import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { getDotFormDate } from "../../../Util";
import { SvgIcon, FlexSpaceBetweenDiv, FlexCenteringDiv } from "../../../Style";
import AuthorIcon from "../../../Resource/svg/author-icon.svg";
import ShareIcon from "../../../Resource/svg/share-icon.svg";

export default function VoteDetailHeader() {
    const { selectedVote } = useVoteDetailContext();

    return (
        <VoteDetailHeaderContainer>
            <VoteAuthorProfileContainer>
                <SvgIcon src={AuthorIcon} height={"60%"} />
                <AuthorAndDateContainer>
                    <AuthorText>{selectedVote.author}</AuthorText>
                    <DateText>{getDotFormDate(selectedVote.date)}</DateText>
                </AuthorAndDateContainer>
            </VoteAuthorProfileContainer>
            <SvgIcon src={ShareIcon} height={"60%"} />
        </VoteDetailHeaderContainer>
    );
}

// Header 부분
const VoteDetailHeaderContainer = styled(FlexSpaceBetweenDiv)`
    height: 60px;
    padding: 0px 12px;
    margin-bottom: 40px;
`;

const VoteAuthorProfileContainer = styled(FlexCenteringDiv)`
    gap: 8px;
`;

const AuthorAndDateContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const AuthorText = styled.span`
    font-size: 12px;
    color: ${(props) => props.theme.vote.voteDetailHeaderAuthorColor};
`;

const DateText = styled.span`
    font-size: 9px;
    color: ${(props) => props.theme.vote.voteDetailHeaderDateColor};
`;
