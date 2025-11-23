import { cerrarSesion } from "@/utils/Funciones";
import {
  BILL,
  CARD,
  GAMEPAD,
  GIFT,
  HEART,
  KEY,
  LANGUAGE,
  LOGOUT,
  POINT,
  SUPPORT,
  WALLET,
} from "@/utils/Icons";

export const ConfiguracionGeneral = [
  {
    titulo: "Mi cuenta",
    organismoId: "mi-cuenta",
    opciones: [
      {
        id: "favoritos",
        icono: HEART,
        descripcion: "Favoritos",
        onClick: () => console.log("Navegar a Favoritos"),
      },
      {
        id: "mi-biblioteca",
        icono: GAMEPAD,
        descripcion: "Mi biblioteca",
        onClick: () => console.log("Navegar a Mi Biblioteca"),
      },
      {
        id: "pedidos",
        icono: BILL,
        descripcion: "Pedidos",
        onClick: () => console.log("Navegar a Pedidos"),
      },
    ],
  },

  {
    titulo: "Fondos y Recompensas",
    organismoId: "fondos-recompensas",
    opciones: [
      {
        id: "canjear-tarjeta",
        icono: GIFT,
        descripcion: "Canjear tarjeta",
        onClick: () => console.log("Abrir Canjear Tarjeta"),
      },
      {
        id: "añadir-fondos",
        icono: WALLET,
        descripcion: "Añadir fondos",
        onClick: () => console.log("Abrir Añadir Fondos"),
      },
      {
        id: "puntos-levelup",
        icono: POINT,
        descripcion: "Puntos LEVEL-UP",
        onClick: () => console.log("Ver Puntos LEVEL-UP"),
      },
    ],
  },

  {
    titulo: "Mi Perfil",
    organismoId: "mi-perfil",
    opciones: [
      {
        id: "mi-informacion",
        icono: CARD,
        descripcion: "Mi información",
        onClick: () => console.log("Navegar a Mi Información"),
      },
      {
        id: "cambiar-contraseña",
        icono: KEY,
        descripcion: "Cambiar la contraseña",
        onClick: () => console.log("Navegar a Cambiar Contraseña"),
      },
    ],
  },

  {
    titulo: "Soporte",
    organismoId: "soporte",
    opciones: [
      {
        id: "contacto-soporte",
        icono: SUPPORT,
        descripcion: "Soporte",
        onClick: () => console.log("Navegar a Soporte/Ayuda"),
      },
    ],
  },

  {
    titulo: "Ajustes",
    organismoId: "ajustes",
    opciones: [
      {
        id: "idioma",
        icono: LANGUAGE,
        descripcion: "Idioma",
        onClick: () => console.log("Navegar a selección de Idioma"),
      },
      {
        id: "cerrar-sesion",
        icono: LOGOUT,
        descripcion: "Cerrar sesión",
        onClick: () => cerrarSesion(),
      },
    ],
  },
];
