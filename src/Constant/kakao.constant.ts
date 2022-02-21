import { SERVICE_URL } from ".";

export const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";

export const KAKAO_JAVASCRIPT_KEY = process.env.KAKAO_JAVASCRIPT_KEY || "";

// TODO: SERVICE_URL 왜 자꾸 localhost로 가져오는지
// BEFORE PUBLISH: REDIRECT URL 설정
// const KAKAO_OAUTH_REDIRECT_URL = `http://localhost:3000/kakao-oauth`;
// const KAKAO_OAUTH_REDIRECT_URL = `https://surbay-sprint.netlify.app/kakao-oauth`;
// TODO: (SIGNIFICANT) netlify에서 kakao oauth redirect하는 경우 /가 하나 더 붙음
const KAKAO_OAUTH_REDIRECT_URL = `https://surbay-sprint.netlify.app//kakao-oauth`;

export const KAKAO_OAUTH_REQUEST_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_OAUTH_REDIRECT_URL}&response_type=code`;
