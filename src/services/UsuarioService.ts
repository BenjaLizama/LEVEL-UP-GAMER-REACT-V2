import { SignupDTO } from "./../models/dto/SignupDTO";
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

  signup: async (informacion: SignupDTO): Promise<Usuario> => {
    const SIGNUP_URL = `${API_URL}`;

    try {
      const response = await axios.post<Usuario>(SIGNUP_URL, informacion);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 409) {
          console.error(
            "Error al crear el usuario: El correo/usuario ya existe."
          );
          throw new Error("El usuario ya existe.");
        } else if (status === 400) {
          console.error("Error al crear el usuario: Datos inválidos.");
          throw new Error("Datos de registro inválidos.");
        }

        console.error(`Error ${status} al crear el usuario: `, error.message);
      } else {
        console.error("Error desconocido al crear el usuario: ", error);
      }

      throw new Error("Fallo la operación de registro.");
    }
  },
};
