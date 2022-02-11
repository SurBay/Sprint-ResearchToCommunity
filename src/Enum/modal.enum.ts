// https://engineering.linecorp.com/ko/blog/typescript-enum-tree-shaking/
// typescript에서 enum을 사용하는 것이 성능적으로 손해라고 함. 자세한 내용은 위 링크 참조.

const ModalType = {
    REQUEST_KAKAO_OR_EMAIL: "REQUEST_KAKAO_OR_EMAIL",
} as const;

export type ModalType = typeof ModalType[keyof typeof ModalType];
