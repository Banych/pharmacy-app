import { DBSchema } from "idb";
import { Medicine } from "./medicine";
import { Sale } from "./sales";

export interface StoreDB extends DBSchema {
  medicines: {
    key: number;
    value: Medicine;
    indexes: {
      "by-name": string;
      "by-category": string;
      "by-stock": number;
      "by-id": number;
    };
  };
  sales: {
    key: number;
    value: Sale;
    indexes: { "by-medicine-id": string };
  };
}
