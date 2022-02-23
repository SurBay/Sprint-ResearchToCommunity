import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../App/AppProvider";
import ProfilePageHeader from "../../Component/Header/ProfilePageHeader";
import VoteEach from "../Vote/Vote__List/VoteEach";
import { FullBlockHeaderPageDiv, StylelessButton, SvgIcon } from "../../Style";
import AuthorIcon from "../../Resource/svg/author-icon.svg";
import { useProfileContext } from "./ProfileProvider";

export default function ProfileContainer() {
    return (
        <>
            <ProfilePageHeader />
            <Container>
                <UserInfo />
                <ParticipatedVote />
            </Container>
        </>
    );
}

function UserInfo() {
    const navigate = useNavigate();
    const { tempUserInfo } = useAppContext();

    return (
        <UserInfoContainer>
            <SvgIcon src={AuthorIcon} width={"15vw"} />
            <UserInfoRight>
                <UserInfoText>
                    {tempUserInfo._id
                        ? tempUserInfo.email
                            ? tempUserInfo.email
                            : tempUserInfo.kakaoId
                        : `로그인이 필요합니다`}
                </UserInfoText>
                <VoteCreateButton
                    onClick={() => {
                        navigate("/vote/new");
                    }}
                >
                    투표 작성
                </VoteCreateButton>
            </UserInfoRight>
        </UserInfoContainer>
    );
}

function ParticipatedVote() {
    const navigate = useNavigate();
    const { participatedVotes } = useProfileContext();
    return (
        <ParticipatedVoteContainer>
            <ParticipatedVoteTagRow>
                <ParticipatedVoteTag>내가 참여한 투표</ParticipatedVoteTag>
                <ParticipateOtherVoteButton
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    다른 투표 참여하기
                </ParticipateOtherVoteButton>
            </ParticipatedVoteTagRow>
            <VoteRowsContainer>
                {!participatedVotes.length && (
                    <NoParticipatedVoteMessage>
                        아직 참여한 투표가 없습니다
                    </NoParticipatedVoteMessage>
                )}
                {participatedVotes.map((vote) => {
                    return (
                        <VoteEach
                            key={vote._id}
                            vote={vote}
                            showParticipated={false}
                            showAuthor={true}
                        />
                    );
                })}
            </VoteRowsContainer>
        </ParticipatedVoteContainer>
    );
}

const Container = styled(FullBlockHeaderPageDiv)`
    padding: 20px 5vw;
`;

// 사용자 정보
const UserInfoContainer = styled.div`
    display: flex;
    gap: 15px;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid
        ${(props) => props.theme.vote.voteDetailResultContainerBorder};
    border-radius: 10px;
    margin-bottom: 40px;
    box-shadow: rgba(156, 156, 156, 0.24) 2px 2px 8px;
`;

const UserInfoRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
`;

const UserInfoText = styled.span`
    font-size: 5vw;
`;

const VoteCreateButton = styled(StylelessButton)`
    height: 24px;
    font-size: 12px;
    color: white;
    background-color: ${(props) =>
        props.theme.profile.voteCreateButtonBackgroundColor};
    padding: 3px 15px;
    border-radius: 12px;
`;

// 내가 참여한 투표
//// 내가 참여한 투표: 헤더
const ParticipatedVoteContainer = styled.div`
    display: block;
`;

const ParticipatedVoteTagRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
    margin-bottom: 15px;
`;

const ParticipatedVoteTag = styled.span`
    font-size: 4vw;
    color: ${(props) => props.theme.profile.participateOtherVoteTagColor};
`;

const ParticipateOtherVoteButton = styled(StylelessButton)`
    height: 24px;
    font-size: 3vw;
    color: ${(props) => props.theme.profile.participateOtherVoteButtonColor};
    padding: 8px 12px;
    border: 1px solid
        ${(props) => props.theme.profile.participateOtherVoteButtonBorder};
    border-radius: 12px;
`;

//// 내가 참여한 투표: 투표 컨테이너
const VoteRowsContainer = styled.div`
    border: 1px solid
        ${(props) => props.theme.vote.voteDetailResultContainerBorder};
    border-radius: 10px;
    box-shadow: rgba(156, 156, 156, 0.24) 2px 2px 8px;
`;

const NoParticipatedVoteMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5vw;
    padding: 70px 0px; ;
`;
