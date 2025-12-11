import axios from "axios";
import { Producto } from "@/models/Producto";

// Esto fue actualizado
const API_URL = "http://localhost:8082/api/productos";

export const productoService = {
  getAllProducts: async (): Promise<Producto[]> => {
    try {
      const response = await axios.get<Producto[]>(`${API_URL}`);

      if (response.status === 204) {
        return [];
      }
      return response.data;
    } catch (error) {
      console.error("Error al obtener productos: ", error);
      throw error;
    }
  },

  filtrarProductosPorCategoria: async (
    categoria: string
  ): Promise<Producto[]> => {
    try {
      const response = await axios.get<Producto[]>(`${API_URL}/filtrar`, {
        params: {
          categoria: categoria,
        },
      });

      if (response.status === 204) {
        return [];
      }

      return response.data;
    } catch (error) {
      console.error("Error al filtrar productos por categoria: ", error);
      throw error;
    }
  },
};
