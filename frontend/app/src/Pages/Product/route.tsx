import { RouterInterface } from "../../Router";
import { ProductListPage } from "./List";

export const ProductRoute: RouterInterface[] = [
    {
        path: '/product/list',
        element: <ProductListPage />
    }
];