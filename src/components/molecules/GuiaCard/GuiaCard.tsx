import React from "react";

import styles from "./GuiaCard.module.css";

interface PlantillaProps {
  titulo: string;
  imagen: string;
  descripcion: string;
}

export default function GuiaCard(props: PlantillaProps) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <img
          className={styles.img}
          src={props.imagen}
          alt="Imagen de la guia"
        />
        <p className={styles.desc}>{props.descripcion}</p>
      </div>
      <h1 className={styles.title}>{props.titulo}</h1>
    </div>
  );
}
