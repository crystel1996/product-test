export interface ProductStateInterface {
    items: ProductInterface[];
    error: string;
    success: string;
}

export interface ProductInterface {
    name: string;
    price: number;
    description: string;
}