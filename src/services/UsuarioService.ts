import { SignupDTO } from "./../models/dto/SignupDTO";
import axios from "axios";
import { Usuario } from "@/models/Usuario";
import { LoginDTO } from "@/models/dto/LoginDTO";

const API_BASE_URL = "http://54.85.135.89:8084";
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

  actualizarImagenPerfil: async (
    idUsuario: number,
    urlImagen: string
  ): Promise<Usuario> => {
    const ACTUALIZAR_IMAGEN_PERFIL_URL = `${API_URL}/${idUsuario}/imagen`;

    if (!urlImagen || urlImagen.trim() === "") {
      throw new Error(
        "Debe proporcionar una URL de imagen válida para actualizar."
      );
    }

    try {
      const response = await axios.put<Usuario>(
        ACTUALIZAR_IMAGEN_PERFIL_URL,
        null,
        {
          params: {
            urlImagen: urlImagen,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 400) {
          console.error(
            "Error 400 al actualizar la imagen de perfil: Datos inválidos o falta el parámetro.",
            error.response.data
          );
          throw new Error(
            "Datos de actualización inválidos. Verifique la URL."
          );
        }

        console.error(
          `Error ${status} al actualizar la imagen de perfil: `,
          error.message
        );
      } else {
        console.error(
          "Error desconocido al actualizar la imagen de perfil: ",
          error
        );
      }

      throw new Error("Fallo la operación de actualización de imagen.");
    }
  },

  actualizarImagenPerfilArchivo: async (
    idUsuario: number,
    imagen: File
  ): Promise<Usuario> => {
    const ACTUALIZAR_IMAGEN_PERFIL_URL = `${API_URL}/${idUsuario}/imagen`;

    if (!imagen) {
      throw new Error(
        "Debe proporcionar un archivo de imagen para actualizar."
      );
    }

    const formData = new FormData();
    formData.append("imagen", imagen);

    try {
      const response = await axios.put<Usuario>(
        ACTUALIZAR_IMAGEN_PERFIL_URL,
        formData,
        {}
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;

        if (status === 400) {
          console.error(
            "Error 400 al subir el archivo: Datos inválidos o formato incorrecto.",
            error.response.data
          );
          throw new Error(
            "Archivo de imagen no válido. Verifique el formato y tamaño."
          );
        }

        console.error(
          `Error ${status} al subir el archivo: `,
          error.message,
          error.response.data
        );
      } else {
        console.error("Error desconocido al subir el archivo: ", error);
      }

      throw new Error("Debes seleccionar un archivo valido!");
    }
  },

  obtenerUsuarioPorId: async (idUsuario: number): Promise<Usuario> => {
    const GET_USER_URL = `${API_URL}/${idUsuario}`;

    try {
      const response = await axios.get<Usuario>(GET_USER_URL);

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

        if (status === 404) {
          console.error(`Usuario no encontrado con ID: ${idUsuario}`);
          throw new Error("Usuario no encontrado.");
        }

        console.error(`Error ${status} al obtener el usuario: `, error.message);
        throw new Error(`Fallo al obtener el usuario: Error ${status}.`);
      } else {
        console.error("Error desconocido al obtener el usuario: ", error);
        throw new Error("Fallo la operación de obtención de usuario.");
      }
    }
  },
};
