import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "@/utils/RoleHelper";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
