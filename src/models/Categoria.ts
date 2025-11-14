// 1. Modifica la interfaz (modelo)
export interface Categoria {
  id: number; // Lo usamos para el 'key' de React
  value: string; // El valor EXACTO del Enum (para la API)
  nombreVisible: string; // El texto que verá el usuario
}

// 2. Actualiza tu lista de constantes
export const CATEGORIAS_POR_DEFECTO: Categoria[] = [
  { id: 1, value: "JUEGO_MESA", nombreVisible: "Juegos de Mesa" },
  { id: 2, value: "ACCESORIOS", nombreVisible: "Accesorios" },
  { id: 3, value: "CONSOLAS", nombreVisible: "Consolas" },
  { id: 4, value: "COMPUTADORES_GAMERS", nombreVisible: "Computadores Gamers" },
  { id: 5, value: "SILLAS_GAMERS", nombreVisible: "Sillas Gamers" },
  { id: 6, value: "MOUSE", nombreVisible: "Mouse" },
  { id: 7, value: "MOUSE_PAD", nombreVisible: "Mouse Pad" },
  {
    id: 8,
    value: "POLERAS_PERSONALIZADAS",
    nombreVisible: "Poleras Personalizadas",
  },
  {
    id: 9,
    value: "POLERONES_GAMERS_PERSONALIZADOS",
    nombreVisible: "Polerones Gamers",
  },
];
