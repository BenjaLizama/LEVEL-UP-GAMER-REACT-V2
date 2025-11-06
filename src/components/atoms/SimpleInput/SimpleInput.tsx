import React from "react";
import styles from "./SimpleInput.module.css";
import { InputType } from "./SimpleInput.types";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type: InputType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SimpleInput({ className, ...rest }: Props) {
  return <input {...rest} className={`${styles.input} ${className || ""}`} />;
}
