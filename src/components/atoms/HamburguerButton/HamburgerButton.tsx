import React from "react";
import styles from "./HamburgerButton.module.css";

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function HamburgerButton({
  isOpen,
  onClick,
}: HamburgerButtonProps) {
  return (
    <button
      className={`${styles.hamburgerButton} ${isOpen ? styles.open : ""}`}
      onClick={onClick}
      aria-label="Menu"
      aria-expanded={isOpen}
      style={{ zIndex: 1001 }}
    >
      <div className={styles.top}></div>
      <div className={styles.middle}></div>
      <div className={styles.bottom}></div>
    </button>
  );
}
