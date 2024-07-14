import { useCallback, useEffect, useState } from "react";
import styles from "./SalesList.module.css";
import { useNavigate } from "react-router-dom";
import { Sale } from "../../models/sales";
import useSalesHook from "../../hooks/useSales.hook";

const SalesList = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState<Sale[]>([]);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const { fetchItems, isFetchLoading, deleteItem, isDeleteLoading } =
    useSalesHook();

  const fetchSales = useCallback(() => {
    fetchItems().then((dbSales) => {
      if (dbSales) {
        setSales(dbSales);
      }
    });
  }, [fetchItems]);

  const handleClickAdd = () => {
    navigate("/sales/add");
  };

  const handleClickDelete = async (id: number) => {
    setItemToDelete(id);
    await deleteItem(id);
    setItemToDelete(null);
    fetchSales();
  };

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  if (isFetchLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Sales List</h3>
      <button onClick={handleClickAdd}>Add</button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Medicine ID</th>
            <th>Quantity</th>
            <th>Date</th>
            <th className={styles["actions-column"]}></th>
          </tr>
        </thead>
        <tbody>
          {sales.map((item) => {
            return (
              <tr key={item.id} className={styles.item}>
                <td>{item.medicineId}</td>
                <td>{item.quantity}</td>
                <td>{item.date.toString()}</td>
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

export default SalesList;
