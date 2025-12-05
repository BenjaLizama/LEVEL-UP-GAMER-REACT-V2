import React from "react";
import styles from "./ProductCard.module.css";
import { Producto } from "@/models/Producto";
import no_image from "@/assets/images/defaultImages/no-product-image.png";
import { formatearACLP } from "@/utils/Funciones";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button/Button";

interface ProductCardProps extends Producto {
  onAddCart?: (producto: Producto) => void;
}

export default function ProductCard(props: ProductCardProps) {
  const navigate = useNavigate();

  const {
    codigoProducto,
    nombreProducto,
    precioProducto,
    imagenesUrl,
    cantidadStockProducto,
    onAddCart,
  } = props;

  const handleCardClick = () => {
    navigate(`/producto/${codigoProducto}`);
  };

  const handleAddCardBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (onAddCart) {
      onAddCart(props);
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles.first}>
        <img
          className={styles.imagen}
          src={
            imagenesUrl && imagenesUrl.length > 0 ? imagenesUrl[0] : no_image
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
        {/* <button className={styles.addButtonCart} onClick={handleAddCardBtn}>
          <SimpleIcon icon={ADD_CART} fontSize={40} />
          <span className={styles.addButtonCartSpan}>+1</span>
        </button> */}
        <div className={styles.addButtonCart}>
          <Button onClick={handleAddCardBtn}>Añadir al carrito</Button>
        </div>
        {/* Botón diseño escritorio */}
        <div className={styles.btnAddCartDesktop}>
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              handleAddCardBtn(e)
            }
          >
            Añadir al carrito
          </Button>
        </div>
      </div>
    </div>
  );
}
