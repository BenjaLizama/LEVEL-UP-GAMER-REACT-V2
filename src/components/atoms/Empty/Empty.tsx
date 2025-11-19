import React from "react";
import styles from "../EmptyCart/Empty.module.css";
type PlantillaProps = {
  descripcion: string;
  icono: React.ReactNode;
  children?: React.ReactNode;
};

export default function Empty(props: PlantillaProps) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.contenido}>
        <div className={styles.contPrincipal}>
          {props.icono}
          <p>{props.descripcion}</p>
          {props.children}
        </div>
      </div>
    </div>
  );
}
