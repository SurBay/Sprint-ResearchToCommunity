import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    RefObject,
} from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../../../App/AppProvider";
import { useVoteListContext } from "./VoteListProvider";
import VoteListPageHeader from "../../../Component/Header/VoteListPageHeader";
import {
    FullBlockHeaderPageDiv,
    FullFlexHeaderPageDiv,
    FullFlexDiv,
    FullBlockDiv,
    FlexCenteringDiv,
    FlexSpaceBetweenDiv,
} from "../../../Style";
import { VoteProp } from "../../../Type";

export default function VoteListContainer() {
    const {} = useVoteListContext();

    return (
        <>
            <VoteListPageHeader />
            <Container>
                <HotVote />
                <RecentVote />
                <InifiniteScrollPart />
            </Container>
        </>
    );
}

function HotVote() {
    const { hotVotes } = useAppContext();

    return (
        <HotVoteContainer>
            <HotVoteTag>HOT</HotVoteTag>
            {hotVotes.map((vote) => {
                return (
                    <VoteEach key={vote._id} vote={vote} showAuthor={false} />
                );
            })}
        </HotVoteContainer>
    );
}

function RecentVote() {
    const { recentVotes } = useAppContext();

    return (
        <RecentVoteContainer>
            <RecentVoteTagRow>
                <RecentVoteTag>최근 게시물</RecentVoteTag>
                <RecentVoteUpdateTime>업데이트 일시</RecentVoteUpdateTime>
            </RecentVoteTagRow>
            {recentVotes.map((vote) => {
                return (
                    <VoteEach key={vote._id} vote={vote} showAuthor={true} />
                );
            })}
        </RecentVoteContainer>
    );
}

function VoteEach({
    vote,
    showAuthor,
}: {
    vote: VoteProp;
    showAuthor: boolean;
}) {
    return (
        <Link to={`/vote/${vote._id}`}>
            <VoteContainer>
                <VoteTitleRow>
                    <VoteTitleLeft>
                        <VoteTitleText>{vote.title}</VoteTitleText>
                        <VoteDoneTag>마감</VoteDoneTag>
                    </VoteTitleLeft>
                    <VoteTitleRight>
                        <VoteParticipateInfoDiv>(O) 12</VoteParticipateInfoDiv>
                    </VoteTitleRight>
                </VoteTitleRow>
                <VoteContentTextRow>{vote.content}</VoteContentTextRow>
                {showAuthor && (
                    <>
                        <br />
                        <VoteAuthorText>{vote.author}</VoteAuthorText>
                        <VoteCreateText>{`08:55`}</VoteCreateText>
                    </>
                )}
            </VoteContainer>
        </Link>
    );
}

function InifiniteScrollPart() {
    const { loadVote } = useAppContext();
    const lastDiv = useRef<HTMLDivElement>(null);

    // 여기서의 entries는 IntersectionObserver가 전달해준다
    const loadRecentVotes = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            loadVote();
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(loadRecentVotes, {
            root: null,
            threshold: 0.4,
        });
        if (lastDiv.current) {
            observer.observe(lastDiv.current);
        }
        return () => {
            observer.disconnect();
        };
    }, []);

    return <LastDiv ref={lastDiv} />;
}

const Container = styled(FullBlockHeaderPageDiv)`
    padding: 15px;
    * {
        text-decoration: none;
    }
`;

// HOT 투표
const HotVoteContainer = styled.div`
    display: block;
    margin-bottom: 40px;
`;

const HotVoteTag = styled(FlexCenteringDiv)`
    width: 80px;
    height: 30px;
    font-size: 15px;
    color: white;
    background-color: ${(props) => props.theme.hotTagColor};
    border-radius: 15px;
    margin-bottom: 15px;
`;

// 최근 투표
const RecentVoteContainer = styled.div`
    display: block;
`;

const RecentVoteTagRow = styled(FlexSpaceBetweenDiv)`
    padding: 0px 8px;
    margin-bottom: 20px;
`;

const RecentVoteTag = styled.div`
    font-size: 15px;
`;

const RecentVoteUpdateTime = styled.div`
    font-size: 12px;
`;

// 투표 각각
const VoteContainer = styled.div`
    display: block;
    padding: 10px 15px;
`;

const VoteTitleRow = styled(FlexSpaceBetweenDiv)``;

//// 투표 제목, 마감 여부
const VoteTitleLeft = styled.div`
    display: flex;
    width: 75%;
`;

const VoteTitleText = styled.div`
    display: inline-block;
    max-width: calc(100% - 55px);
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

//// 투표 참여 여부, 참여 인원 수
const VoteTitleRight = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 25%;
`;

const VoteParticipateInfoDiv = styled.div``;

//// 투표 본문
const VoteContentTextRow = styled.div`
    display: inline-block;
    max-width: 100%;
    font-size: 3.5vw;
    line-height: 6vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

//// 투표 작성자/작성일시 정보
const VoteAuthorText = styled.span`
    font-size: 3vw;
    line-height: 5vw;
`;

const VoteCreateText = styled(VoteAuthorText)`
    padding-left: 10px;
`;

// IntersectionObserver로 관찰하는 마지막 div
const LastDiv = styled.div`
    height: 120px;
`;
