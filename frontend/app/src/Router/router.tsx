import { createBrowserRouter } from "react-router-dom";
import { RouterInterface } from "./interface";
import { LoginRoute } from "../Pages/Login";
import { ProductRoute } from "../Pages/Product";
import { LogoutRoute } from "../Pages/Logout/route";

export const LIST_ROUTE: RouterInterface[] = [
    ...LoginRoute,
    ...ProductRoute,
    ...LogoutRoute
]

export const ROUTER = createBrowserRouter(LIST_ROUTE as RouterInterface[])