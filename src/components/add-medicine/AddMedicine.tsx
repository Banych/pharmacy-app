import {
  ChangeEventHandler,
  MouseEventHandler,
  useMemo,
  useState,
} from "react";
import { Medicine } from "../../models/medicine";
import useMedicinesHook from "../../hooks/useMedicines.hook";
import { useNavigate } from "react-router-dom";
import styles from "./AddMedicine.module.css";

export const AddMedicine = () => {
  const navigate = useNavigate();

  const [newMedicine, setNewMedicine] = useState<Omit<Medicine, "id">>({
    name: "",
    price: 0,
    category: "",
    stock: 0,
  });

  const [submitCount, setSubmitCount] = useState(0);

  const { addItem, isAddLoading } = useMedicinesHook();

  const isValid = useMemo(() => {
    return (
      newMedicine.name !== "" &&
      newMedicine.category !== "" &&
      newMedicine.price > 0 &&
      newMedicine.stock > 0
    );
  }, [
    newMedicine.category,
    newMedicine.name,
    newMedicine.price,
    newMedicine.stock,
  ]);

  const handleChangeName: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewMedicine((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChangePrice: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewMedicine((prev) => ({ ...prev, price: Number(e.target.value) }));
  };

  const handleChangeCategory: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewMedicine((prev) => ({ ...prev, category: e.target.value }));
  };

  const handleChangeStock: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNewMedicine((prev) => ({ ...prev, stock: Number(e.target.value) }));
  };

  const handleClickAdd: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (submitCount === 0 && !isValid) {
      setSubmitCount((prev) => prev + 1);
      return;
    }
    addItem(newMedicine).then(() => {
      navigate("/medicines");
    });
  };

  const handleClickBack: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    navigate("/medicines");
  };

  return (
    <div className={styles.container}>
      <h3>Add medicine</h3>
      <form>
        <div className={styles["input-group"]}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={handleChangeName} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="price">Price</label>
          <input min={0} type="number" id="price" onChange={handleChangePrice} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="category">Category</label>
          <input type="text" id="category" onChange={handleChangeCategory} />
        </div>
        <div className={styles["input-group"]}>
          <label htmlFor="stock">Stock</label>
          <input min={1} type="number" id="stock" onChange={handleChangeStock} />
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
            disabled={isAddLoading || (!isValid && submitCount > 0)}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};
