import { createBrowserRouter } from "react-router-dom";
import { RouterInterface } from "./interface";
import { HomeRoute } from "../Pages/Home";
import { LoginRoute } from "../Pages/Login";
import { ProductRoute } from "../Pages/Product";

export const LIST_ROUTE: RouterInterface[] = [
    ...HomeRoute,
    ...LoginRoute,
    ...ProductRoute
]

export const ROUTER = createBrowserRouter(LIST_ROUTE as RouterInterface[])