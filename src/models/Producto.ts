export interface Producto {
  codigoProducto: string;
  nombreProducto: string;
  categoria: string;
  descripcionProducto: string;
  precioProducto: number;
  imagenesUrl: Array<string>;
  cantidadStockProducto: number;
}
