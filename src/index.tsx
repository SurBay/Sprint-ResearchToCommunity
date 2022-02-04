import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { App } from "./App/App";
import { Theme } from "./Style/Theme";
import GlobalStyles from "./Style/GlobalStyles";

ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <App />
    </ThemeProvider>,
    document.getElementById("root")
);
