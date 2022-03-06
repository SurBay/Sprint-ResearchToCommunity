import React from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { FlexCenteringDiv } from "../../../Style";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";

export default function VoteDetailPhoto() {
    const { selectedVote } = useVoteDetailContext();

    if (!selectedVote.with_image) return null;

    return (
        <Container>
            <Swiper freeMode={true} slidesPerView={2} spaceBetween={12}>
                {selectedVote.polls.map((poll) => {
                    if (!poll.image) return null;
                    return (
                        <SwiperSlide key={poll.content}>
                            <PhotoContainer>
                                <Photo src={poll.image} />
                            </PhotoContainer>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </Container>
    );
}

const Container = styled.div`
    padding-left: 6vw;
    margin: 20px 0px;
`;

const PhotoContainer = styled(FlexCenteringDiv)`
    width: 96%;
    aspect-ratio: 1;
    margin: 0px 3px;
    border-radius: 12px;
    overflow: hidden;
`;

const Photo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
