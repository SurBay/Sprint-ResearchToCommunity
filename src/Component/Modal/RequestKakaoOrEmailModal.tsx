import React, { useState } from "react";
import styled from "styled-components";
import { DefaultModalDiv, StylelessButton, DefaultInput } from "../../Style";

export default function RequestKakaoOrEmailModal() {
    const [emailInput, setEmailInput] = useState<string>("");
    const [selectUseEmail, setSelectUseEmail] = useState<boolean>(false);

    return (
        <Container selectUseEmail={selectUseEmail}>
            {/* 가이드 텍스트 */}
            <GuideTextDiv>
                <GuideText>이메일을 입력하시면</GuideText>
                <br />
                <EmphasizedGuideText>내가 투표한 내역</EmphasizedGuideText>
                <GuideText>을</GuideText>
                <br />
                <GuideText>모아볼 수 있어요!</GuideText>
            </GuideTextDiv>
            {!selectUseEmail ? (
                <>
                    {/* 모달 처음 열었을 때 */}
                    {/* 샘플 이미지 */}
                    <SampleImageDiv></SampleImageDiv>

                    {/* 로그인 옵션 선택 */}
                    <SelectOptionsDiv>
                        <SelectKakaoLoginButton>
                            카카오로 3초만에 시작하기
                        </SelectKakaoLoginButton>

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
                            <SelectLaterOptionText>
                                다음에 저장할게요
                            </SelectLaterOptionText>
                        </SelectLaterOptionTextRow>
                    </SelectOptionsDiv>
                </>
            ) : (
                <>
                    {/* 이메일로 로그인 선택시*/}
                    <EmailSubmitDiv>
                        <EmailInput
                            type="email"
                            value={emailInput}
                            onChange={(e) => {
                                setEmailInput(e.target.value);
                            }}
                            placeholder={"이메일을 입력해주세요"}
                        />
                        <EmailAvailableMessageRow>
                            <EmailAvailableMessage>
                                {` 사용할 수 없는 이메일 주소입니다`}
                            </EmailAvailableMessage>
                        </EmailAvailableMessageRow>
                        <EmailSubmitButtonRow>
                            <EmailSubmitButton>완료하기</EmailSubmitButton>
                        </EmailSubmitButtonRow>
                    </EmailSubmitDiv>
                </>
            )}
        </Container>
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
    background-color: yellow;
    border-radius: 12px;
    margin-bottom: 5vw;
`;

const SelectUseEmailTextRow = styled(SubContainerRow)`
    justify-content: center;
    margin-bottom: 9vw;
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

const EmailInput = styled(DefaultInput)`
    width: 100%;
    height: 50px;
    font-size: 13px;
    padding: 0px 18px;
    border: 1px solid gray;
    border-radius: 12px;
    margin-bottom: 5px;
`;

const EmailAvailableMessageRow = styled.div`
    padding: 0px 10px;
    margin-bottom: 40px;
`;

const EmailAvailableMessage = styled.span`
    font-size: 12px;
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
