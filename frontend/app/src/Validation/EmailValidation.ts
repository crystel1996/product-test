export const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const isEmailValid = (email?: string) => {
    if(!email) {
        return false;
    }
    return email.match(EMAIL_REGEX);
}