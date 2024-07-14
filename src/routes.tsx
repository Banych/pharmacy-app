import { createHashRouter } from "react-router-dom";

import App from "./App";
import MedicinesList from "./components/medicines-list/MedicinesList";
import { AddMedicine } from "./components/add-medicine/AddMedicine";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
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
    ],
  },
]);
