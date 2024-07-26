export interface ProductListInterface {}

export interface ProductFilterInterface {
    title: string | null;
    skip: string | null;
    take: string | null;
    minPrice?: string | null;
    maxPrice?: string | null;
}