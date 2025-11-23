import React from "react";
import styles from "./UserProfileInfo.module.css";
import NO_PROFILE_PICTURE from "@/assets/images/defaultImages/no-profile-picture.webp";

interface UserProfileInfoProps {
  nombre: string;
  apellido: string;
  correo: string;
  imagenURL?: string;
  onClick?: () => void;
}

export default function UserProfileInfo({
  nombre,
  apellido,
  correo,
  imagenURL,
  onClick,
}: UserProfileInfoProps) {
  if (!imagenURL) {
    imagenURL = NO_PROFILE_PICTURE;
  }

  return (
    <div className={styles.container}>
      <img
        className={styles.imagen}
        src={imagenURL}
        alt={`Imagen de ${nombre} ${apellido}`}
        onClick={onClick}
      />
      <div className={styles.nombreContainer}>{`${nombre} ${apellido}`}</div>
      <div className={styles.correoContainer}>{correo}</div>
    </div>
  );
}
