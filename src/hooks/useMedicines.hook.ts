import { useContext } from "react";
import { IDBPDatabase } from "idb";

import { StoreDB } from "../models/data-base";
import { MedicineDBContext } from "../MedicineDBProvider";

export default () => {
  const db = useContext<IDBPDatabase<StoreDB> | null>(MedicineDBContext);

  return db;
};
