import React, { useEffect } from "react";
import styles from "./AlertBox.module.css";

export interface TemporaryAlertProps {
  message: string;
  type: "success" | "error" | "warning";
  durationMs?: number;
  onClose: () => void;
}

export const TemporaryAlert: React.FC<TemporaryAlertProps> = ({
  message,
  type,
  durationMs = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs, onClose]);

  const getStyles = (alertType: typeof type) => {
    switch (alertType) {
      case "success":
        return { backgroundColor: "#d4edda", color: "#155724" };
      case "error":
        return { backgroundColor: "#f8d7da", color: "#721c24" };
      case "warning":
        return { backgroundColor: "#fff3cd", color: "#856404" };
      default:
        return { backgroundColor: "#f2f2f2", color: "#333" };
    }
  };

  const style = getStyles(type);

  return (
    <div
      style={{
        ...style,
      }}
      className={styles.alert}
    >
      {message}
    </div>
  );
};
