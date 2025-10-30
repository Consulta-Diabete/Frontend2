import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { sessionUser, requestStatus } = useAuth();
  if (requestStatus.status === "pending") {
    return null;
  }

  return sessionUser ? <Outlet /> : <Navigate to="/login" replace />;
}
