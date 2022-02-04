import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
// import "./Font/font.css";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
    html, body, #root{
        width:100%;
        height:100%;
    }
`;

export default GlobalStyles;
