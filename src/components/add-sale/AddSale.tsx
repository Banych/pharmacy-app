import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Sale } from "../../models/sales";
import useSalesHook from "../../hooks/useSales.hook";
import { useNavigate } from "react-router-dom";
import styles from "./AddSale.module.css";
import useMedicinesHook from "../../hooks/useMedicines.hook";
import { Medicine } from "../../models/medicine";

export const AddSales = () => {
  const navigate = useNavigate();

  const defaultSale: Omit<Sale, "id"> = {
    medicineId: -1,
    quantity: 0,
    date: new Date(),
  };
  const [newSale, setNewSale] = useState<Omit<Sale, "id">>({
    ...defaultSale,
  });

  const [submitCount, setSubmitCount] = useState(0);

  const [medicines, setMedicines] = useState<Medicine[]>([]);

  const { addItem, isAddLoading } = useSalesHook();
  const {
    fetchItems: fetchMedicines,
    isFetchLoading: isFetchMedicineLoading,
    updateItem: updateMedicine,
    isUpdateLoading: isUpdateMedicine,
  } = useMedicinesHook();

  const isValid = useMemo(() => {
    return (
      newSale.medicineId !== defaultSale.medicineId &&
      newSale.quantity !== defaultSale.quantity &&
      newSale.date !== defaultSale.date
    );
  }, [
    defaultSale.date,
    defaultSale.medicineId,
    defaultSale.quantity,
    newSale.date,
    newSale.medicineId,
    newSale.quantity,
  ]);

  const handleChangeMedicineId: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setNewSale((prev) => ({ ...prev, medicineId: Number(e.target.value) }));
  };

  const handleChangeQuantity: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewSale((prev) => ({ ...prev, quantity: Number(e.target.value) }));
  };

  const handleChangeDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewSale((prev) => ({ ...prev, date: new Date(e.target.value) }));
  };

  const handleClickAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (submitCount === 0 && !isValid) {
      setSubmitCount((prev) => prev + 1);
      return;
    }

    const medicineToUpdate = medicines.find(
      (item) => item.id === newSale.medicineId
    );
    if (medicineToUpdate) {
      updateMedicine({
        ...medicineToUpdate,
        stock: medicineToUpdate.stock - newSale.quantity,
      }).then(() => {
        addItem(newSale).then(() => {
          navigate("/sales");
        });
      });
    }
  };

  const handleClickBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate("/sales");
  };

  useEffect(() => {
    fetchMedicines().then((newMedicines) => {
      if (newMedicines) {
        setMedicines(newMedicines);
      }
    });
  }, [fetchMedicines]);

  return (
    <div className={styles.container}>
      <h3>Add Sale</h3>
      <form>
        <div className={styles["input-group"]}>
          <label htmlFor="medicineId">MedicineId</label>
          <select
            id="medicineId"
            onChange={handleChangeMedicineId}
            defaultValue={-1}
          >
            {isFetchMedicineLoading && (
              <option value="loading" selected>
                Loading items...
              </option>
            )}
            <option value="default" >Please, select!</option>
            {medicines.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} - {item.stock}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="quantity">Quantity</label>
          <input
            min={0}
            type="number"
            id="quantity"
            onChange={handleChangeQuantity}
          />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" onChange={handleChangeDate} />
        </div>

        {!isValid && submitCount > 0 && (
          <div className={styles["error-message"]}>
            Please, fill out all fields!
          </div>
        )}

        <div className={styles.buttons}>
          <button
            className={styles["back-button"]}
            type="button"
            onClick={handleClickBack}
          >
            Back
          </button>
          <button
            className={styles["add-button"]}
            type="submit"
            onClick={handleClickAdd}
            disabled={
              isAddLoading || (!isValid && submitCount > 0) || isUpdateMedicine
            }
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
