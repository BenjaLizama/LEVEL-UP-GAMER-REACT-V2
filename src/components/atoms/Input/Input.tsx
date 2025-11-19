import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";
import SimpleIcon from "../SimpleIcon/SimpleIcon";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "className"
> & {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  errorMessage?: string;
  icon: string;
  className?: string;
};

export default function Input({
  value,
  onValueChange,
  label,
  errorMessage,
  icon,
  className,
  ...rest
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  const handleClear = () => {
    onValueChange("");
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={rest.id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        <div className={styles.containerIcono}>
          <SimpleIcon icon={icon} fontSize={20} />
        </div>

        <input
          type="text"
          className={`${styles.inputElement} ${className || ""}`}
          value={value}
          onChange={handleChange}
          {...rest}
        />

        {value && value.length > 0 && (
          <button
            type="button"
            className={styles.button}
            onClick={handleClear}
            aria-label="Limpiar campo"
          >
            <SimpleIcon icon="ph:x-bold" fontSize={20} />
          </button>
        )}
      </div>

      {errorMessage ? (
        <span className={styles.errorMessage}>{errorMessage}</span>
      ) : (
        <span className={styles.errorMessage}>&nbsp;</span>
      )}
    </div>
  );
}
