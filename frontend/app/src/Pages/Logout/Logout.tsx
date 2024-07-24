import { FC, useEffect } from "react";
import { LogoutPageInterface } from "./interface";
import { RemoveCookies } from "../../Services/Session/Cookies";

export const LogoutPage: FC<LogoutPageInterface> = () => {

    useEffect(() => {
        const handleLogout = () => {
            RemoveCookies('accessToken');
            window.location.href = '/login'
        };

        handleLogout();

    }, []);

    return <></>
}