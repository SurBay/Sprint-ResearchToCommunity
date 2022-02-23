import styled from "styled-components";

export const FullFlexHeaderPageDiv = styled.div`
    display: flex;
    width: 100%;
    ${(props) => `height: calc(100% - ${props.theme.headerHeight})`};
    padding-bottom: 30px;
    overflow-y: auto;
    // Edge
    -ms-overflow-style: none;
    // Firefox
    scrollbar-width: none;
    // Chrome, Safari, Opera
    -webkit-scrollbar {
        display: none;
    }
`;

export const FullBlockHeaderPageDiv = styled(FullFlexHeaderPageDiv)`
    display: block;
    /* > div {
        margin: 0px auto;
    } */
`;

export const FullFlexDiv = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const FullBlockDiv = styled(FullFlexDiv)`
    display: block;
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
