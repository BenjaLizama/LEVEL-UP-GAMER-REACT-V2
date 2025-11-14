export interface Producto {
  codigoProducto: string;
  nombreProducto: string;
  categoriaProducto: string;
  descripcionProducto: string;
  precioProducto: number;
  imagenesUrl: Array<string>;
  cantidadStockProducto: number;
}
