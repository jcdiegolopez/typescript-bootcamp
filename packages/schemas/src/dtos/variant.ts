import { OptionValueDTO } from "./optionvalue";

export interface VariantDTO {
    id: number;
    name: string;
    image: string | null;
    description: string | null;
    optionValues: OptionValueDTO[];
  }
  