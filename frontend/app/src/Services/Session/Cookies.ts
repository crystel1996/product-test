export const SetCookies = (key: string, value: string) => {
    document.cookie = `${key}=${value}`;
}