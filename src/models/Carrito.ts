import { ItemCarrito } from "./ItemCarrito";

export interface Carrito {
  idCarrito: number;
  idUsuario: number;
  total: number;
  items: ItemCarrito[];
}
