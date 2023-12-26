import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import "./css/index.css";
import "./css/App.css";

// Header
import Header from "./components/header/Header";

// Pages
import Homepage from "./components/homepage/Homepage";
import UploadNewManga from "./components/UploadNewManga";


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
        <div className="app">
          <div className="page">
            <Header />
            <Homepage />
          </div>
        </div>
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
