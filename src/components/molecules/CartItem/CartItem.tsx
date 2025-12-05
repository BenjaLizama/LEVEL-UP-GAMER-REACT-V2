import React from "react";
import styles from "./CartItem.module.css";

interface PlantillaProps {
  precio: string;
  nombre: string;
  cantidad: number;
  categoria: string;
  idItem: string;
  children?: React.ReactNode;
  imagen: string;
}

export default function CartItem(props: PlantillaProps) {
  return (
    <div className={styles.contenido}>
      <div className={styles.itemContainer}>
        <div className={styles.contenedorImg}>
          <img
            className={styles.imagen}
            src={props.imagen}
            alt={props.nombre}
            draggable={false}
          />
        </div>
        <div className={styles.info}>
          <p className={styles.nombreProd}>{props.nombre}</p>
          <div className={styles.informacionProductoContainer}>
            <div className={styles.datos}>
              <p className={styles.categoria}>Categoria: {props.categoria}</p>
              <p className={styles.precioContainer}>
                Precio: <span className={styles.precio}>{props.precio}</span>
              </p>
            </div>
            <div className={styles.child}>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
