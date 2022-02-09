import React from "react";
import AppProvider from "./AppProvider";
import AppContainer from "./AppContainer";

export default function App() {
    return (
        <AppProvider>
            <AppContainer />
        </AppProvider>
    );
}
