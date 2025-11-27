import { SignupDTO } from "./../models/dto/SignupDTO";
import axios from "axios";
import { Usuario } from "@/models/Usuario";
import { LoginDTO } from "@/models/dto/LoginDTO";

const API_BASE_URL = "http://localhost:8083";
const API_URL = `${API_BASE_URL}/api/usuarios`;

const buildAbsoluteImageUrl = (relativePath: string): string => {
  if (!relativePath) {
    return "";
  }

  const normalizedPath = relativePath.startsWith("/")
    ? relativePath.substring(1)
    : relativePath;

  return `${API_BASE_URL}/${normalizedPath}`;
};

export const usuarioService = {
  login: async (credenciales: LoginDTO): Promise<Usuario> => {
    try {
      const response = await axios.post<Usuario>(
        `${API_URL}/login`,
        credenciales
      );

      const usuario: Usuario = response.data;

      if (usuario.imagenPerfilURL) {
        const absoluteUrl = buildAbsoluteImageUrl(usuario.imagenPerfilURL);

        usuario.imagenPerfilURL = absoluteUrl;
      }

      return usuario;
    } catch (error) {
      console.error("Error al acceder: ", error);
      throw error;
    }
  },

  signup: async (informacion: SignupDTO): Promise<Usuario> => {
    const SIGNUP_URL = `${API_URL}`;

    try {
      const response = await axios.post<Usuario>(SIGNUP_URL, informacion);

      const usuario: Usuario = response.data;
      if (usuario.imagenPerfilURL) {
        usuario.imagenPerfilURL = buildAbsoluteImageUrl(
          usuario.imagenPerfilURL
        );
      }
      return usuario;
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
