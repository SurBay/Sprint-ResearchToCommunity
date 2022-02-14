export type TempUserProp = {
    _id: string;
    email?: string;
    kakaoId?: string;
    participatedVoteIds: string[];
};

export const initialTempUser: TempUserProp = {
    _id: "initialTempUser",
    email: "",
    kakaoId: "",
    participatedVoteIds: [],
};
