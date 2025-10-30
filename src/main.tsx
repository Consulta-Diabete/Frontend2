import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/theme.css";
import { AuthProvider } from "./context/AuthContext";
import DrugsPage from "./pages/DrugsPage";
import Login from "./pages/Login";
import { GlucoseProvider } from "./context/Glucose";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/drugs", element: <DrugsPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <GlucoseProvider>
        <RouterProvider router={router} />
      </GlucoseProvider>
    </AuthProvider>
  </React.StrictMode>
);
