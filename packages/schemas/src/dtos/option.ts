import { OptionValueDTO } from "./optionvalue";

export interface OptionDTO {
    id: number;
    name: string;
    values: OptionValueDTO[];
  }
  