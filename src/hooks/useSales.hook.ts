import { useCallback, useContext, useState } from "react";
import { IDBPDatabase } from "idb";

import { StoreDB } from "../models/data-base";
import { MedicineDBContext } from "../MedicineDBProvider";
import { Sale } from "../models/sales";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default () => {
  const db = useContext<IDBPDatabase<StoreDB> | null>(MedicineDBContext);

  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);

  const addItem = useCallback(
    async (item: Omit<Sale, "id">) => {
      setIsAddLoading(true);
      await delay(700);
      setIsAddLoading(false);
      return db?.add("sales", item);
    },
    [db]
  );

  const deleteItem = useCallback(
    async (id: number) => {
      setIsDeleteLoading(true);
      await delay(700);
      setIsDeleteLoading(false);
      return db?.delete("sales", id);
    },
    [db]
  );

  const fetchItems = useCallback(async () => {
    setIsFetchLoading(true);
    await delay(700);
    setIsFetchLoading(false);
    return db?.getAll("sales");
  }, [db]);

  return {
    addItem,
    deleteItem,
    fetchItems,
    isAddLoading,
    isDeleteLoading,
    isFetchLoading,
  };
};
