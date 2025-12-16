import React from "react";
import styles from "./ProductAdminGrid.module.css";
import { Producto } from "@/models/Producto";
// Importamos TU tarjeta de administrador
import ProductAdminCard from "@/components/molecules/ProductAdminCard/ProductAdminCard"; // Ajusta la ruta
import Empty from "@/components/atoms/Empty/Empty"; // Reutilizamos tu componente Empty
import { NO_PRODUCTS } from "@/utils/Icons";

interface ProductAdminGridProps {
  productos: Producto[];
  onEdit: (producto: Producto) => void; // Función que recibe el producto a editar
  onSelect?: (id: string) => void; // Para el checkbox
  onDelete?: (id: string) => void; // Opcional, si agregas botón de borrar
}

export default function ProductAdminGrid({
  productos,
  onEdit,
  onSelect,
}: ProductAdminGridProps) {
  // 1. Manejo de lista vacía (Igual que en tu tienda pública)
  if (!productos || productos.length === 0) {
    return (
      <div className={styles.noProductContainer}>
        <Empty
          descripcion="No hay productos en el inventario."
          icono={NO_PRODUCTS}
        />
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      {productos.map((producto) => (
        <ProductAdminCard
          key={producto.codigoProducto}
          // Pasamos todas las props del producto (nombre, precio, imagen...)
          {...producto}
          // CONECTAMOS LOS EVENTOS

          // Al hacer clic en Editar, le avisamos al padre QUÉ producto es
          onEditClick={() => onEdit(producto)}
          // Al hacer clic en el Checkbox, pasamos el ID
          onCheckboxClick={() => onSelect && onSelect(producto.codigoProducto)}
          // Al hacer clic en la tarjeta general (opcional, quizas para ver detalles)
          onProductClick={() =>
            console.log("Detalle:", producto.nombreProducto)
          }
        />
      ))}
    </div>
  );
}
