import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "@/utils/RoleHelper"; // Tu función que chequea el token

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
