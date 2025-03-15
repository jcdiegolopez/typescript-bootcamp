import { VariantDTO } from "./variant";

export interface ProductDetailDTO {
    id: number;
    name: string;
    image: string | null;
    description: string | null;
    price: number;
    variants: VariantDTO[];
  }
  