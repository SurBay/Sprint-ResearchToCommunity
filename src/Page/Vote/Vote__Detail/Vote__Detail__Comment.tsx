import React from "react";
import styled from "styled-components";
import ReactGA from "react-ga";
import { useVoteDetailContext } from "./Vote__DetailProvider";
import { VoteCommentProp } from "../../../Type";
import { getDotFormDate, isUserConnectOnIOS } from "../../../Util";
import { FlexCenteringDiv, StylelessButton } from "../../../Style";

export default function VoteDetailComment() {
    return (
        <Container>
            <CommentTitleTag>댓글</CommentTitleTag>
            <CommentsPart />
        </Container>
    );
}

// 댓글 부분 (최대 2개 까지 표시)
function CommentsPart() {
    const { selectedVote } = useVoteDetailContext();

    if (!selectedVote.comments.length) return null;

    return (
        <CommentsPartContainer>
            {selectedVote.comments[0] && (
                <CommentBox comment={selectedVote.comments[0]} />
            )}
            {selectedVote.comments[1] && (
                <CommentBox comment={selectedVote.comments[1]} />
            )}
            <CommentsPartCover>
                <CoverText>투표 결과로 다양한 의견을 나누고 싶다면?</CoverText>
                <div
                    onClick={() => {
                        ReactGA.event({
                            category: "Download",
                            action: "Push App Download Link with Comment",
                        });
                    }}
                >
                    <a
                        href={
                            isUserConnectOnIOS()
                                ? "https://surbay.page.link/naxz"
                                : "https://surbay.page.link/ZCg5"
                        }
                        style={{ textDecoration: "none" }}
                    >
                        <AppDownloadButton>
                            SurBay 앱에서 만나요!
                        </AppDownloadButton>
                    </a>
                </div>
            </CommentsPartCover>
        </CommentsPartContainer>
    );
}

// 각 댓글
function CommentBox({ comment }: { comment: VoteCommentProp }) {
    return (
        <CommentBoxContainer>
            <CommentAuthorText>{`${comment.writer_name} | ${getDotFormDate(
                comment.date
            )}`}</CommentAuthorText>
            <br />
            <CommentContentText>{comment.content}</CommentContentText>
        </CommentBoxContainer>
    );
}

const Container = styled.div`
    display: block;
    padding: 15px 5vw;
    margin-bottom: 15px;
    border-bottom: 3px solid #f5f5f5;
`;

const CommentTitleTag = styled.div`
    font-size: 4vw;
    color: #555555;
`;

const CommentsPartContainer = styled.div`
    position: relative;
    display: block;
    margin-top: 10px;
`;

// 앱 설치 유도 텍스트 및 버튼 파트
const CommentsPartCover = styled(FlexCenteringDiv)`
    position: absolute;
    top: 0px;
    flex-direction: column;
    gap: 15px;
    width: 100%;
    height: 100%;
`;

const CoverText = styled.span`
    font-size: 3.8vw;
`;

const AppDownloadButton = styled(StylelessButton)`
    font-size: 3.5vw;
    color: ${(props) => props.theme.color.mainTheme};
    background-color: white;
    text-decoration: none;
    padding: 8px 24px;
    border: 2px solid ${(props) => props.theme.color.mainTheme};
    border-radius: 18px;
`;

// 각 댓글
const CommentBoxContainer = styled.div`
    display: block;
    padding: 10px 20px;
    margin: 0px auto;
    margin-top: 10px;
    border: 2px solid #ebebeb;
    border-radius: 15px;
    filter: blur(0.8vw);
`;

const CommentAuthorText = styled.span`
    color: #555555;
    font-size: 3.5vw;
    line-height: 6vw;
`;

const CommentContentText = styled(CommentAuthorText)`
    font-size: 4vw;
    line-height: 8vw;
`;

const Wrapper = styled.div`
    position: absolute;
`;
