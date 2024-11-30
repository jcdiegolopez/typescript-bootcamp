import { CollectionDTO } from "./collection";

export interface ProductDTO {
    id: number;
    name: string;
    description: string | null;
    image: string | null;
    price: number;
    collections: CollectionDTO[];
}