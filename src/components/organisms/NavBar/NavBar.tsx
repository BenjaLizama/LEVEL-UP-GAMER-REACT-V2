import React from "react";
import styles from "./NavBar.module.css";
import HamburgerButton from "@/components/atoms/HamburguerButton/HamburgerButton";
import Switch from "../../atoms/Switch/Switch";
import { NavItem } from "../FullScreenMenu/FullScreenMenu";
import { Link } from "react-router-dom";
import LogoButton from "@/components/atoms/LogoButton/LogoButton";

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
        <LogoButton />
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
