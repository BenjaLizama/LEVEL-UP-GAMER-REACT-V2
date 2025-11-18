import React from "react";

import styles from "../GuiaCard/GiaCard.module.css";

interface PlantillaProps {
  titulo: string;
  imagen: string;
  descripcion: string;
}

export default function GuiaCard(props: PlantillaProps) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.contenido}>
        <img className={styles.imagen} src={props.imagen} alt="" />
        <p className={styles.descripcion}>{props.descripcion}</p>
      </div>
      <h1 className={styles.title}>{props.titulo}</h1>
    </div>
  );
}
