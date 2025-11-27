import { ItemCarrito } from "@/models/ItemCarrito";
import { Producto } from "@/models/Producto";

interface CartItemDisplay extends ItemCarrito {
  nombre: string;
  img: string;
  precio?: number;
}

export const enriqucerCarrito = (
  itemsDelCarrito: ItemCarrito[],
  catalogoProductos: Producto[]
): CartItemDisplay[] => {
  return itemsDelCarrito.map((item) => {
    const productoEncontrado = catalogoProductos.find(
      (p) => p.codigoProducto === item.codigoProducto
    );
    return {
      ...item,
      nombre:
        productoEncontrado?.nombreProducto || "no se encontro el producto",
      img: productoEncontrado?.imagenesUrl[0] || "imagen por defecto",
      precioUnitario: item.precioUnitario,
    };
  });
};
