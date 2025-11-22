import React from "react";
import styles from "./LogoButton.module.css";
import { Link } from "react-router-dom";
import LOGO from "@/assets/images/Level-Up.png";

export default function LogoButton() {
  return (
    <>
      <Link to={"/"} className={styles.container}>
        <img
          src={LOGO}
          alt="Logo LEVEL-UP GAMER"
          className={styles.logo}
          draggable="false"
        />
      </Link>
    </>
  );
}
