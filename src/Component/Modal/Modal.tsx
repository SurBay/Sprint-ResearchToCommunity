import React from "react";
import { useAppContext } from "../../App/AppProvider";
import RequestKakaoOrEmailModal from "./RequestKakaoOrEmailModal";

export default function Modal() {
    const { modalType } = useAppContext();

    switch (modalType) {
        case "REQUEST_KAKAO_OR_EMAIL":
            return <RequestKakaoOrEmailModal />;
        default:
            return <></>;
    }
}
