import { FC } from "react";
import { LoginPageInterface } from "./interface";
import { Login } from "../../Components/Login";
import { Title } from "../../Components/Title";

export const LoginPage: FC<LoginPageInterface> = () => {
    return <>
        <div className="flex flex-col items-center justify-center h-screen">
            
            <Title title="Product Login" />
            <Login />
        </div>
       
    </>
}