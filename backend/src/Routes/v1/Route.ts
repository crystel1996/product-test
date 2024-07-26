import express from 'express';
import { AuthenticationRoute } from "./AuthenticationRoute";
import { ProductRoute } from './ProductRoute';

const router = express.Router();

const authenticationRoute = new AuthenticationRoute();
const productRoute = new ProductRoute();

const Routes = [
    {
        path: '/auth',
        route: authenticationRoute.login()
    },
    {
        path: '/auth',
        route: authenticationRoute.me()
    },
    {
        path: '/product',
        route: productRoute.create()
    },
    {
        path: '/product',
        route: productRoute.update()
    },
    {
        path: '/product',
        route: productRoute.delete()
    },
    {
        path: '/product',
        route: productRoute.list()
    },
    {
        path: '/product',
        route: productRoute.product()
    }
]

Routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;