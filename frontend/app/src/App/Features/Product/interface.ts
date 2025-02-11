export interface ProductStateInterface {
    items: ProductInterface[];
    error: string;
    success: string;
    count: number;
    item?: ProductInterface;
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