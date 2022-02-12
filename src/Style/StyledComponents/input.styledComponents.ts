import styled from "styled-components";

export const DefaultInput = styled.input.attrs({
    spellCheck: "false",
})`
    border: none;
    :focus {
        outline: none;
    }
`;
