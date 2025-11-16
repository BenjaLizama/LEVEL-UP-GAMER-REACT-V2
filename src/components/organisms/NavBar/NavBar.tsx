import React from "react";
import styles from "./NavBar.module.css";
import HamburgerButton from "@/components/atoms/HamburguerButton/HamburgerButton";
import Switch from "../../atoms/Switch/Switch";
import logoImg from "@/assets/images/Level-Up.png";
import { NavItem } from "../FullScreenMenu/FullScreenMenu";
import { Link } from "react-router-dom";

interface NavBarProps {
  isMenuOpen: boolean;
  onMenuToggle: () => void;
  isLightMode: boolean;
  onThemeToggle: () => void;
  links: NavItem[];
}

export default function NavBar({
  isMenuOpen,
  onMenuToggle,
  isLightMode,
  onThemeToggle,
  links,
}: NavBarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <HamburgerButton isOpen={isMenuOpen} onClick={onMenuToggle} />
      </div>
      {/* Diseño mobile */}
      <div className={styles.middle}>
        <Link to={"/"} className={styles.middleLink}>
          <img
            className={styles.logo}
            draggable="false"
            src={logoImg}
            alt="Logo LEVEL-UP GAMER"
          />
        </Link>
      </div>
      {/* Diseño escritorio */}
      <div className={styles.middleDesktop}>
        {links.map((link) => (
          <Link className={styles.link} to={link.to} key={link.to}>
            {link.label}
          </Link>
        ))}
      </div>
      <div className={styles.right}>
        <Switch isLightMode={isLightMode} onToggle={onThemeToggle} />
      </div>
    </header>
  );
}
