import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useAppContext } from "../../App/AppProvider";
import { isUniqueEmail, signup, toastSuccessMessage } from "../../Util";
import { ChildrenProp, TempUserProp } from "../../Type";
import { useVoteDetailContext } from "../../Page/Vote/Vote__Detail/Vote__DetailProvider";
import { API_ENDPOINT } from "../../Constant";

type RequestSignupModalContextProp = {
    selectUseEmail: boolean;
    setSelectUseEmail: (status: boolean) => void;
    handleEmailSignup: (emailInput: string) => Promise<boolean>;
    handleUnLoggedInUserParticipate: () => void;
};

const InitialRequestSignupModalContext: RequestSignupModalContextProp = {
    selectUseEmail: false,
    setSelectUseEmail: () => {},
    handleEmailSignup: () => {
        return new Promise(() => false);
    },
    handleUnLoggedInUserParticipate: () => {},
};

const RequestSignupModalContext = createContext(
    InitialRequestSignupModalContext
);
export function useRequestSignupModalContext() {
    return useContext(RequestSignupModalContext);
}

export default function RequestSignupModalProvider({ children }: ChildrenProp) {
    const {
        landingType,
        tempUserInfo,
        setTempUserInfo,
        setCookie,
        applyUpdatedSelectedVote,
    } = useAppContext();
    const { selectedVote, selectedOptions, setSelectedVote, closeModal } =
        useVoteDetailContext();
    const [selectUseEmail, setSelectUseEmail] = useState<boolean>(false);

    // 이메일을 이용한 회원가입 관리
    // email 검증 한번 더 -> 회원가입
    // -> 회원가입 후 받아온 정보로 유저정보 세팅
    // -> 유저 정보 쿠키에 저장
    async function handleEmailSignup(emailInput: string): Promise<boolean> {
        if (!(await isUniqueEmail(emailInput))) return false;

        const newTempUserInfo: TempUserProp | null = await signup(
            landingType,
            emailInput
        );
        if (!newTempUserInfo) return false;
        // 응답이 성공적인 경우 유저 정보 반영하고 쿠키에 저장
        setTempUserInfo(newTempUserInfo);
        setCookie("email", newTempUserInfo.email);
        setCookie("kakaoId", newTempUserInfo.kakaoId);
        setCookie("jwt", newTempUserInfo.jwt);
        closeModal();
        toastSuccessMessage("이메일 로그인이 완료되었습니다");
        return true;
    }

    // 비로그인 유저 투표 참여
    async function handleUnLoggedInUserParticipate() {
        // VoteDetailProvider의 updateUserVoteParticipateInfo() 함수와 같음
        const updatedUserInfo = { ...tempUserInfo };
        updatedUserInfo.participatedVoteIds.push(selectedVote._id);
        setTempUserInfo(updatedUserInfo);

        // VoteDetailProvider의 updateAndReturnSelectedVote() 함수와 같음
        const updatedSelectedVote = { ...selectedVote };
        selectedOptions.forEach((optionIndex) => {
            updatedSelectedVote.polls[optionIndex].participants_userids.push(
                tempUserInfo.email
            );
        });
        setSelectedVote(updatedSelectedVote);
        applyUpdatedSelectedVote(updatedSelectedVote);

        await axios.patch(`${API_ENDPOINT}/api/votes/participants`, {
            voteId: selectedVote._id,
            email: "NaN",
            selectedOptions,
        });
    }

    const requestSignupModalContext = {
        selectUseEmail,
        setSelectUseEmail,
        handleEmailSignup,
        handleUnLoggedInUserParticipate,
    };

    return (
        <RequestSignupModalContext.Provider value={requestSignupModalContext}>
            {children}
        </RequestSignupModalContext.Provider>
    );
}
