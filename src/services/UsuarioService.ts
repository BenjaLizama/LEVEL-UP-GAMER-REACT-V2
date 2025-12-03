import { SignupDTO } from "@/models/dto/SignupDTO";
import { LoginDTO } from "@/models/dto/LoginDTO";
import { Usuario } from "@/models/Usuario";
import axios from "axios";
import { authApi, usuariosApi } from "@/services/AxiosConfig";

const SERVER_ROOT = "http://localhost:8083";

const buildAbsoluteImageUrl = (relativePath: string): string => {
  if (!relativePath) return "";

  const path = relativePath.startsWith("/")
    ? relativePath.substring(1)
    : relativePath;

  return `${SERVER_ROOT}/${path}`;
};

export const usuarioService = {
  login: async (credenciales: LoginDTO): Promise<Usuario> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await authApi.post<any>("/login", credenciales);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      const usuario: Usuario = response.data;
      if (usuario.imagenPerfilURL) {
        usuario.imagenPerfilURL = buildAbsoluteImageUrl(
          usuario.imagenPerfilURL
        );
      }

      return usuario;
    } catch (error) {
      console.error("Error al acceder: ", error);
      throw error;
    }
  },

  signup: async (informacion: SignupDTO): Promise<Usuario> => {
    try {
      const response = await authApi.post<Usuario>("", informacion);

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
          console.error("Error: El correo/usuario ya existe.");
          throw new Error("El usuario ya existe.");
        } else if (status === 400) {
          console.error("Error: Datos inválidos.");
          throw new Error("Datos de registro inválidos.");
        }
        console.error(`Error ${status} al crear el usuario: `, error.message);
      } else {
        console.error("Error desconocido al crear el usuario: ", error);
      }
      throw new Error("Fallo la operación de registro.");
    }
  },

  actualizarImagenPerfil: async (
    idUsuario: number,
    urlImagen: string
  ): Promise<Usuario> => {
    if (!urlImagen || urlImagen.trim() === "") {
      throw new Error("Debe proporcionar una URL de imagen válida.");
    }

    try {
      const response = await usuariosApi.put<Usuario>(
        `/${idUsuario}/imagen-url`,
        null,
        {
          params: { urlImagen: urlImagen },
        }
      );

      const usuario = response.data;
      if (usuario.imagenPerfilURL) {
        usuario.imagenPerfilURL = buildAbsoluteImageUrl(
          usuario.imagenPerfilURL
        );
      }

      return usuario;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error("URL inválida o formato no soportado.");
      }
      console.error("Error al actualizar imagen:", error);
      throw new Error("Fallo la operación de actualización de imagen.");
    }
  },

  actualizarImagenPerfilArchivo: async (
    idUsuario: number,
    imagen: File
  ): Promise<Usuario> => {
    if (!imagen) {
      throw new Error("Debe proporcionar un archivo de imagen.");
    }

    const formData = new FormData();
    formData.append("imagen", imagen);

    try {
      const response = await usuariosApi.put<Usuario>(
        `/${idUsuario}/imagen-archivo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const usuario = response.data;
      if (usuario.imagenPerfilURL) {
        usuario.imagenPerfilURL = buildAbsoluteImageUrl(
          usuario.imagenPerfilURL
        );
      }

      return usuario;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error Backend:", error.response?.data);
      }
      throw new Error("Error al subir el archivo.");
    }
  },

  obtenerUsuarioPorId: async (idUsuario: number): Promise<Usuario> => {
    try {
      const response = await usuariosApi.get<Usuario>(`/${idUsuario}`);

      const usuario: Usuario = response.data;
      if (usuario.imagenPerfilURL) {
        usuario.imagenPerfilURL = buildAbsoluteImageUrl(
          usuario.imagenPerfilURL
        );
      }

      return usuario;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Usuario no encontrado.");
      }
      console.error("Error obteniendo usuario:", error);
      throw new Error("Fallo la operación de obtención de usuario.");
    }
  },
};
