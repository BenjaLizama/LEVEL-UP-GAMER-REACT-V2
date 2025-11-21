import axios from "axios";
import { Usuario } from "@/models/Usuario";
import { LoginDTO } from "@/models/dto/LoginDTO";

const API_URL = "http://localhost:8083/api/usuarios";

export const usuarioService = {
  login: async (credenciales: LoginDTO): Promise<Usuario> => {
    try {
      const response = await axios.post<Usuario>(
        `${API_URL}/login`,
        credenciales
      );

      return response.data;
    } catch (error) {
      console.error("Error al acceder: ", error);
      throw error;
    }
  },
};
