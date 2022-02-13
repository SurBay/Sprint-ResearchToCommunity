import styled from "styled-components";

export const DefaultHeaderContainer = styled.div`
    width: 100%;
    height: ${(props) => props.theme.headerHeight};
    min-height: ${(props) => props.theme.headerHeight};
    padding: 0px 15px;
`;
