import React, { useState } from "react";
import styles from "./Profile.module.css";
import LoginProfileInfo from "@/components/molecules/LoginProfileInfo/LoginProfileInfo";
import OptionSelector from "@/components/molecules/OptionSelector/OptionSelector";
import OptionSelectorContainer from "@/components/organisms/OptionSelectorContainer/OptionSelectorContainer";
import { ConfiguracionGeneral } from "@/constants/configOptions";
import UserProfileInfo from "@/components/molecules/UserProfileInfo/UserProfileInfo";
import Modal from "@/components/organisms/Modal/Modal";
import ChangeProfileImage from "@/components/molecules/ChangeProfileImage/ChangeProfileImage";
import { TemporaryAlert } from "@/components/molecules/AlertBox/AlertBox";

export default function Profile() {
  const idUsuario = localStorage.getItem("idUsuario");

  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "warning";
  } | null>(null);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleCloseAlert = () => {
    setAlert(null);
  };

  const handleShowAlert = (
    message: string,
    type: "success" | "error" | "warning"
  ) => {
    setAlert({ message, type });
  };

  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
    handleCloseAlert();
  };

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleImageChangeSuccess = () => {
    handleCloseProfileModal();
    handleShowAlert("Imagen de perfil actualizada con éxito.", "success");
  };

  const handleImageChangeError = (message: string) => {
    handleCloseProfileModal();
    handleShowAlert(message, "error");
  };

  return (
    <div className={styles.main}>
      {alert && (
        <TemporaryAlert
          message={alert.message}
          type={alert.type}
          durationMs={5000}
          onClose={handleCloseAlert}
        />
      )}

      {!idUsuario && <LoginProfileInfo />}
      {idUsuario && (
        <>
          <UserProfileInfo
            nombre={localStorage.getItem("nombre") || ""}
            apellido={localStorage.getItem("apellido") || ""}
            correo={localStorage.getItem("correo") || ""}
            imagenURL={localStorage.getItem("imagenPerfil") || ""}
            onClick={handleOpenProfileModal}
          />
          <div className={styles.container}>
            {ConfiguracionGeneral.map((organismo) => (
              <React.Fragment key={organismo.organismoId}>
                <OptionSelectorContainer descripcion={organismo.titulo}>
                  {organismo.opciones.map((opcion) => (
                    <OptionSelector
                      key={opcion.id}
                      icono={opcion.icono}
                      descripcion={opcion.descripcion}
                      onClick={opcion.onClick}
                    />
                  ))}
                </OptionSelectorContainer>
              </React.Fragment>
            ))}
          </div>
        </>
      )}

      {isProfileModalOpen && (
        <Modal
          onClose={handleCloseProfileModal}
          title="Cambiar imagen de perfil"
        >
          <ChangeProfileImage
            onSuccess={handleImageChangeSuccess}
            onError={handleImageChangeError}
          />
        </Modal>
      )}
    </div>
  );
}
