// #!declare #!declare global
// 아래 구문은 index.tsx 에서 window Interface 를 global 하게 정의했기에 가능함
const { Kakao } = window;

export function kakaoInitialize() {
    // TODO (env)
    // 카카오
    Kakao.init("0e1944dde977eddb1428e13cb7f42b5b");
}

// button의 onClick 리스너에 포함 => sendDefault에 구성된 내용에 따라 카드형태의 공유 메세지 전송
export function sendKakaoFeedMessage() {
    const sharedURL = location.href;

    Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
            title: "선글라스 무한 증식시키기",
            description: "넋 놓고 보게 되는 선글라스 짤을 무한으로 즐기세요",
            imageUrl:
                "https://theawesomedaily.com/wp-content/uploads/2020/04/puts-on-sunglasses-feat-1-1.jpg",
            link: {
                webUrl: sharedURL,
                mobileWebUrl: sharedURL,
            },
        },
        buttons: [
            {
                title: "나도 증식시키기",
                link: {
                    webUrl: sharedURL,
                    mobileWebUrl: sharedURL,
                },
            },
        ],
    });
}
