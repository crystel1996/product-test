export interface ProductAddInputInterface {
    id?: number;
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