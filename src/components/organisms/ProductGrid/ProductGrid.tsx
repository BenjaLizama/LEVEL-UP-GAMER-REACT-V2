import React from "react";
import styles from "./ProductGrid.module.css";
import { Producto } from "@/models/Producto";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { carritoService } from "@/services/CarritoService";
import Empty from "@/components/atoms/Empty/Empty";
import { NO_PRODUCTS } from "@/utils/Icons";
import { TemporaryAlert } from "@/components/molecules/AlertBox/AlertBox";
import { useAlertQueue } from "@/hooks/useAlertQueue";

interface ProductoGridProps {
  productos: Producto[];
  onAddCart?: (producto: Producto) => void;
}

export default function ProductGrid({ productos }: ProductoGridProps) {
  const { currentAlert, handleShowAlert, handleCloseAlert } = useAlertQueue();

  if (!productos || productos.length === 0) {
    return (
      <div className={styles.noProductContainer}>
        <Empty descripcion="No se encontraron productos." icono={NO_PRODUCTS} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.gridContainer}>
        {productos.map((producto) => (
          <ProductCard
            key={producto.codigoProducto}
            {...producto}
            onAddCart={() => {
              if (localStorage.getItem("idUsuario") != null) {
                carritoService.addItemToCart(producto.codigoProducto, 1);
                handleShowAlert(
                  `Se agregó ${producto.nombreProducto} al carrito`,
                  "success"
                );
              } else {
                handleShowAlert(
                  "Debes iniciar sesión para realizar esta acción",
                  "error"
                );
              }
            }}
          />
        ))}
      </div>
      {currentAlert && (
        <TemporaryAlert
          key={currentAlert.id}
          message={currentAlert.message}
          type={currentAlert.type as "success" | "error" | "warning"}
          durationMs={1000}
          onClose={handleCloseAlert}
        />
      )}
    </>
  );
}
