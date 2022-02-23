// YYYY.MM.DD HH:MM 형식으로 반환
export function getDotFormDate(date: string | Date) {
    const refinedDate = new Date(date);
    return `${refinedDate.getFullYear()}.${unitStablizer(
        refinedDate.getMonth()
    )}.${unitStablizer(refinedDate.getDate())} ${unitStablizer(
        refinedDate.getHours()
    )}:${unitStablizer(refinedDate.getMinutes())}`;
}

export function getNowInDotForm() {
    const now = new Date();
    return `${unitStablizer(now.getMonth())}.${unitStablizer(
        now.getDate()
    )} ${unitStablizer(now.getHours())}:${unitStablizer(now.getMinutes())}`;
}

// 자릿수 맞추는 함수
function unitStablizer(value: number) {
    return value >= 10 ? value : `0${value}`;
}

// 주어진 기간이 현재보다 과거인지 (투표 종료됐는지) 반환
export function isDatePassed(date: string | Date) {
    const refinedDate = new Date(date);
    const now = new Date();
    return now > refinedDate;
}
