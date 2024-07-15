import { useCallback, useEffect, useMemo, useState } from "react";
import useMedicinesHook from "../../hooks/useMedicines.hook";
import useSalesHook from "../../hooks/useSales.hook";
import { Medicine } from "../../models/medicine";
import { Sale } from "../../models/sales";
import styles from "./Home.module.css"

export const Home = () => {
  const { fetchItems: fetchMedicines, isFetchLoading: isFetchMedicineLoading } =
    useMedicinesHook();
  const { fetchItems: fetchSales, isFetchLoading: isFetchSalesLoading } =
    useSalesHook();

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  const fetchItems = useCallback(() => {
    fetchSales().then((dbSales) => {
      if (dbSales) {
        setSales(dbSales);
      }
    });
    fetchMedicines().then((dbMedicines) => {
      if (dbMedicines) {
        setMedicines(dbMedicines);
      }
    });
  }, [fetchMedicines, fetchSales]);

  const medicinesCount = useMemo(() => {
    return medicines.length;
  }, [medicines.length]);

  const salesCount = useMemo(() => {
    return sales.length;
  }, [sales.length]);

  const soldCount = useMemo(() => {
    return sales.reduce((summ, item) => {
      return summ + item.quantity;
    }, 0);
  }, [sales]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div>
      <h3>Home</h3>
      <div>
        <div>
          <h4 className={styles['div-h']}>Medicines count in stock</h4>
          <span>{medicinesCount}</span>
        </div>
        <div>
          <h4 className={styles['div-h']}>Sales count</h4>
          <span>{salesCount}</span>
        </div>
        <div>
          <h4 className={styles['div-h']}>Sold medicines</h4>
          <span>{soldCount}</span>
        </div>
      </div>
    </div>
  );
};
