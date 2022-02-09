import { AxiosError } from "axios";

export function handleAxiosError(error: AxiosError, func_name: string) {
    console.log(`ERROR: ${func_name}() 호출 중 아래의 문제가 발생했습니다`);
    // 2xx 이외의 상태 코드 응답이 있는 경우
    if (error.response) {
        console.log(`STATUS CODE ${error.response.status} - data:`);
        console.dir(error.response.data);
        // 서버 응답이 없는 경우
    } else if (error.request) {
        console.log(`서버로부터 응답이 없습니다`);
    } else {
        console.log(`요청 과정에 문제가 있습니다: ${error.message}`);
    }
}
