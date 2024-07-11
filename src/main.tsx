import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import MedicineDBProvider from "./MedicineDBProvider.tsx";
import { router } from "./routes.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MedicineDBProvider>
      <RouterProvider router={router} />
    </MedicineDBProvider>
  </React.StrictMode>
);
