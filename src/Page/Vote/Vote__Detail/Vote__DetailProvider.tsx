import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../App/AppProvider";
import {
    VoteProp,
    AdjoiningVoteProp,
    initialVote,
    initialAdjoiningVoteProp,
    ChildrenProp,
} from "../../../Type";
import { API_ENDPOINT } from "../../../Constant";
import { handleAxiosError } from "../../../Axios/axios.error";

type VoteDetailContextProp = {
    selectedVote: VoteProp;
    hotVote: AdjoiningVoteProp;
    prevVote: AdjoiningVoteProp;
    nextVote: AdjoiningVoteProp;
    selectedOptions: number[];
    modalOpened: boolean;
    toggleVoteOption: (optionIndex: number) => void;
    submitVote: () => void;
    toggleLike: () => void;
    closeModal: () => void;
};

const InitialVoteDetailContext: VoteDetailContextProp = {
    selectedVote: initialVote,
    hotVote: initialAdjoiningVoteProp,
    prevVote: initialAdjoiningVoteProp,
    nextVote: initialAdjoiningVoteProp,
    selectedOptions: [],
    modalOpened: false,
    toggleVoteOption: () => {},
    submitVote: () => {},
    toggleLike: () => {},
    closeModal: () => {},
};

const VoteDetailContext = createContext(InitialVoteDetailContext);
export function useVoteDetailContext() {
    return useContext(VoteDetailContext);
}

