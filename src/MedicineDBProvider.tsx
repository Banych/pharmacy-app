import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { IDBPDatabase, openDB } from "idb";

import { StoreDB } from "./models/data-base";

export const MedicineDBContext = createContext<IDBPDatabase<StoreDB> | null>(
  null
);

const MedicineDBProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [db, setDb] = useState<IDBPDatabase<StoreDB> | null>(null);

  useEffect(() => {
    openDB<StoreDB>("medicines", 1, {
      upgrade(db) {
        const medicines = db.createObjectStore("medicines", { keyPath: "id" });

        medicines.createIndex("by-name", "name");
        medicines.createIndex("by-category", "category");
        medicines.createIndex("by-stock", "stock");
      },
    }).then((db) => setDb(db));
  }, []);

  return (
    <MedicineDBContext.Provider value={db}>
      {children}
    </MedicineDBContext.Provider>
  );
};

export default MedicineDBProvider;
