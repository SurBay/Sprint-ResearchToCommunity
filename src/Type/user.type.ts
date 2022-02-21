export type TempUserProp = {
    _id: string;
    email: string;
    kakaoId: string;
    jwt: string;
    participatedVoteIds: string[];
    likedVoteIds: string[];
};

export const initialTempUser: TempUserProp = {
    _id: "initialTempUser",
    email: "",
    kakaoId: "",
    jwt: "",
    participatedVoteIds: [],
    likedVoteIds: [],
};
