import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  disableCloseOnOverlayClick?: boolean;
}

export default function Modal({
  children,
  onClose,
  title,
  disableCloseOnOverlayClick,
}: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const handleEscapeKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !disableCloseOnOverlayClick) {
      onClose();
    }
  };

  const modalRoot = document.getElementById("modal-root");

  if (!modalRoot) {
    console.error("El elemento con id 'modal-root' no se encuentra en el DOM.");
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modalContainer} ref={modalContentRef}>
        <header className={styles.modalHeader}>
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
        </header>

        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
}
