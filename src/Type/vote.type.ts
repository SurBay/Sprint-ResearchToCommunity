export type ReplyProp = {};

export type VoteCommentProp = {
    _id: string;
    writer: string;
    content: string;
    date: Date;
    reply: ReplyProp[];
    writer_name: string;
    hide: boolean;
};

export type PollProp = {
    content: string; //항목 내용
    participants_userids: string[]; //항목 참여자들
    participatedTempUserEmails: string[]; //
    image: string; //이미지 url
};

export type VoteProp = {
    _id: string;
    title: string; //제목
    content: string; //글 내용
    author: string; //작성자
    date?: Date; //게시 날짜
    deadline?: Date;
    comments?: VoteCommentProp[]; //댓글 리스트
    done?: boolean; //설문 마감
    author_userid?: string; //작성자 email
    multi_response?: boolean; //복수 응답 가능 여부
    participants_userids?: string[]; //참여한 유저 email
    polls?: PollProp[]; //설문 항목들
    liked_users?: string[]; //좋아요 누른 유저들(이메일)
    hide?: boolean;
    visit?: number;
};
