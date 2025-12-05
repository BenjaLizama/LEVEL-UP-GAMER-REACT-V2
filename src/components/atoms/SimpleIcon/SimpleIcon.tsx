import React from "react";
import styles from "./SimpleIcon.module.css";
import { Icon } from "@iconify/react";

interface SimpleIconProps {
  icon: string;
  fontSize: number;
  color?: string;
  shadow?: boolean;
  className?: string;
}

export default function SimpleIcon({
  icon,
  fontSize,
  color,
  shadow = false,
  className,
}: SimpleIconProps) {
  const shadowClass = shadow ? styles.shadow : "";

  const finalClassName = `${className || ""} ${shadowClass}`.trim();

  return (
    <Icon
      icon={icon}
      fontSize={fontSize}
      color={color}
      className={finalClassName}
    />
  );
}
