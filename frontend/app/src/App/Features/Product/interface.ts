export interface ProductStateInterface {
    items: ProductInterface[];
    error: string;
    success: string;
    count: number;
    delete?: {
        id: number;
        open: boolean;
    }
}

export interface ProductInterface {
    id: number;
    title: string;
    price: number;
    description: string;
}