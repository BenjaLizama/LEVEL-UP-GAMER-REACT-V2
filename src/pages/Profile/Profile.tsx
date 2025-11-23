import React from "react";
import styles from "./Profile.module.css";
import LoginProfileInfo from "@/components/molecules/LoginProfileInfo/LoginProfileInfo";
import OptionSelector from "@/components/molecules/OptionSelector/OptionSelector";
import OptionSelectorContainer from "@/components/organisms/OptionSelectorContainer/OptionSelectorContainer";
import { ConfiguracionGeneral } from "@/constants/configOptions";

export default function Profile() {
  const idUsuario = localStorage.getItem("idUsuario");

  return (
    <div className={styles.main}>
      {!idUsuario && <LoginProfileInfo />}
      {idUsuario && (
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
      )}
    </div>
  );
}
