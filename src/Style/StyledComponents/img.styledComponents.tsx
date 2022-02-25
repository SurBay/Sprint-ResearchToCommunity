import React from "react";
import styled from "styled-components";

export function SvgIcon({
    src,
    width,
    height,
}: {
    src: string;
    width?: string;
    height?: string;
}) {
    return <IconBox src={src} width={width} heigth={height} />;
}

export function ClickableSvgIcon({
    src,
    width,
    height,
}: {
    src: string;
    width?: string;
    height?: string;
}) {
    return <IconBox src={src} width={width} heigth={height} clickable={true} />;
}

const IconBox = styled.img<{
    width?: string;
    heigth?: string;
    clickable?: boolean;
}>`
    ${(props) => props.width && `width: ${props.width}; height: auto;`}
    ${(props) => props.heigth && `heigth: width: auto; ${props.heigth};`}
    ${(props) => props.clickable && `cursor: pointer;`}
`;
