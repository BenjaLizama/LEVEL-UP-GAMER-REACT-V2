import { jwtDecode } from "jwt-decode";

export interface userRol {
  rol: string;
}

export const GetUserRole = (): userRol | null => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    return null;
  }
  try {
    const decoded = jwtDecode<userRol>(token);
    return decoded;
  } catch (error) {
    console.error("error decodificando", error);
    return null;
  }
};
export const isAdmin = (): boolean => {
  const user = GetUserRole();
  console.log("el usuario es ", user);
  return user?.rol === "ADMIN";
};
