import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../font-6/css/all.css";
import "../font-6/css/sharp-light.css";
import "../font-6/css/sharp-regular.css";
import "../font-6/css/sharp-solid.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
