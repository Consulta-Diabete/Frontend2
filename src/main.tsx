import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { GlucoseProvider } from "./context/Glucose";
import { UserProvider } from "./context/RegisterContext";
import DrugsPage from "./pages/DrugsPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoute } from "./routes/PrivateRoute";
import "./styles/theme.css";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/drugs",
    element: (
      <ProtectedRoute>
        <DrugsPage />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <GlucoseProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </GlucoseProvider>
    </AuthProvider>
  </React.StrictMode>
);
