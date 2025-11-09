import React, { useEffect } from "react";
import styles from "./FullScreenMenu.module.css";
import { Link } from "react-router-dom";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { HOME, LINK_EXTERNAL } from "@/utils/Icons";

export interface NavItem {
  label: string;
  to: string;
}

interface FullScreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
}

export default function FullScreenMenu({
  isOpen,
  onClose,
  links,
}: FullScreenMenuProps) {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  return (
    <div
      className={`${styles.menu} ${isOpen ? styles.open : ""}
`}
      aria-hidden={!isOpen}
    >
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {links.map((link, index) => (
            <li
              key={link.label}
              className={styles.navItem}
              style={{ "--item-index": index } as React.CSSProperties}
            >
              <Link to={link.to} className={styles.navLink} onClick={onClose}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
