import React from "react";
import styles from "./ProductGrid.module.css";
import { Producto } from "@/models/Producto";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { carritoService } from "@/services/CarritoService";
import Empty from "@/components/atoms/Empty/Empty";
import { NO_PRODUCTS } from "@/utils/Icons";

interface ProductoGridProps {
  productos: Producto[];
  onAddCart?: (producto: Producto) => void;
}

export default function ProductGrid({ productos }: ProductoGridProps) {
  if (!productos || productos.length === 0) {
    return (
      <div className={styles.noProductContainer}>
        <Empty descripcion="No se encontraron productos." icono={NO_PRODUCTS} />
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      {productos.map((producto) => (
        <ProductCard
          key={producto.codigoProducto}
          {...producto}
          onAddCart={() =>
            carritoService.addItemToCart(producto.codigoProducto, 1)
          }
        />
      ))}
    </div>
  );
}
