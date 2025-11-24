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
  // 1. Usar un estado local para la URL de la imagen actual.
  // Esto nos permite cambiar la fuente si la carga falla.
  const [currentImageUrl, setCurrentImageUrl] = useState(
    imagenURL || NO_PROFILE_PICTURE
  );

  // 2. Usar un efecto para resetear la imagen si la prop imagenURL cambia
  // (útil si el usuario sube una nueva imagen sin recargar la página).
  React.useEffect(() => {
    setCurrentImageUrl(imagenURL || NO_PROFILE_PICTURE);
  }, [imagenURL]);

  /**
   * Maneja el evento cuando el navegador no puede cargar la imagen.
   * Establece la fuente de la imagen al avatar por defecto.
   */
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    // 3. Verifica si la fuente actual NO es ya la imagen por defecto.
    // Esto previene un loop infinito si la imagen por defecto también falla (aunque es raro).
    if (e.currentTarget.src !== NO_PROFILE_PICTURE) {
      e.currentTarget.src = NO_PROFILE_PICTURE;
      // Actualizamos el estado para que React sepa que la URL ha cambiado
      setCurrentImageUrl(NO_PROFILE_PICTURE);
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.imagen}
        // Usamos el estado local en lugar de la prop directamente
        src={currentImageUrl}
        alt={`Imagen de ${nombre} ${apellido}`}
        onClick={onClick}
        // 4. Implementación clave: Si la carga falla, llama a la función de manejo de error.
        onError={handleImageError}
      />
      <div className={styles.nombreContainer}>{`${nombre} ${apellido}`}</div>
      <div className={styles.correoContainer}>{correo}</div>
    </div>
  );
}
