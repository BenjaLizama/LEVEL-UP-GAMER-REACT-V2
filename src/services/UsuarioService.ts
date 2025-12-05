import { SignupDTO } from "@/models/dto/SignupDTO";
import { LoginDTO } from "@/models/dto/LoginDTO";
import { Usuario } from "@/models/Usuario";
import axios, { AxiosResponse } from "axios";
import { authApi, usuariosApi, pagosApi } from "@/services/AxiosConfig";

const SERVER_ROOT = "http://localhost:8083";

interface PaymentSessionResponse {
  url: string;
}

interface ConfirmationResponse {
  message: string;
}

const buildAbsoluteImageUrl = (relativePath: string): string => {
  if (!relativePath) return "";

  const path = relativePath.startsWith("/")
    ? relativePath.substring(1)
    : relativePath;

  return `${SERVER_ROOT}/${path}`;
};

const handleResponse = (response: AxiosResponse<Usuario>): Usuario => {
  const usuario: Usuario = response.data;
  if (usuario.imagenPerfilURL) {
    usuario.imagenPerfilURL = buildAbsoluteImageUrl(usuario.imagenPerfilURL);
  }
  return usuario;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleAxiosError = (error: any, defaultErrorMessage: string): void => {
  if (axios.isAxiosError(error) && error.response) {
    console.error(
      `Error ${error.response.status} en la API:`,
      error.message,
      error.response.data
    );
  } else {
    console.error("Error desconocido:", error);
  }
  throw new Error(defaultErrorMessage);
};

export const usuarioService = {
  login: async (credenciales: LoginDTO): Promise<Usuario> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await authApi.post<any>("/login", credenciales);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      }

      return handleResponse(response as AxiosResponse<Usuario>);
    } catch (error) {
      console.error("Error al acceder: ", error);
      throw error;
    }
  },

  signup: async (informacion: SignupDTO): Promise<Usuario> => {
    try {
      const response = await authApi.post<Usuario>("/signup", informacion);
      return handleResponse(response);
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
      }
      handleAxiosError(error, "Fallo la operación de registro.");
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

      return handleResponse(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error("URL inválida o formato no soportado.");
      }
      handleAxiosError(error, "Fallo la operación de actualización de imagen.");
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

      return handleResponse(response);
    } catch (error) {
      handleAxiosError(error, "Error al subir el archivo.");
      throw new Error("Error al subir el archivo.");
    }
  },

  obtenerUsuarioPorId: async (idUsuario: number): Promise<Usuario> => {
    try {
      const response = await usuariosApi.get<Usuario>(`/${idUsuario}`);
      return handleResponse(response);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Usuario no encontrado.");
      }
      handleAxiosError(error, "Fallo la operación de obtención de usuario.");
      throw new Error("Fallo la operación de obtención de usuario.");
    }
  },

  pagar: async (): Promise<PaymentSessionResponse> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response = await pagosApi.post<any>(`/pagar`);

      if (!response.data || !response.data.url) {
        throw new Error("La API no devolvio una URL de pago valida");
      }

      return response.data as PaymentSessionResponse;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        throw new Error("Error al proceder con el pago");
      }
      handleAxiosError(error, "Fallo la operación de pago.");
      throw new Error("Fallo la operación de pago.");
    }
  },

  confirmarPago: async (sessionId: string): Promise<string> => {
    try {
      const response = await pagosApi.get<ConfirmationResponse>(
        "/confirmar-pago",
        {
          params: {
            session_id: sessionId,
          },
        }
      );

      return (
        response.data.message || "Compra verificada y finalizada con exito."
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data?.body || "Error al verificar el pago";
        throw new Error(errorMessage);
      }

      handleAxiosError(error, "Fallo la operacion de confirmacion de pago.");
      throw new Error("Fallo la operacion de confirmacion de pago.");
    }
  },
};
