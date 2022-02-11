import React from "react";
import styled from "styled-components";
import { useAppContext } from "../../App/AppProvider";
import { FullFlexDiv } from "../../Style";

export default function Modal() {
    const { setModalType } = useAppContext();

    return (
        <ModalOuterContainer>
            <ModalInnerContainer>
                <ModalBackground
                    onClick={() => {
                        setModalType(null);
                    }}
                />
                <Box>흐아닛 챠</Box>
            </ModalInnerContainer>
        </ModalOuterContainer>
    );
}

const ModalOuterContainer = styled(FullFlexDiv)`
    position: absolute;
    top: 0px;
    left: 0px;
    justify-content: center;
    align-items: center;
`;

const ModalInnerContainer = styled(FullFlexDiv)`
    position: relative;
`;

const ModalBackground = styled(FullFlexDiv)`
    position: absolute;
    top: 0px;
    width: 100vw;
    height: 100vh;
    background-color: green;
    opacity: 0.2;
`;

const Box = styled.div`
    display: flex;
    width: 200px;
    height: 200px;
    background-color: white;
    border: 2px solid black;
`;
