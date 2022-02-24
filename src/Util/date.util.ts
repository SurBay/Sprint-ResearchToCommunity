// 주어진 날짜를 YYYY.MM.DD HH:MM 형식으로 반환
export function getDotFormDate(date: string | Date) {
    const refinedDate = new Date(date);
    return `${refinedDate.getFullYear()}.${unitStablizer(
        refinedDate.getMonth() + 1
    )}.${unitStablizer(refinedDate.getDate())} ${unitStablizer(
        refinedDate.getHours()
    )}:${unitStablizer(refinedDate.getMinutes())}`;
}

// 현재 시간을 MM.DD HH:MM 형식으로 반환
export function getNowInDotForm() {
    const now = new Date();
    return `${unitStablizer(now.getMonth() + 1)}.${unitStablizer(
        now.getDate()
    )} ${unitStablizer(now.getHours())}:${unitStablizer(now.getMinutes())}`;
}

// 주어진 날짜가 현재보다 과거인지 (투표 종료됐는지) 반환
export function isDatePassed(date: string | Date) {
    const refinedDate = new Date(date);
    const now = new Date();
    return now > refinedDate;
}

// 주어진 날짜가 오늘이라면 시간만,
// 그렇지 않다면 날짜만 반환
export function getUpcomingVoteDate(date: string | Date) {
    const refinedDate = new Date(date);
    const now = new Date();
    if (
        refinedDate.getMonth() === now.getMonth() &&
        refinedDate.getDate() === now.getDate()
    ) {
        return `TODAY ${unitStablizer(refinedDate.getHours())}:${unitStablizer(
            refinedDate.getMinutes()
        )}`;
    }
    return `${unitStablizer(refinedDate.getMonth() + 1)}.${unitStablizer(
        refinedDate.getDate()
    )}`;
}

// 자릿수 맞추는 함수
function unitStablizer(value: number) {
    return value >= 10 ? value : `0${value}`;
}
