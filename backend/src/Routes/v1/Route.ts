import express from 'express';
import { AuthenticationRoute } from "./AuthenticationRoute";

const router = express.Router();

const authenticationRoute = new AuthenticationRoute();

const Routes = [
    {
        path: '/auth',
        route: authenticationRoute.login()
    },
    {
        path: '/auth',
        route: authenticationRoute.me()
    }
]

Routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;