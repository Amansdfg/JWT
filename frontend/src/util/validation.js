export function isEmail(value) {
    return value.includes('@');
}
export function isStartWithUpperCase(value){
    if (value.length === 0) {
        return false;
    }
    return /^[A-Z]/.test(value);
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}

export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
    return value === otherValue;
}
export function time(time){
    return time.getHours()+":"+(time.getMinutes()<9?"0"+time.getMinutes():time.getMinutes());
}