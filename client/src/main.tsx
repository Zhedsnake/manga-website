import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "./index.css";

// Pages
import App from "./App";
import UploadNewManga from "./UploadNewManga";
import { Header } from "./Header";


// Компонент провайдера аутентификации
import { AuthProvider } from './contexts/FirebaseAuthContext';
// Guards
import GuestGuard from './guards/GuestGuard';
import UserGuard from './guards/UserGuard';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
  },
  {
    path: "/upload-new-manga",
    element: (
      <AuthProvider>
        <Header />
        <UploadNewManga />
      </AuthProvider>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <div className="page">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
