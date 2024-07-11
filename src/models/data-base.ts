import { DBSchema } from "idb";
import { Medicine } from "./medicine";
import { Sale } from "./sales";

export interface StoreDB extends DBSchema {
  medicines: {
    key: keyof Medicine;
    value: Medicine;
    indexes: { "by-name": string; "by-category": string; "by-stock": number };
  };
  sales: {
    key: keyof Sale;
    value: Sale;
  };
}
