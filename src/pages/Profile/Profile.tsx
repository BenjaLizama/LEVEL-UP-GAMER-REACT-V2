import React from "react";
import styles from "./Profile.module.css";
import LoginProfileInfo from "@/components/molecules/LoginProfileInfo/LoginProfileInfo";
import OptionSelector from "@/components/molecules/OptionSelector/OptionSelector";
import OptionSelectorContainer from "@/components/organisms/OptionSelectorContainer/OptionSelectorContainer";
import { ConfiguracionGeneral } from "@/constants/configOptions";
import UserProfileInfo from "@/components/molecules/UserProfileInfo/UserProfileInfo";

export default function Profile() {
  const idUsuario = localStorage.getItem("idUsuario");

  return (
    <div className={styles.main}>
      {!idUsuario && <LoginProfileInfo />}
      {idUsuario && (
        <div className={styles.container}>
          <UserProfileInfo
            nombre={localStorage.getItem("nombre") || ""}
            apellido={localStorage.getItem("apellido") || ""}
            correo={localStorage.getItem("correo") || ""}
            imagenURL={localStorage.getItem("imagenPerfil") || ""}
          />
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
      )}
    </div>
  );
}
