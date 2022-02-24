import React, { createContext, useContext, useState } from "react";
import { useAppContext } from "../../App/AppProvider";
import { isUniqueEmail, signup, toastSuccessMessage } from "../../Util";
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
    const { setTempUserInfo, setCookie } = useAppContext();
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
        console.log(newTempUserInfo.email);
        // 응답이 성공적인 경우 유저 정보 반영하고 쿠키에 저장
        setTempUserInfo(newTempUserInfo);
        setCookie("email", newTempUserInfo.email);
        setCookie("kakaoId", newTempUserInfo.kakaoId);
        setCookie("jwt", newTempUserInfo.jwt);
        closeModal();
        toastSuccessMessage("이메일 로그인이 완료되었습니다");
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
