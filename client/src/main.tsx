import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "./css_files/index.css";

import App from "./pages/App";
import UploadMangaPage from "./pages/UploadManga";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/UploadManga",
    element: <UploadMangaPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="page">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
