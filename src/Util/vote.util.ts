import { TempUserProp, PollProp, VoteProp } from "../Type";

export function hasAlreadyVoted(userInfo: TempUserProp, voteId: string) {
    if (userInfo.participatedVoteIds.includes(voteId)) return true;
    return false;
}

export function hasAlreadyVotedInOption(userInfo: string, poll: PollProp) {
    if (poll.participatedTempUserEmails.includes(userInfo)) return true;
    if (poll.participatedTempUserKakaoIds.includes(userInfo)) return true;
    return false;
}

export function getVoteParticipantsNumber(vote: VoteProp) {
    if (!vote.polls.length) return 0;

    let sum = 0;
    vote.polls.forEach((poll) => {
        sum += poll.participants_userids.length;
        sum += poll.participatedTempUserEmails.length;
        sum += poll.participatedTempUserKakaoIds.length;
    });
    return sum;
}

export function getPollParticipantsNumber(poll?: PollProp) {
    if (!poll) return 0;
    let sum = 0;

    sum += poll.participants_userids.length;
    sum += poll.participatedTempUserEmails.length;
    sum += poll.participatedTempUserKakaoIds.length;

    return sum;
}

// 최다 득표 수를 반환
export function getWinningPollParticipantsNumber(vote: VoteProp) {
    const voteNums: number[] = [];
    vote.polls.forEach((poll) => {
        voteNums.push(getPollParticipantsNumber(poll));
    });
    return Math.max(...voteNums);
}

export function getVoteLikedNumber(vote: VoteProp) {
    return (
        vote.liked_users.length +
        vote.likedTempUserEmails.length +
        vote.likedTempUserKakaoIds.length
    );
}
