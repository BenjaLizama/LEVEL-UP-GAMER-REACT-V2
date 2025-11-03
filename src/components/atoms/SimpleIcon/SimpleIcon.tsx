import React from "react";
import { Icon } from "@iconify/react";

interface SimpleIconProps {
  icon: string;
  fontSize: number;
  color?: string;
}

export default function SimpleIcon({ icon, fontSize, color }: SimpleIconProps) {
  return <Icon icon={icon} fontSize={fontSize} color={color} />;
}
