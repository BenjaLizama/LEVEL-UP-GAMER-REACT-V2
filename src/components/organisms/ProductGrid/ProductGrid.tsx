import React from "react";
import styles from "./ProductGrid.module.css";
import { Producto } from "@/models/Producto";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";

interface ProductoGridProps {
  productos: Producto[];
  onAddCart?: (producto: Producto) => void;
}

export default function ProductGrid({
  productos,
  onAddCart,
}: ProductoGridProps) {
  if (!productos || productos.length === 0) {
    return (
      <div className={styles.gridContainer}>
        <p className={styles.emptyMessage}>No se encontraron productos.</p>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      {productos.map((producto) => (
        <ProductCard
          key={producto.codigoProducto}
          {...producto}
          onAddCart={onAddCart}
        />
      ))}
    </div>
  );
}
