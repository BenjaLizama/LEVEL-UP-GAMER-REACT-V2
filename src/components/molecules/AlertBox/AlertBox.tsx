import React, { useEffect, useState } from "react";
import styles from "./AlertBox.module.css";

const TRANSITION_DURATION_MS = 500;

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
  const [shouldAnimateOut, setShouldAnimateOut] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const autoCloseTimer = setTimeout(() => {
      setShouldAnimateOut(true);

      const removeTimer = setTimeout(onClose, TRANSITION_DURATION_MS);

      return () => clearTimeout(removeTimer);
    }, durationMs);

    return () => clearTimeout(autoCloseTimer);
  }, [durationMs, onClose, isMounted]);

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

  const animationClass = shouldAnimateOut
    ? styles.animateOut
    : isMounted
    ? styles.visible
    : "";

  return (
    <div
      style={{
        ...style,
      }}
      className={`${styles.alert} ${animationClass}`}
    >
      {message}
    </div>
  );
};
