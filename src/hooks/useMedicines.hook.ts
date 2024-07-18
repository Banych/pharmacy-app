import { useCallback, useContext, useState } from "react";
import { IDBPDatabase } from "idb";

import { StoreDB } from "../models/data-base";
import { MedicineDBContext } from "../MedicineDBProvider";
import { Medicine } from "../models/medicine";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default () => {
  const db = useContext<IDBPDatabase<StoreDB> | null>(MedicineDBContext);

  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
  const [isFetchLoading, setIsFetchLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);

  const addItem = useCallback(
    async (item: Omit<Medicine, "id">) => {
      setIsAddLoading(true);
      await delay(700);
      setIsAddLoading(false);
      return db?.add("medicines", item);
    },
    [db]
  );

  const deleteItem = useCallback(
    async (id: number) => {
      setIsDeleteLoading(true);
      await delay(700);
      setIsDeleteLoading(false);
      return db?.delete("medicines", id);
    },
    [db]
  );

  const fetchItems = useCallback(
    async (search?: string) => {
      setIsFetchLoading(true);
      await delay(700);
      setIsFetchLoading(false);
      const items = await db?.getAll("medicines");

      if (search) {
        return items?.filter(
          (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
        );
      }

      return items;
    },
    [db]
  );

  const updateItem = useCallback(
    async (item: Medicine) => {
      setIsUpdateLoading(true);
      await delay(700);
      setIsUpdateLoading(false);
      return db?.put("medicines", item);
    },
    [db]
  );

  return {
    addItem,
    deleteItem,
    fetchItems,
    updateItem,
    isAddLoading,
    isDeleteLoading,
    isFetchLoading,
    isUpdateLoading,
  };
};
