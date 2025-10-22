// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/theme.css";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import DrugsPage from "./pages/DrugsPage";
import Login from "./pages/Login";
import { GlucoseProvider } from "./context/Glucose";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <GlucoseProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <DrugsPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </GlucoseProvider>
    </AuthProvider>
  </React.StrictMode>
);
