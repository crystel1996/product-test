export interface ItemInterface {
    name: string;
    price: number;
    id: number;
    description: string;
}

export interface TableComponentInterface {
    headerList: string[];
    items: ItemInterface[];
    count: number;
    onDelete:  (id: number) => void;
    onUpdate: (id: number) => void;
    skip?: number;
    take?: number;
}