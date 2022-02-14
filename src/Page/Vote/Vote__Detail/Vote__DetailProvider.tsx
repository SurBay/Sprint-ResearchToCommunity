import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    RefObject,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../../App/AppProvider";
import { API_ENDPOINT } from "../../../Constant";
import { VoteProp, ChildrenProp } from "../../../Type";
import { handleAxiosError } from "../../../Axios/axios.error";

type VoteDetailContextProp = {
    adjoiningVotes: { _id: string; title: string }[];
    selectedOptions: number[];
    submitVote: () => void;
    toggleVoteOption: (optionIndex: number) => void;
};

const InitialVoteDetailContext: VoteDetailContextProp = {
    adjoiningVotes: [],
    selectedOptions: [],
    submitVote: () => {},
    toggleVoteOption: () => {},
};

const VoteDetailContext = createContext(InitialVoteDetailContext);
export function useVoteDetailContext() {
    return useContext(VoteDetailContext);
}

export default function VoteDetailProvider({ children }: ChildrenProp) {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        tempUserInfo,
        recentVotes,
        selectedVote,
        allVote,
        setModalType,
        setSelectedVote,
        loadVote,
        updateUserVoteParticipationInfo,
        updateVoteParticipatedUserInfo,
    } = useAppContext();
    const [adjoiningVotes, setAdjoiningVotes] = useState<
        { _id: string; title: string }[]
    >([
        { _id: "", title: "" },
        { _id: "", title: "" },
    ]);
    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

    useEffect(() => {
        const voteId = location.state as string;
        if (!voteId) {
            // url을 수기로 쳐서 들어온 경우 튕겨냄
            navigate("/", { replace: true });
        } else {
            getVoteDetail(voteId);
            getAdjoiningVotes(voteId);
        }

        return () => {};
    }, [recentVotes]);

    // 선택한 투표 세부정보 로드
    async function getVoteDetail(voteId: string) {
        await axios
            .get<VoteProp>(`${API_ENDPOINT}/api/votes/${voteId}`)
            .then((res) => {
                setSelectedVote(res.data);
            })
            .catch((error) => {
                handleAxiosError(error, getVoteDetail.name);
                navigate("/", { replace: true });
            });
    }

    // 투표 선지 선택
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

    // 투표 참여: 로그인 되어있다면 서버와 통신하고 로컬 데이터 변경
    // 로그인 되지 않았다면 로그인 요구 모달창 띄움
    function submitVote() {
        if (tempUserInfo.email || tempUserInfo.kakaoId) {
            // TODO: axios call
            updateUserVoteParticipationInfo();
            updateVoteParticipatedUserInfo(selectedOptions);
        } else {
            setModalType("REQUEST_KAKAO_OR_EMAIL");
        }
    }

    // 이전, 다음글 정보
    function getAdjoiningVotes(voteId: string) {
        const index = recentVotes.findIndex((vote) => vote._id == voteId);
        if (index == -1) {
            // 처음 로드한 10개의 recentVote에 리다이렉트된 투표가 없다면:
            // recentVote를 더 불러온다. loadVote()는 recentVotes를 바꾸기 때문에
            // getAdjoiningVotes() 함수가 다시 실행된다
            loadVote();
        } else {
            const previousVote = recentVotes[index + 1] || {
                _id: "",
                title: "(이전 글이 없습니다)",
            };
            const nextVote = recentVotes[index - 1] || {
                _id: "",
                title: "(다음 글이 없습니다)",
            };
            setAdjoiningVotes([
                {
                    _id: previousVote._id,
                    title: previousVote.title,
                },
                {
                    _id: nextVote._id,
                    title: nextVote.title,
                },
            ]);
        }
    }

    const voteDetailContext = {
        adjoiningVotes,
        selectedOptions,
        submitVote,
        toggleVoteOption,
    };

    return (
        <VoteDetailContext.Provider value={voteDetailContext}>
            {children}
        </VoteDetailContext.Provider>
    );
}
