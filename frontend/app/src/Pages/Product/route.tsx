import { RouterInterface } from "../../Router";
import { ProductFormPage } from "./Add";
import { ProductListPage } from "./List";

export const ProductRoute: RouterInterface[] = [
    {
        path: '/product/list',
        element: <ProductListPage />
    },
    {
        path: '/product/add',
        element: <ProductFormPage />
    }
];