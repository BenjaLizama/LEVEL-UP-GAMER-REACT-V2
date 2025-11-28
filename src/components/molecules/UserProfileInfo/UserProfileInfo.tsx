import React, { useState } from "react";
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
  const [currentImageUrl, setCurrentImageUrl] = useState(
    imagenURL || NO_PROFILE_PICTURE
  );

  React.useEffect(() => {
    setCurrentImageUrl(imagenURL || NO_PROFILE_PICTURE);
  }, [imagenURL]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    if (e.currentTarget.src !== NO_PROFILE_PICTURE) {
      e.currentTarget.src = NO_PROFILE_PICTURE;
      setCurrentImageUrl(NO_PROFILE_PICTURE);
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.imagen}
        src={currentImageUrl}
        alt={`Imagen de ${nombre} ${apellido}`}
        onClick={onClick}
        onError={handleImageError}
      />
      <div className={styles.nombreContainer}>{`${nombre} ${apellido}`}</div>
      <div className={styles.correoContainer}>{correo}</div>
    </div>
  );
}
