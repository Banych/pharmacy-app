import { DBSchema } from "idb";
import { Medicine } from "./medicine";
import { Sale } from "./sales";

export interface StoreDB extends DBSchema {
  medicines: {
    key: number;
    value: Medicine;
    indexes: { "by-name": string; "by-category": string; "by-stock": number };
  };
  sales: {
    key: string;
    value: Sale;
  };
}
