import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import "./Font/fonts.css";

const GlobalStyles = createGlobalStyle`
    ${reset};
    *{
        box-sizing:border-box;
    }
    html, body, #root{
        width:min(100%, 100vw);
        height:100vh;
        overflow:hidden;   
    }
    #root{
        position:relative;
    }
    #root * {
        font-family:"SpoqaHanSansNeo";
    }
`;

export default GlobalStyles;
