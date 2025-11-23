import React from "react";
import styles from "./OptionSelector.module.css";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { LINK_EXTERNAL } from "@/utils/Icons";
import { Link } from "react-router-dom";

interface OptionSelectorProps {
  icono: string;
  descripcion: string;
  ruta?: string;
  onClick?: () => void;
}

export default function OptionSelector({
  icono,
  descripcion,
  ruta,
  onClick,
}: OptionSelectorProps) {
  return (
    <Link
      className={styles.optionSelectorContainer}
      to={ruta ? ruta : ""}
      onClick={onClick}
    >
      <div className={styles.first}>
        <SimpleIcon icon={icono} fontSize={20} />
        {descripcion}
      </div>
      <div className={styles.optionArrow}>
        <SimpleIcon icon={LINK_EXTERNAL} fontSize={25} />
      </div>
    </Link>
  );
}
