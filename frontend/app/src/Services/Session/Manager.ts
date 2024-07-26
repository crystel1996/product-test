import axios from "axios"
import { GetCookies } from "./Cookies"

export const isAuthenticated = async () => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_URL}/api/auth/me`,
        data: {
            accessToken: GetCookies('accessToken')
        }
    }).then((result) => {
        console.log('[INFO]', "You are still logged", result.data);
        return;
    }).catch((error) => {
        console.log('[ERROR]', error.response.data);
        window.location.href = '/login?action=relogin'
    })
}