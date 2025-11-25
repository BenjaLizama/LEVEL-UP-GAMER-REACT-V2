import React from "react";
import styles from "./Empty.module.css";
import SimpleIcon from "../SimpleIcon/SimpleIcon";

type PlantillaProps = {
  descripcion: string;
  icono: string;
  children?: React.ReactNode;
};

export default function Empty({
  descripcion,
  icono,
  children,
}: PlantillaProps) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.contenido}>
        <div className={styles.contPrincipal}>
          <SimpleIcon icon={icono} fontSize={110} />
          <p className={styles.emptyDescipcion}>{descripcion}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
