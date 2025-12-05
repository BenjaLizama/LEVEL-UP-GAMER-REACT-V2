import axios, { AxiosInstance } from "axios";

// Aqui se actualiza la ip del servidor
const DIRECCION_IP = "54.85.135.89";

export const URLS = {
  AUTH: `http://${DIRECCION_IP}:8083/api/auth`,
  PAGOS_STRIPE: `http://${DIRECCION_IP}:8083/api/stripe`,
  USUARIOS: `http://${DIRECCION_IP}:8083/api/usuarios`,
  PRODUCTOS: `http://${DIRECCION_IP}:8082/api/productos`,
  CARRITOS: `http://${DIRECCION_IP}:8081/api/carritos`,
};

const crearInstanciaApi = (baseURL: string): AxiosInstance => {
  const instancia = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  instancia.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instancia.interceptors.response.use(
    (respuesta) => respuesta,
    (error) => {
      if (error.response?.status === 401) {
        console.warn("Sesion expirada");
      }
      return Promise.reject(error);
    }
  );

  return instancia;
};

export const authApi = crearInstanciaApi(URLS.AUTH);
export const pagosApi = crearInstanciaApi(URLS.PAGOS_STRIPE);
export const usuariosApi = crearInstanciaApi(URLS.USUARIOS);
export const productosApi = crearInstanciaApi(URLS.PRODUCTOS);
export const carritosApi = crearInstanciaApi(URLS.CARRITOS);
