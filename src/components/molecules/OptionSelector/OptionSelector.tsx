import React from "react";
import styles from "./OptionSelector.module.css";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { LINK_EXTERNAL } from "@/utils/Icons";

interface OptionSelectorProps {
  icono: string;
  descripcion: string;
}

export default function OptionSelector({
  icono,
  descripcion,
}: OptionSelectorProps) {
  return (
    <div className={styles.optionSelectorContainer}>
      <div className={styles.optionIcon}>
        <SimpleIcon icon={icono} fontSize={20} />
      </div>
      <div className={styles.optionDescription}>{descripcion}</div>
      <div className={styles.optionArrow}>
        <SimpleIcon icon={LINK_EXTERNAL} fontSize={25} />
      </div>
    </div>
  );
}
