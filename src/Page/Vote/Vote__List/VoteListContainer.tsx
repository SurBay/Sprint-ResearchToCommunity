import React, { useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { useAppContext } from "../../../App/AppProvider";
import VoteListPageHeader from "../../../Component/Header/VoteListPageHeader";
import VoteEach from "./VoteEach";
import { getNowInDotForm } from "../../../Util";
import {
    FullBlockHeaderPageDiv,
    FlexCenteringDiv,
    FlexSpaceBetweenDiv,
} from "../../../Style";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

export default function VoteListContainer() {
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
            <Swiper>
                <SwiperSlide>
                    <VoteRowsContainer>
                        {hotVotes.slice(0, 3).map((vote) => {
                            return (
                                <VoteEach
                                    key={vote._id}
                                    vote={vote}
                                    showParticipated={true}
                                    showAuthor={false}
                                />
                            );
                        })}
                    </VoteRowsContainer>
                </SwiperSlide>
                <SwiperSlide>
                    <VoteRowsContainer>
                        {hotVotes.slice(3, 6).map((vote) => {
                            return (
                                <VoteEach
                                    key={vote._id}
                                    vote={vote}
                                    showParticipated={true}
                                    showAuthor={false}
                                />
                            );
                        })}
                    </VoteRowsContainer>
                </SwiperSlide>
            </Swiper>
            {/* <VoteRowsContainer>
                {hotVotes.map((vote) => {
                    return (
                        <VoteEach
                            key={vote._id}
                            vote={vote}
                            showParticipated={true}
                            showAuthor={false}
                        />
                    );
                })}
            </VoteRowsContainer> */}
        </HotVoteContainer>
    );
}

function RecentVote() {
    const { recentVotes } = useAppContext();

    return (
        <RecentVoteContainer>
            <RecentVoteTagRow>
                <RecentVoteTag>최근 게시물</RecentVoteTag>
                <RecentVoteUpdateTime>{getNowInDotForm()}</RecentVoteUpdateTime>
            </RecentVoteTagRow>
            <VoteRowsContainer>
                {recentVotes.map((vote) => {
                    return (
                        <VoteEach
                            key={vote._id}
                            vote={vote}
                            showParticipated={true}
                            showAuthor={true}
                        />
                    );
                })}
            </VoteRowsContainer>
        </RecentVoteContainer>
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
    padding: 25px 5vw;
    * {
        text-decoration: none;
    }
`;

// 모든 HOT 투표, 모든 일반 투표를 담는 컨테이너
const VoteRowsContainer = styled.div`
    border: 1px solid
        ${(props) => props.theme.vote.voteDetailResultContainerBorder};
    border-radius: 10px;
    box-shadow: rgba(156, 156, 156, 0.24) 2px 2px 8px;
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
    color: ${(props) => props.theme.vote.voteListRecentVoteTagColor};
`;

const RecentVoteUpdateTime = styled.div`
    font-size: 12px;
    color: ${(props) => props.theme.vote.voteListUpdatedTag};
`;

// IntersectionObserver로 관찰하는 마지막 div
const LastDiv = styled.div`
    height: 120px;
`;
