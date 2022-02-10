import styled from "styled-components";

export const FullFlexPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const FullBlockPage = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    > * {
        margin: 0px auto;
    }
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
