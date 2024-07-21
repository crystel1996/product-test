import { ProductValidationInputInterface } from "./../../Validation/Product/interface";

export interface ProductCreateInputInterface extends ProductValidationInputInterface {}

export interface ProductUpdateInputInterface extends ProductValidationInputInterface {
    id: number;
}

export interface ProductListInputInterface {
    title?: string;
    minPrice?: number;
    maxPrice?: number;
    take: number;
    skip: number;
}