import React from "react";
import RequestSignupModalProvider from "./RequestSignupModalProvider";
import RequestSignupModalContainer from "./RequestSignupModalContainer";

export default function RequestSignupModal() {
    return (
        <RequestSignupModalProvider>
            <RequestSignupModalContainer />
        </RequestSignupModalProvider>
    );
}
