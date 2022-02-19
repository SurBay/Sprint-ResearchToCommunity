import React, { createContext, useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { useAppContext } from "../../../App/AppProvider";
import {
    VoteProp,
    AdjoiningVoteProp,
    initialVote,
    initialAdjoiningVoteProp,
    ChildrenProp,
    TempUserProp,
} from "../../../Type";

type VoteDetailContextProp = {
    selectedVote: VoteProp;
    prevVote: AdjoiningVoteProp;
    nextVote: AdjoiningVoteProp;
    selectedOptions: number[];
    modalOpened: boolean;
    toggleVoteOption: (optionIndex: number) => void;
    submitVote: () => void;
    closeModal: () => void;
};

const InitialVoteDetailContext: VoteDetailContextProp = {
    selectedVote: initialVote,
    prevVote: initialAdjoiningVoteProp,
    nextVote: initialAdjoiningVoteProp,
    selectedOptions: [],
    modalOpened: false,
    toggleVoteOption: () => {},
    submitVote: () => {},
    closeModal: () => {},
};

const VoteDetailContext = createContext(InitialVoteDetailContext);
export function useVoteDetailContext() {
    return useContext(VoteDetailContext);
}

export default function VoteDetailProvider({ children }: ChildrenProp) {
    const { voteId } = useParams();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const {
        tempUserInfo,
        allVote,
        allVoteLoaded,
        updateUserVoteParticipationInfo,
        updateVoteParticipatedUserInfo,
    } = useAppContext();
    const [selectedVote, setSelectedVote] = useState<VoteProp>(initialVote);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const [prevVote, setPrevVote] = useState<AdjoiningVoteProp>(
        initialAdjoiningVoteProp
    );
    const [nextVote, setNextVote] = useState<AdjoiningVoteProp>(
        initialAdjoiningVoteProp
    );
    const [modalOpened, setModalOpened] = useState<boolean>(false);

    useEffect(() => {
        if (!voteId) {
            // voteId가 없는 경우 튕겨냄
            navigate("/", { replace: true });
        }

        return () => {};
    }, []);

    // 선택한 투표 정보 및 인접한 투표 정보 로드:
    // allVote 데이터가 이미 모든 투표 정보를 가져왔으므로 재활용
    // 단, allVote를 가져오는 행위는 비동기이므로
    // 의존성 배열에 allVote가 로드 되었는지 확인하는 플래그를 포함시켜야 함
    useEffect(() => {
        if (voteId) {
            getVoteDetail(voteId);
        }
    }, [allVoteLoaded, voteId]);

    // 선택한 투표 세부정보 로드
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
            _id: allVote.current[index + 1]._id || "",
            title: allVote.current[index + 1].title || "(이전 글이 없습니다)",
        };
        const nextVote = {
            _id: allVote.current[index - 1]._id || "",
            title: allVote.current[index - 1].title || "(다음 글이 없습니다)",
        };
        setPrevVote(prevVote);
        setNextVote(nextVote);
    }

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
    function submitVote() {
        if (tempUserInfo.email || tempUserInfo.kakaoId) {
            // TODO: axios call
            const updatedSelectedVote = updateAndReturnSelectedVote();
            updateUserVoteParticipationInfo(updatedSelectedVote._id);
            updateVoteParticipatedUserInfo(updatedSelectedVote);
        } else {
            saveParticipatingVoteInfo();
            setModalOpened(true);
        }
    }

    // 투표 참여: selectedVote에 user 정보 추가하고 반환
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

        if (tempUserInfo.email) {
            // 이메일로 로그인 한 경우
            selectedOptions.forEach((optionIndex) => {
                updatedSelectedVote.polls[
                    optionIndex
                ].participatedTempUserEmails.push(tempUserInfo.email);
            });
            setSelectedVote(updatedSelectedVote);
            return updatedSelectedVote;
        }
        return updatedSelectedVote;
    }

    function saveParticipatingVoteInfo() {
        console.log(`비로그인 유저 투표 참여 정보를 저장합니다`);
        cookies.set("reservedVoteId", selectedVote._id);
        cookies.set("reservedSelectedOptions", selectedOptions);
    }

    function closeModal() {
        setModalOpened(false);
    }

    const voteDetailContext = {
        selectedVote,
        prevVote,
        nextVote,
        selectedOptions,
        modalOpened,
        toggleVoteOption,
        submitVote,
        closeModal,
    };

    return (
        <VoteDetailContext.Provider value={voteDetailContext}>
            {children}
        </VoteDetailContext.Provider>
    );
}
