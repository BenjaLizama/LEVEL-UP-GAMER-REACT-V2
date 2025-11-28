import React from "react";
import styles from "./CartItem.module.css";

interface PlantillaProps {
  precio: number;
  nombre: string;
  cantidad: number;
  idItem: string;
  children?: React.ReactNode;
  imagen: string;
}

export default function CartItem(props: PlantillaProps) {
  return (
    <div className={styles.contenido}>
      <div className={styles.item}>
        <div className={styles.contenedorImg}>
          <img
            className={styles.imagen}
            src={props.imagen}
            alt={props.nombre}
          />
        </div>
        <div className={styles.info}>
          <h5 className={styles.nombreProd}>{props.nombre}</h5>
          <p>precio: ${props.precio}</p>
          <p>cantidad: {props.cantidad}</p>
        </div>
      </div>
      <div className={styles.child}>{props.children}</div>
    </div>
  );
}
