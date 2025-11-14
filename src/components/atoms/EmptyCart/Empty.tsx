import React from "react";
import { CART_ARROW_DOWN } from "../../../utils/Icons";
import SimpleIcon from "../SimpleIcon/SimpleIcon";
import styles from "../EmptyCart/Empty.module.css";
import Button from "../Button/Button";
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
