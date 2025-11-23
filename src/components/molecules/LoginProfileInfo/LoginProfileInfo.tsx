import React from "react";
import styles from "./LoginProfileInfo.module.css";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import Button from "@/components/atoms/Button/Button";
import { USER } from "@/utils/Icons";
import { useNavigate } from "react-router-dom";

export default function LoginProfileInfo() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <SimpleIcon icon={USER} fontSize={150} />
      <span className={styles.bienvenido}>¡Bienvenido!</span>
      <span className={styles.info}>
        ¡Los usuarios que han iniciado sesión pueden hacer más!
      </span>
      <Button onClick={() => navigate("/login")}>Iniciar sesión</Button>
    </div>
  );
}
