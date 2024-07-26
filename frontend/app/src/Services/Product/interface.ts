export interface ProductAddInputInterface {
    name: string;
    price: number;
    description: string;
}

export interface ProductListInputInterface {
    title?: string;
    minPrice?: number;
    maxPrice?: number;
    skip: number;
    take: number;
}