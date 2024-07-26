import { ProductInterface } from "../../App/Features/Product/interface";

export interface ProductFormInterface {
    item?: ProductInterface
}

export interface ProductInputInterface {
    id?: number;
    name: string;
    price: number;
    description: string;
}