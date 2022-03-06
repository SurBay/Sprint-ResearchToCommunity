import React from "react";
import styled from "styled-components";
import { FullFlexDiv } from "../Style";

export default function ModalWrapper({
    children,
    modalClosure,
}: {
    children: JSX.Element;
    modalClosure: () => void;
}) {
    return (
        <ModalOuterContainer>
            <ModalInnerContainer>
                <ModalBackground
                    onClick={() => {
                        modalClosure();
                    }}
                />
                {children}
            </ModalInnerContainer>
        </ModalOuterContainer>
    );
}

const ModalOuterContainer = styled(FullFlexDiv)`
    position: absolute;
    top: 0px;
    z-index: 100;
`;

const ModalInnerContainer = styled(FullFlexDiv)`
    position: relative;
    justify-content: center;
    align-items: center;
`;

const ModalBackground = styled(FullFlexDiv)`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
`;
