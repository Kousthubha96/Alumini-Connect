import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};