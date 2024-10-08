export function getQuarter(date: Date) {
    const month = date.getMonth() + 1;
    if (month >= 1 && month <= 3) {
        return 'Q1';
    } else if (month >= 4 && month <= 6) {
        return 'Q2';
    } else if (month >= 7 && month <= 9) {
        return 'Q3';
    } else {
        return 'Q4';
    }
}