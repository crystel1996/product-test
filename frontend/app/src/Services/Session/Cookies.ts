export const SetCookies = (key: string, value: string) => {
    document.cookie = `${key}=${value}`;
}

export const GetCookies = (key: string) => {
    let name = key + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

export const RemoveCookies = (key: string) => {
    document.cookie =`${key}=''`;
}