import axios from "axios";
import { Producto } from "@/models/Producto";

const API_URL = "http://localhost:8082/api/productos";

export const productoService = {
  getAllProducts: async (): Promise<Producto[]> => {
    try {
      const response = await axios.get<Producto[]>(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos: ", error);
      throw error;
    }
  },
};
