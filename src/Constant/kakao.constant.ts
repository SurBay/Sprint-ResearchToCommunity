import { SERVICE_URL } from ".";

export const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY || "";

export const KAKAO_JAVASCRIPT_KEY = process.env.KAKAO_JAVASCRIPT_KEY || "";

// BEFORE PUBLISH: KAKAO OAUTH REDIRECT URL 교체
// const KAKAO_OAUTH_REDIRECT_URL = `${SERVICE_URL}/kakao-oauth`;
const KAKAO_OAUTH_REDIRECT_URL = `http://localhost:3000/kakao-oauth`;

export const KAKAO_OAUTH_REQUST_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_OAUTH_REDIRECT_URL}&response_type=code`;
