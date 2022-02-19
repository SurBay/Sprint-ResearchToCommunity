import React, { createContext, useContext, useState } from "react";
import { Cookies } from "react-cookie";
import { useAppContext } from "../../App/AppProvider";
import { isUniqueEmail, signup } from "../../Util";
import { ChildrenProp, TempUserProp } from "../../Type";
import { useVoteDetailContext } from "../../Page/Vote/Vote__Detail/Vote__DetailProvider";

type RequestSignupModalContextProp = {
    selectUseEmail: boolean;
    setSelectUseEmail: (status: boolean) => void;
    handleEmailSignup: (emailInput: string) => Promise<boolean>;
};

const InitialRequestSignupModalContext: RequestSignupModalContextProp = {
    selectUseEmail: false,
    setSelectUseEmail: () => {},
    handleEmailSignup: () => {
        return new Promise(() => false);
    },
};

const RequestSignupModalContext = createContext(
    InitialRequestSignupModalContext
);
export function useRequestSignupModalContext() {
    return useContext(RequestSignupModalContext);
}

export default function RequestSignupModalProvider({ children }: ChildrenProp) {
    const cookies = new Cookies();
    const { setTempUserInfo } = useAppContext();
    const { selectedVote, selectedOptions, closeModal } =
        useVoteDetailContext();
    const [selectUseEmail, setSelectUseEmail] = useState<boolean>(false);

    // 이메일을 이용한 회원가입 관리
    // email 검증 한번 더 -> 회원가입
    // -> 회원가입 후 받아온 정보로 유저정보 세팅
    // -> 유저 정보 쿠키에 저장
    async function handleEmailSignup(emailInput: string): Promise<boolean> {
        if (!(await isUniqueEmail(emailInput))) return false;

        const newTempUserInfo: TempUserProp | null = await signup(emailInput);
        if (!newTempUserInfo) return false;
        // 응답이 성공적인 경우 유저 정보 반영하고 쿠키에 저장
        setTempUserInfo(newTempUserInfo);
        cookies.set("email", newTempUserInfo.email);
        cookies.set("kakaoId", newTempUserInfo.kakaoId);
        cookies.set("jwt", newTempUserInfo.jwt);
        closeModal();
        return true;
    }

    const requestSignupModalContext = {
        selectUseEmail,
        setSelectUseEmail,
        handleEmailSignup,
    };

    return (
        <RequestSignupModalContext.Provider value={requestSignupModalContext}>
            {children}
        </RequestSignupModalContext.Provider>
    );
}