export default function VoteDetailProvider({ children }: ChildrenProp) {
    const { voteId } = useParams();
    const navigate = useNavigate();
    const {
        tempUserInfo,
        allVote,
        allVoteLoaded,
        hotVotes,
        getCookie,
        setCookie,
        removeCookie,
        setTempUserInfo,
        applyUpdatedSelectedVote,
    } = useAppContext();
    const [selectedVote, setSelectedVote] = useState<VoteProp>(initialVote);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [hotVote, setHotVote] = useState<AdjoiningVoteProp>(
        initialAdjoiningVoteProp
    );
    const [prevVote, setPrevVote] = useState<AdjoiningVoteProp>(
        initialAdjoiningVoteProp
    );
    const [nextVote, setNextVote] = useState<AdjoiningVoteProp>(
        initialAdjoiningVoteProp
    );
    const [modalOpened, setModalOpened] = useState<boolean>(false);

    ///////////////////////////////////////////////////////////
    // useEffect Part

    useEffect(() => {
        if (!voteId) {
            // voteId가 없는 경우 튕겨냄
            navigate("/", { replace: true });
            return;
        }
        // 다른 투표 둘러보기로 접근한 경우 선택지가 잔존하므로 선택지 초기화
        setSelectedOptions([]);
        // 카카오 로그인하여 리다이렉트 된 경우 선택했던 옵션으로 선택지 선택
        loadAndApplyParticipatingVoteInfo();
        return () => {
            // 나갈 땐 임시선택 쿠키 삭제
            clearReservedParticipationCookie();
        };
    }, [voteId]);

    // 선택한 투표 정보 및 인접한 투표 정보 로드:
    // allVote 데이터가 이미 모든 투표 정보를 가져왔으므로 재활용
    // 단, allVote를 가져오는 행위는 비동기이므로
    // 의존성 배열에 allVote가 로드 되었는지 확인하는 플래그를 포함시켜야 함
    useEffect(() => {
        if (voteId) {
            getVoteDetail(voteId);
        }
    }, [allVoteLoaded, voteId]);

    // 다른 투표 둘러보기에서 보여줄 HOT투표 하나 가져오기
    useEffect(() => {
        getOneHotVote();
    }, [hotVotes]);

    ///////////////////////////////////////////////////////////

    // 선택한 투표 세부정보 및 인접한 정보 로드
    function getVoteDetail(voteId: string) {
        // allVote가 이미 모든 정보를 가지고 있으므로 백엔드 호출은 최소화
        if (!allVote?.current) return;

        const index = allVote.current.findIndex((vote) => {
            return vote._id == voteId;
        });

        if (index == -1) return;

        setSelectedVote(allVote.current[index]);
        setAdjoiningVotes(index);
    }

    // 인접한 투표 정보 로드
    function setAdjoiningVotes(index: number) {
        if (!allVote?.current) return;
        const prevVote = {
            _id: allVote.current[index + 1]?._id || "",
            title: allVote.current[index + 1]?.title || "(이전 글이 없습니다)",
        };
        const nextVote = {
            _id: allVote.current[index - 1]?._id || "",
            title: allVote.current[index - 1]?.title || "(다음 글이 없습니다)",
        };
        setPrevVote(prevVote);
        setNextVote(nextVote);
    }

    // 로그인하지 않은 유저 투표 참여 데이터가 있는지 확인
    // 존재한다면 마지막 선택 옵션을 자동으로 선택하고 삭제
    function loadAndApplyParticipatingVoteInfo() {
        const reservedOptions = getCookie("reservedSelectedOptions");
        if (Array.isArray(reservedOptions)) {
            setSelectedOptions(reservedOptions);
        }
        clearReservedParticipationCookie();
    }

    //// 임시 저장된 투표 참여 정보 쿠키 삭제
    function clearReservedParticipationCookie() {
        removeCookie("reservedVoteId");
        // TODO: (bug) #! cookie
        // 쿠키를 제거해도 왜 남아있는거지.. 보험삼아 초기화 함
        setCookie("reservedSelectedOptions", []);
        removeCookie("reservedSelectedOptions");
    }

    // HOT 투표 하나 로드
    function getOneHotVote() {
        setHotVote({
            _id: hotVotes[0]?._id || "",
            title: hotVotes[0]?.title || "",
        });
    }

    // useEffect Part
    ///////////////////////////////////////////////////////////

    // 투표 상세 페이지에서 선지 선택
    function toggleVoteOption(optionIndex: number) {
        // 이미 선택한 경우
        if (selectedOptions.includes(optionIndex)) {
            const newOptions = selectedOptions.filter((option) => {
                return option != optionIndex;
            });
            setSelectedOptions(newOptions);
            // 선택하지 않았던 경우
        } else {
            // 다중 선택이 가능한 경우
            if (selectedVote.multi_response) {
                // #!state #!state-synchronization
                // 주석의 방식대로 하면 state 변경을 자식 Component가 잡아내지 못한다.
                // state data가 저장된 주소를 기반으로 변경을 감지하는 듯 하다
                // (newOptions === selectedOptions 로 확인해보면 얕은 복사에 의해 true값을 반환함)

                // const newOptions = selectedOptions;
                // newOptions.push(optionIndex);
                // setSelectedOption(newOptions);
                setSelectedOptions([...selectedOptions, optionIndex]);
                // 하나만 선택할 수 있는 경우
            } else {
                setSelectedOptions([optionIndex]);
            }
        }
    }

    // 투표 참여:
    // 로그인 되어있다면 서버와 통신하고 로컬 데이터 변경
    // *로컬 데이터: 사용자 정보, 선택한 투표 정보, 전체 투표 정보, 최근 투표 정보
    // 로그인 되지 않았다면 쿠키에 투표 참여 정보 저장하고 로그인 요구 모달창 띄움
    async function submitVote() {
        if (tempUserInfo.email || tempUserInfo.kakaoId) {
            // 로컬 데이터 먼저 변경하고
            updateUserVoteParticipateInfo();
            const updatedSelectedVote = updateAndReturnSelectedVote();
            applyUpdatedSelectedVote(updatedSelectedVote);
            // 이 후 서버 통신
            if (await requestUpdateUserVoteParticipateInfo()) {
                await requestUpdateVoteParticipateUserData();
            }
        } else {
            saveParticipatingVoteInfo();
            setModalOpened(true);
        }
    }

    //// 투표 참여:
    //// 유저 정보에 투표 id 추가 (서버)
    async function requestUpdateUserVoteParticipateInfo() {
        return await axios
            .patch<boolean>(`${API_ENDPOINT}/api/temp-users/vote-participate`, {
                email: tempUserInfo.email,
                kakaoId: tempUserInfo.kakaoId,
                voteId: selectedVote._id,
            })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                handleAxiosError(
                    error,
                    requestUpdateUserVoteParticipateInfo.name
                );
                return false;
            });
    }

    //// 투표 참여:
    //// 투표 정보에 user 정보 추가 (서버)
    async function requestUpdateVoteParticipateUserData() {
        return await axios
            .patch<boolean>(`${API_ENDPOINT}/api/votes/participants`, {
                voteId: selectedVote._id,
                email: tempUserInfo.email,
                kakaoId: tempUserInfo.kakaoId,
                selectedOptions,
            })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                handleAxiosError(
                    error,
                    requestUpdateVoteParticipateUserData.name
                );
                return false;
            });
    }

    //// 투표 참여:
    //// tempUserInfo에 참여 투표 id 추가하고 반환 (로컬 데이터)
    function updateUserVoteParticipateInfo() {
        const updatedUserInfo = { ...tempUserInfo };
        updatedUserInfo.participatedVoteIds.push(selectedVote._id);
        setTempUserInfo(updatedUserInfo);
    }

    //// 투표 참여:
    //// selectedVote에 user 정보 추가하고 반환 (로컬 데이터)
    function updateAndReturnSelectedVote() {
        const updatedSelectedVote = { ...selectedVote };
        if (tempUserInfo.kakaoId) {
            // 카카오톡으로 로그인 한 경우
            selectedOptions.forEach((optionIndex) => {
                updatedSelectedVote.polls[
                    optionIndex
                ].participatedTempUserKakaoIds.push(tempUserInfo.kakaoId);
            });
            setSelectedVote(updatedSelectedVote);
            return updatedSelectedVote;
        }

        // 이메일로 로그인 한 경우
        selectedOptions.forEach((optionIndex) => {
            updatedSelectedVote.polls[
                optionIndex
            ].participatedTempUserEmails.push(tempUserInfo.email);
        });
        setSelectedVote(updatedSelectedVote);
        return updatedSelectedVote;
    }

    //// 투표 참여 :
    //// 로그인되지 않은 상태에서 투표 참여하는 경우 투표 참여 데이터 보관(카카오 로그인할 때만 쓰임)
    function saveParticipatingVoteInfo() {
        setCookie("reservedVoteId", selectedVote._id);
        setCookie("reservedSelectedOptions", selectedOptions);
    }

    // 좋아요 토글
    async function toggleLike() {
        // 로컬 데이터 먼저 변경
        toggleUserLikeInfo();
        const updatedSelectedVote = toggleAndGetVoteLikedInfo();
        applyUpdatedSelectedVote(updatedSelectedVote);
        // 이후 서버 통신
        if (await requestToggleUserLikeInfo()) {
            await requestToggleVoteLikeInfo();
        }
    }

    //// 좋아요 토글 - 유저 정보 업데이트 (서버)
    async function requestToggleUserLikeInfo() {
        return await axios
            .patch<boolean>(`${API_ENDPOINT}/api/temp-users/vote-like`, {
                email: tempUserInfo.email,
                kakaoId: tempUserInfo.kakaoId,
                voteId: selectedVote._id,
            })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                handleAxiosError(error, requestToggleUserLikeInfo.name);
                return false;
            });
    }

    //// 좋아요 토글 - 투표 정보 업데이트 (서버)
    async function requestToggleVoteLikeInfo() {
        return await axios
            .patch<boolean>(`${API_ENDPOINT}/api/votes/like`, {
                voteId: selectedVote._id,
                email: tempUserInfo.email,
                kakaoId: tempUserInfo.kakaoId,
            })
            .then((res) => {
                return res.data;
            })
            .catch((error) => {
                handleAxiosError(error, requestToggleVoteLikeInfo.name);
                return false;
            });
    }

    //// 좋아요 토글 - 유저 정보 업데이트 (로컬 데이터)
    function toggleUserLikeInfo() {
        const updatedUserInfo = { ...tempUserInfo };
        if (updatedUserInfo.likedVoteIds.includes(selectedVote._id)) {
            updatedUserInfo.likedVoteIds.splice(
                updatedUserInfo.likedVoteIds.indexOf(selectedVote._id),
                1
            );
        } else {
            updatedUserInfo.likedVoteIds.push(selectedVote._id);
        }
        setTempUserInfo(updatedUserInfo);
    }

    //// 좋아요 토글 - 투표 정보 업데이트 (로컬 데이터)
    function toggleAndGetVoteLikedInfo() {
        const updatedSelectedVote = { ...selectedVote };
        // 카카오톡으로 로그인한 경우
        if (tempUserInfo.kakaoId) {
            if (
                updatedSelectedVote.likedTempUserKakaoIds.includes(
                    tempUserInfo.kakaoId
                )
            ) {
                updatedSelectedVote.likedTempUserKakaoIds.splice(
                    updatedSelectedVote.likedTempUserKakaoIds.indexOf(
                        tempUserInfo.kakaoId
                    ),
                    1
                );
                return updatedSelectedVote;
            }
            updatedSelectedVote.likedTempUserKakaoIds.push(
                tempUserInfo.kakaoId
            );
            return updatedSelectedVote;
        }

        // 이메일로 로그인한 경우
        if (
            updatedSelectedVote.likedTempUserEmails.includes(tempUserInfo.email)
        ) {
            updatedSelectedVote.likedTempUserEmails.splice(
                updatedSelectedVote.likedTempUserEmails.indexOf(
                    tempUserInfo.email
                ),
                1
            );
            return updatedSelectedVote;
        }
        updatedSelectedVote.likedTempUserEmails.push(tempUserInfo.email);
        return updatedSelectedVote;
    }

    // 모달창 닫기
    function closeModal() {
        setModalOpened(false);
    }

    const voteDetailContext = {
        selectedVote,
        hotVote,
        prevVote,
        nextVote,
        selectedOptions,
        modalOpened,
        toggleVoteOption,
        submitVote,
        toggleLike,
        closeModal,
    };

    return (
        <VoteDetailContext.Provider value={voteDetailContext}>
            {children}
        </VoteDetailContext.Provider>
    );
}
