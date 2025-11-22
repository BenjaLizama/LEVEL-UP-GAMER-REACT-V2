import React, { InputHTMLAttributes } from "react";
import styles from "./DateSelector.module.css";

type DateSelectorProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value" | "className" | "type"
> & {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
  errorMessage?: string;
  className?: string;
};

export default function DateSelector({
  value,
  onValueChange,
  label,
  errorMessage,
  className,
  ...rest
}: DateSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={rest.id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputContainer}>
        <input
          type="date"
          className={`${styles.dateComponent} ${className || ""}`}
          value={value}
          onChange={handleChange}
          {...rest}
        />
      </div>

      {errorMessage ? (
        <span className={styles.errorMessage}>{errorMessage}</span>
      ) : (
        <span className={styles.errorMessage}>&nbsp;</span>
      )}
    </div>
  );
}
