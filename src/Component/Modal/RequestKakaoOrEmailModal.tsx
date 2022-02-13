import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "../../App/AppProvider";
import { KakaoOauthRedirectWrapper } from "../Kakao.component";
import { KAKAO_OAUTH_REQUST_URL } from "../../Constant";
import { DefaultModalDiv, StylelessButton, DefaultInput } from "../../Style";

export default function RequestKakaoOrEmailModal() {
    const [selectUseEmail, setSelectUseEmail] = useState<boolean>(false);
    const [emailInput, setEmailInput] = useState<string>("");
    const [emailAvailable, setEmailAvailable] = useState<boolean>(false);

    return (
        <Container selectUseEmail={selectUseEmail}>
            {/* (공통) 가이드 텍스트 */}
            <GuideTextPart />
            {!selectUseEmail ? (
                <>
                    {/* 모달 처음 열었을 때 */}
                    {/* 샘플 이미지 */}
                    <SampleImagePart />
                    {/* 로그인 옵션 선택 */}
                    <LoginOptionSelectPart
                        setSelectUseEmail={setSelectUseEmail}
                    />
                </>
            ) : (
                <>
                    {/* 이메일로 로그인 선택시*/}
                    <EmailInputPart
                        emailInput={emailInput}
                        emailAvailable={emailAvailable}
                        setEmailInput={setEmailInput}
                    />
                </>
            )}
        </Container>
    );
}

function GuideTextPart() {
    return (
        <GuideTextDiv>
            <GuideText>이메일을 입력하시면</GuideText>
            <br />
            <EmphasizedGuideText>내가 투표한 내역</EmphasizedGuideText>
            <GuideText>을</GuideText>
            <br />
            <GuideText>모아볼 수 있어요!</GuideText>
        </GuideTextDiv>
    );
}

function SampleImagePart() {
    return <SampleImageDiv></SampleImageDiv>;
}

function LoginOptionSelectPart({
    setSelectUseEmail,
}: {
    setSelectUseEmail: (state: boolean) => void;
}) {
    const { setModalType } = useAppContext();

    return (
        <SelectOptionsDiv>
            <KakaoOauthRedirectWrapper>
                <SelectKakaoLoginButton>
                    카카오로 3초만에 시작하기
                </SelectKakaoLoginButton>
            </KakaoOauthRedirectWrapper>

            <SelectUseEmailTextRow>
                <SelectUseEmailText
                    onClick={() => {
                        setSelectUseEmail(true);
                    }}
                >
                    이메일 이용하기
                </SelectUseEmailText>
            </SelectUseEmailTextRow>

            <SelectLaterOptionTextRow>
                <SelectLaterOptionText
                    onClick={() => {
                        setModalType(null);
                    }}
                >
                    다음에 저장할게요
                </SelectLaterOptionText>
            </SelectLaterOptionTextRow>
        </SelectOptionsDiv>
    );
}

function EmailInputPart({
    emailInput,
    emailAvailable,
    setEmailInput,
}: {
    emailInput: string;
    emailAvailable: boolean;
    setEmailInput: (input: string) => void;
}) {
    return (
        <EmailSubmitDiv>
            <EmailInput
                type="email"
                value={emailInput}
                emailInput={emailInput}
                emailAvailable={emailAvailable}
                onChange={(e) => {
                    setEmailInput(e.target.value);
                }}
                placeholder={"이메일을 입력해주세요"}
            />
            <EmailAvailableMessageRow>
                <EmailAvailableMessage
                    emailInput={emailInput}
                    emailAvailable={emailAvailable}
                >
                    {emailAvailable
                        ? ` 사용가능합니다`
                        : ` 사용할 수 없는 이메일 주소입니다`}
                </EmailAvailableMessage>
            </EmailAvailableMessageRow>
            <EmailSubmitButtonRow>
                <EmailSubmitButton>완료하기</EmailSubmitButton>
            </EmailSubmitButtonRow>
        </EmailSubmitDiv>
    );
}

const Container = styled(DefaultModalDiv)<{ selectUseEmail: boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: ${(props) =>
        props.selectUseEmail ? "flex-start" : "space-between"};
    ${(props) => props.selectUseEmail && `gap:20px;`}
    width: 85%;
    height: 85%;
    border-radius: 15px;
    padding: 15px;
    overflow: hidden;
`;

const SubContainer = styled.div`
    display: block;
    width: 100%;
`;

const SubContainerRow = styled.div`
    display: flex;
`;

// 가이드 텍스트들
const GuideTextDiv = styled(SubContainer)`
    font-size: 6.5vw;
    padding: 6.5vw 3vw;
`;

const GuideText = styled.span`
    line-height: 10vw;
`;

const EmphasizedGuideText = styled(GuideText)`
    color: ${(props) => props.theme.emphasizedTextColor};
`;

// 샘플 이미지
const SampleImageDiv = styled(SubContainer)``;

// 로그인 옵션들
const SelectOptionsDiv = styled(SubContainer)``;

const SelectKakaoLoginButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    font-size: 15px;
    color: black;
    background-color: yellow;
    border-radius: 12px;
    margin-bottom: 18px;
    cursor: pointer;
`;

const SelectUseEmailTextRow = styled(SubContainerRow)`
    justify-content: center;
    margin-bottom: 28px;
`;

const SelectUseEmailText = styled.span`
    font-size: 4vw;
    color: gray;
    text-decoration: underline;
    cursor: pointer;
`;

const SelectLaterOptionTextRow = styled(SubContainerRow)`
    justify-content: flex-end;
`;

const SelectLaterOptionText = styled.span`
    font-size: 3vw;
    color: gray;
    text-decoration: underline;
    cursor: pointer;
`;

// 이메일로 로그인 선택시
const EmailSubmitDiv = styled(SubContainer)``;

const EmailInput = styled(DefaultInput)<{
    emailInput: string;
    emailAvailable: boolean;
}>`
    width: 100%;
    height: 50px;
    font-size: 13px;
    padding: 0px 18px;
    border: 2px solid
        ${(props) =>
            props.emailAvailable
                ? props.theme.emailAvailableColor
                : props.theme.emailUnavailableColor};
    ${(props) => props.emailInput == "" && `border: 1px solid gray;`}
    border-radius: 12px;
    margin-bottom: 5px;
`;

const EmailAvailableMessageRow = styled.div`
    padding: 0px 10px;
    margin-bottom: 40px;
`;

const EmailAvailableMessage = styled.span<{
    emailInput: string;
    emailAvailable: boolean;
}>`
    ${(props) => props.emailInput == "" && `visibility:hidden;`}
    font-size: 12px;
    color: ${(props) =>
        props.emailAvailable
            ? props.theme.emailAvailableColor
            : props.theme.emailUnavailableColor};
`;

const EmailSubmitButtonRow = styled(SubContainerRow)`
    justify-content: center;
`;

const EmailSubmitButton = styled(StylelessButton)`
    width: 94%;
    height: 50px;
    font-size: 15px;
    color: white;
    background-color: ${(props) =>
        props.theme.emailSubmitButtonBackgroundColor};
    border-radius: 25px;
`;
