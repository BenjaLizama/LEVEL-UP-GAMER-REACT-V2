import React from "react";
import styles from "./OrderSummary.module.css";

interface plantillaOrder {
  total: number;
  onPagar?: () => void;
}

export default function OrderSummary({ total, onPagar }: plantillaOrder) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.contenido}>
        <p>Total:${total}</p>
        <button className={styles.button} onClick={onPagar}>
          Continuar compra
        </button>
      </div>
    </div>
  );
}
