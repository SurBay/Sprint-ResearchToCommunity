import React, { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "../../App/AppProvider";
import { VoteProp, ChildrenProp } from "../../Type";

type ProfileContextProp = {
    participatedVotes: VoteProp[];
};

const InitialProfileContext: ProfileContextProp = {
    participatedVotes: [],
};

const ProfileContext = createContext(InitialProfileContext);
export function useProfileContext() {
    return useContext(ProfileContext);
}

export default function ProfileProvider({ children }: ChildrenProp) {
    const { allVote, allVoteLoaded, tempUserInfo } = useAppContext();
    const [participatedVotes, setParticipatedVotes] = useState<VoteProp[]>([]);

    useEffect(() => {
        getParticipatedVotes();
        return;
    }, [allVoteLoaded, tempUserInfo]);

    // 참여한 투표 정보 세팅
    function getParticipatedVotes() {
        const participatedVotes: VoteProp[] = [];
        tempUserInfo.participatedVoteIds.forEach((voteId) => {
            if (!allVote?.current) return;
            const voteIndex = allVote.current.findIndex((vote) => {
                return vote._id == voteId;
            });
            if (voteIndex !== -1) {
                participatedVotes.push(allVote.current[voteIndex]);
            }
        });
        setParticipatedVotes(participatedVotes);
    }

    const profileContext = { participatedVotes };

    return (
        <ProfileContext.Provider value={profileContext}>
            {children}
        </ProfileContext.Provider>
    );
}
