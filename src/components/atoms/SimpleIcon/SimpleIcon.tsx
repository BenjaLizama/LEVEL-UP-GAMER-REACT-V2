import React from "react";
import styles from "./SimpleIcon.module.css";
import { Icon } from "@iconify/react";

interface SimpleIconProps {
  icon: string;
  fontSize: number;
  color?: string;
  shadow?: boolean;
}

export default function SimpleIcon({
  icon,
  fontSize,
  color,
  shadow = false,
}: SimpleIconProps) {
  return (
    <Icon
      icon={icon}
      fontSize={fontSize}
      color={color}
      className={shadow ? styles.shadow : ""}
    />
  );
}
