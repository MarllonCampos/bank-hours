import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./lib/dayjs";
import { AppRoutes } from "./routes";
import "./services/firebase";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
