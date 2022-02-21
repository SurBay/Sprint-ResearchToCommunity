import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export function StylelessLink({
    to,
    children,
}: {
    to: string;
    children: JSX.Element | string;
}) {
    const navigate = useNavigate();

    return (
        <LinkDiv
            onClick={() => {
                navigate(to);
            }}
        >
            {children}
        </LinkDiv>
    );
}

const LinkDiv = styled.div`
    cursor: pointer;
`;
