import React from "react";
import styles from "./OptionSelectorContainer.module.css";

interface OptionSelectorContainerProps {
  descripcion: string;
  children?: React.ReactNode;
}

export default function OptionSelectorContainer({
  descripcion,
  children,
}: OptionSelectorContainerProps) {
  return (
    <div className={styles.container}>
      {descripcion}
      {children}
    </div>
  );
}
