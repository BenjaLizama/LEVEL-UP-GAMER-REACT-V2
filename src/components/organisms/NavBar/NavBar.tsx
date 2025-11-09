import React from "react";
import styles from "./NavBar.module.css";
import HamburgerButton from "@/components/atoms/HamburguerButton/HamburgerButton";
import Switch from "../../atoms/Switch/Switch";
import logoImg from "@/assets/images/Level-Up.png";

interface NavBarProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  isLightMode: boolean;
  onThemeToggle: () => void;
}

export default function NavBar({
  isMenuOpen,
  onMenuToggle,
  isLightMode,
  onThemeToggle,
}: NavBarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <HamburgerButton isOpen={isMenuOpen} onClick={onMenuToggle} />
      </div>
      <div className={styles.middle}>
        <img
          className={styles.logo}
          draggable="false"
          src={logoImg}
          alt="Logo LEVEL-UP GAMER"
        />
      </div>
      <div className={styles.right}>
        <Switch isLightMode={isLightMode} onToggle={onThemeToggle} />
      </div>
    </header>
  );
}
