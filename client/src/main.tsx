import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "./index.css";

import App from "./components/App";
import UploadNewManga from "./components/UploadNewManga";


// Компонент провайдера аутентификации
import { AuthProvider } from './contexts/FirebaseAuthContext';
// Guards
import GuestGuard from './guards/GuestGuard';
import UserGuard from './guards/UserGuard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/upload-new-manga",
    element: <UploadNewManga />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="page">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
