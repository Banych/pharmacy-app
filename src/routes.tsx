import { createHashRouter } from "react-router-dom";

import App from "./App";
import MedicinesList from "./components/medicines-list/MedicinesList";
import { AddMedicine } from "./components/add-medicine/AddMedicine";
import SalesList from "./components/sales-list/SalesList";
import { AddSales } from "./components/add-sale/AddSale";
import { Home } from "./components/home/Home";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        index: true,
      },
      {
        path: "medicines",
        children: [
          { path: "", element: <MedicinesList />, index: true },
          {
            path: "add",
            element: <AddMedicine />,
          },
        ],
      },
      {
        path: "sales",
        children: [
          { path: "", element: <SalesList />, index: true },
          {
            path: "add",
            element: <AddSales />,
          },
        ],
      },
    ],
  },
]);
