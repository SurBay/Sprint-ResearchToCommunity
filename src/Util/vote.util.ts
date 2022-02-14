import { TempUserProp, PollProp } from "../Type";

export function hasAlreadyVoted(userInfo: TempUserProp, voteId: string) {
    if (userInfo.participatedVoteIds.includes(voteId)) return true;
    return false;
}

export function hasAlreadyVotedInOption(userInfo: string, poll: PollProp) {
    if (poll.participatedTempUserEmails.includes(userInfo)) return true;
    if (poll.participatedTempUserKakaoIds.includes(userInfo)) return true;
    return false;
}
