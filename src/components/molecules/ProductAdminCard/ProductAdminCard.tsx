import React from "react";
import styles from "./ProductAdminCard.module.css";
import NO_IMAGE from "@/assets/images/defaultImages/no-product-image.png";
import { formatearACLP } from "@/utils/Funciones";
import { Producto } from "@/models/Producto";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { EDIT } from "@/utils/Icons";

interface ProductAdminCardProps extends Producto {
  onEditClick?: () => void;
  onCheckboxClick?: () => void;
  onProductClick?: () => void;
}

export default function ProductAdminCard(props: ProductAdminCardProps) {
  const {
    codigoProducto,
    nombreProducto,
    precioProducto,
    imagenesUrl,
    cantidadStockProducto,
    onEditClick,
    onCheckboxClick,
    onProductClick,
  } = props;

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (onEditClick) {
      onEditClick();
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (onCheckboxClick) {
      onCheckboxClick();
    }
  };

  return (
    <div
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={onProductClick}
    >
      <div className={styles.first}>
        <img
          className={styles.imagen}
          src={
            imagenesUrl && imagenesUrl.length > 0 ? imagenesUrl[0] : NO_IMAGE
          }
          alt={nombreProducto}
        />
      </div>
      <div className={styles.second}>
        <div className={styles.info}>
          <span className={styles.nombre}>{nombreProducto}</span>
          <span className={styles.precio}>{formatearACLP(precioProducto)}</span>
          <span className={styles.stock}>
            Stock disponible: {cantidadStockProducto}
          </span>
        </div>
      </div>
      <div className={styles.third}>
        <button className={styles.trashButton} onClick={handleEditClick}>
          <SimpleIcon icon={EDIT} fontSize={25} />
        </button>
        <input
          type="checkbox"
          name="checkbox-prod"
          id={codigoProducto}
          className={styles.checkboxProductButton}
          onClick={handleCheckboxClick}
        />
      </div>
    </div>
  );
}
