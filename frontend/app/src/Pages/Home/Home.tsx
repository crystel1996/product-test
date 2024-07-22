import { FC } from "react";
import { HomePageInterface } from "./interface";
import { Header } from "../../Components/Header";

export const HomePage: FC<HomePageInterface> = () => {
    return <>
        <Header />
    </>
}