import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../App/AppProvider";
import { ClickableSvgIcon, FlexCenteringDiv } from "../Style";
import CloseIcon from "../Resource/svg/close-icon.svg";

export default function InteractionComment() {
    const location = useLocation();
    const { showInteractiveComment, setShowInteractiveComment } =
        useAppContext();

    if (!showInteractiveComment) return null;

    return (
        <ContainerRow>
            <CommentContainer>
                <CommentContent>나만 알기 아까운 논쟁?&ensp;</CommentContent>
                <CommentEmphasizeContent>친구 의견</CommentEmphasizeContent>
                <CommentContent style={{ paddingRight: "6px" }}>
                    도 궁금할 땐?
                </CommentContent>
                <div
                    onClick={() => {
                        setShowInteractiveComment(false);
                    }}
                >
                    <ClickableSvgIcon src={CloseIcon} height={"100%"} />
                </div>
            </CommentContainer>
            <CommentLeg></CommentLeg>
        </ContainerRow>
    );
}

const ContainerRow = styled.div`
    position: absolute;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;
    padding: 8px 2vw;
    opacity: 0.78;
`;

const CommentContainer = styled(FlexCenteringDiv)`
    background-color: #323232;
    padding: 12px 16px;
    border-radius: 18px;
`;

const CommentContent = styled.span`
    font-size: 10px;
    color: white;
    opacity: 1;
`;

const CommentEmphasizeContent = styled(CommentContent)`
    color: ${(props) => props.theme.color.mainTheme};
`;

const CommentLeg = styled.div`
    width: 10px;
    height: 8px;
    background-color: #323232;
    margin-right: 16px;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
`;
