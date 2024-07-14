import {
  createContext,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
import { IDBPDatabase, openDB } from "idb";

import { StoreDB } from "./models/data-base";

export const MedicineDBContext = createContext<IDBPDatabase<StoreDB> | null>(
  null
);

const MedicineDBProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [db, setDb] = useState<IDBPDatabase<StoreDB> | null>(null);
  const connectDB = async () => {
    const DB = await openDB<StoreDB>("medicines", 1, {
      upgrade(db) {
        const medicines = db.createObjectStore("medicines", {
          keyPath: "id",
          autoIncrement: true,
        });

        medicines.createIndex("by-name", "name");
        medicines.createIndex("by-category", "category");
        medicines.createIndex("by-stock", "stock");
      },
    });
    setDb(DB);
  };
  useEffect(() => {
    connectDB();
  }, []);

  return (
    <Suspense fallback={<div>Loading DB...</div>}>
      <MedicineDBContext.Provider value={db}>
        {children}
      </MedicineDBContext.Provider>
    </Suspense>
  );
};

export default MedicineDBProvider;
