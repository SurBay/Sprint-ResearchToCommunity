import { Color } from "./Color";
import { kakaoTheme, profileTheme, voteTheme } from "./Distribute";

export const Theme = {
    color: Color,

    kakao: kakaoTheme,
    profile: profileTheme,
    vote: voteTheme,

    // header
    headerColor: Color.mainTheme,

    // div - color
    voteDoneBackgroundColor: Color.doneTagBackgroundGray,
    hotTagColor: Color.mainTheme,
    highestResultBarColor: Color.mainTheme,

    // button - color
    voteOptionSelectedBorderColor: Color.mainTheme,
    voteSubmitButtonBackgroundColor: Color.mainTheme,
    emailSubmitButtonBackgroundColor: Color.mainTheme,

    // text - color
    emphasizedTextColor: Color.mainTheme,

    // input - color
    emailUnavailableColor: Color.unavailableRed,
    emailAvailableColor: Color.availableGreen,

    // lengths
    headerHeight: "50px",
};
