import React from "react";
import styles from "./Switch.module.css";

interface ThemeToggleProps {
  isLightMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({
  isLightMode,
  onToggle,
}: ThemeToggleProps) {
  return (
    <label className={styles.switch} aria-label="Cambiar tema">
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isLightMode}
        onChange={onToggle}
      />
      <span className={styles.slider}>
        <span className={styles.icon}></span>
      </span>
    </label>
  );
}
