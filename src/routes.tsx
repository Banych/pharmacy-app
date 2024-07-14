import { createHashRouter } from "react-router-dom";

import App from "./App";
import MedicinesList from "./components/medicines-list/MedicinesList";

export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [{
      path: 'medicines',
      element: <MedicinesList />
    }],
  },
]);
