import { useCallback, useEffect, useState } from "react";
import useMedicinesHook from "../../hooks/useMedicines.hook";
import { Medicine } from "../../models/medicine";
import styles from "./MedicinesList.module.css";
import { useNavigate } from "react-router-dom";

const MedicinesList = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const { fetchItems, isFetchLoading, deleteItem, isDeleteLoading } =
    useMedicinesHook();

  const fetchMedicines = useCallback(() => {
    fetchItems().then((dbMedicines) => {
      if (dbMedicines) {
        setMedicines(dbMedicines);
      }
    });
  }, [fetchItems]);

  const handleClickAdd = () => {
    navigate("/medicines/add");
  };

  const handleClickDelete = async (id: number) => {
    setItemToDelete(id);
    await deleteItem(id);
    setItemToDelete(null);
    fetchMedicines();
  };

  useEffect(() => {
    fetchMedicines();
  }, [fetchMedicines]);

  if (isFetchLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Medicines List</h3>
      <button onClick={handleClickAdd}>Add</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th className={styles["actions-column"]}></th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((item) => {
            return (
              <tr key={item.id} className={styles.item}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category}</td>
                <td>{item.stock}</td>
                <td className={styles["actions-column"]}>
                  <button
                    onClick={() => handleClickDelete(item.id!)}
                    disabled={isDeleteLoading && itemToDelete === item.id}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MedicinesList;
