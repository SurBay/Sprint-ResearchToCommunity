import styled from "styled-components";

export const FullFlexHeaderPage = styled.div`
    display: flex;
    width: 100%;
    ${(props) => `height: calc(100% - ${props.theme.headerHeight})`};
`;

export const FullBlockHeaderPage = styled.div`
    display: block;
    width: 100%;
    ${(props) => `height: calc(100% - ${props.theme.headerHegith})`};
    /* > div {
        margin: 0px auto;
    } */
`;

export const FullFlexDiv = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const FullBlockDiv = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    /* > div {
        margin: 0px auto;
    } */
`;

export const FlexCenteringDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const FlexSpaceBetweenDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
