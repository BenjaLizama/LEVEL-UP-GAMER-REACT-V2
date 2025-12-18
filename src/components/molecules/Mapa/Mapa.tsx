import React from "react";
import styles from "./Mapa.module.css";

interface MapaProps {
  urlMapa: string;
}

export default function Mapa({ urlMapa }: MapaProps) {
  return (
    <div>
      <iframe
        className={styles.mapa}
        src={urlMapa}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
