// YYYY.MM.DD HH:MM 형식으로 반환
export function getDotFormDate(date: string | Date) {
    const deadline = new Date(date);
    return `${deadline.getFullYear()}.${unitStablizer(
        deadline.getMonth()
    )}.${unitStablizer(deadline.getDate())} ${unitStablizer(
        deadline.getHours()
    )}:${unitStablizer(deadline.getMinutes())}`;
}

// 자릿수 맞추는 함수
function unitStablizer(value: number) {
    return value >= 10 ? value : `0${value}`;
}

//

export function isDatePassed(date: string | Date) {
    const deadline = new Date(date);
    const now = new Date();
    return now > deadline;
}
