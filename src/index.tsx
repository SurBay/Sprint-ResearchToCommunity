import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { Theme } from "./Theme/Theme";
import GlobalStyles from "./Style/GlobalStyles";

declare global {
    interface Window {
        Kakao: any;
    }
}

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);
