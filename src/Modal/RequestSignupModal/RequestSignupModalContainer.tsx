import React, { useState } from "react";
import styled from "styled-components";
import { useVoteDetailContext } from "../../Page/Vote/Vote__Detail/Vote__DetailProvider";
import { useRequestSignupModalContext } from "./RequestSignupModalProvider";
import { KakaoOauthRedirectWrapper } from "../../Component/Kakao.component";
import { isValidEmail, isUniqueEmail } from "../../Util";
import {
    SvgIcon,
    DefaultModalDiv,
    StylelessButton,
    DefaultInput,
    FlexCenteringDiv,
} from "../../Style";
import KakaoCommentIcon from "../../Resource/svg/kakaotalk-comment-icon.svg";

export default function RequestSignupModalContainer() {
    const { selectUseEmail } = useRequestSignupModalContext();

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
                    <LoginOptionSelectPart />
                </>
            ) : (
                <>
                    {/* 이메일로 로그인 선택시*/}
                    <EmailInputPart />
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
    return (
        <SampleImagePartContainer>
            <SampleImageContainer>
                <SampleVoteTag>내가 참여한 투표</SampleVoteTag>
                <SampleVoteTitleContainer>
                    <SampleVoteTitle>
                        다음 생에 고양이로 태어난다면?
                    </SampleVoteTitle>
                </SampleVoteTitleContainer>
                <SampleVoteTitleContainer>
                    <SampleVoteTitle>
                        눈치게임: 남들이 제일 적게 고를 것 같은 숫자는?
                    </SampleVoteTitle>
                </SampleVoteTitleContainer>
                <SampleVoteTitleContainer>
                    <SampleVoteTitle>겨울철 최강 간식은?</SampleVoteTitle>
                </SampleVoteTitleContainer>
                <SampleVoteDot />
                <SampleVoteDot />
                <SampleVoteDot />
            </SampleImageContainer>
        </SampleImagePartContainer>
    );
}

function LoginOptionSelectPart() {
    const { closeModal } = useVoteDetailContext();
    const { setSelectUseEmail, handleUnLoggedInUserParticipate } =
        useRequestSignupModalContext();

    return (
        <SelectOptionsPartContainer>
            <KakaoOauthRedirectWrapper>
                <SelectKakaoLoginButton>
                    <KakaoButtonContent>
                        <SvgIcon src={KakaoCommentIcon} width={"18px"} />
                        카카오로 3초만에 시작하기
                    </KakaoButtonContent>
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
                    onClick={async () => {
                        await handleUnLoggedInUserParticipate();
                        closeModal();
                    }}
                >
                    다음에 저장할게요
                </SelectLaterOptionText>
            </SelectLaterOptionTextRow>
        </SelectOptionsPartContainer>
    );
}

function EmailInputPart() {
    const { submitVote, closeModal } = useVoteDetailContext();
    const { handleEmailSignup } = useRequestSignupModalContext();
    const [emailInput, setEmailInput] = useState<string>("");
    const [emailAvailable, setEmailAvailable] = useState<boolean>(false);
    const [signingUp, setSigningUp] = useState<boolean>(false);

    return (
        <EmailSubmitDiv>
            <EmailInput
                type="email"
                value={emailInput}
                emailInput={emailInput}
                emailAvailable={emailAvailable}
                onChange={async (e) => {
                    setEmailAvailable(false);
                    setEmailInput(e.target.value);
                    if (isValidEmail(e.target.value)) {
                        if (await isUniqueEmail(e.target.value)) {
                            setEmailAvailable(true);
                        }
                    }
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
                <EmailSubmitButton
                    disabled={!emailAvailable || signingUp}
                    onClick={async () => {
                        setSigningUp(true);
                        if (!(await handleEmailSignup(emailInput))) {
                            // 회원가입 실패시
                            setSigningUp(false);
                        }
                        submitVote();
                        closeModal();
                    }}
                >
                    완료하기
                </EmailSubmitButton>
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
    overflow-y: auto;
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
const SampleImagePartContainer = styled(SubContainer)`
    height: 100%;
    padding-bottom: 30px;
`;

const SampleImageContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${(props) =>
        props.theme.modal.sampleImageBackgroundColor};
    padding: 20px 15px;
    border-radius: 15px;
    overflow: hidden;
`;

const SampleVoteTag = styled.div`
    font-size: 3.5vw;
    color: "#575757";
    margin-bottom: 20px;
`;

const SampleVoteTitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 95%;
    background-color: white;
    padding: 15px 20px;
    margin: 10px auto;
    border-radius: 12px;
`;

const SampleVoteTitle = styled.div`
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 3vw;
    color: "#757575";
    padding: 1px 0px;
`;

const SampleVoteDot = styled.div`
    width: 8px;
    height: 8px;
    background-color: white;
    margin: 12px auto;
    border-radius: 4px;
`;

// 로그인 옵션들
const SelectOptionsPartContainer = styled(SubContainer)``;

const SelectKakaoLoginButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    font-size: 15px;
    color: black;
    background-color: ${(props) => props.theme.kakao.loginButtonYellow};
    border-radius: 12px;
    margin-bottom: 18px;
    cursor: pointer;
`;

const KakaoButtonContent = styled.div`
    display: flex;
    gap: 10px;
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
    ${(props) => !props.emailInput && `border: 1px solid gray;`}
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
    ${(props) => !props.emailInput && `visibility:hidden;`}
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
    :disabled {
        color: #cccccc;
        background-color: #f5f5f5;
    }
`;
