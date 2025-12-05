import React from "react";
import styles from "./CartControlButtons.module.css";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { ADD, REMOVE, TRASH } from "@/utils/Icons";

interface CartControlButtonsProps {
  cantidad: number;
  onAddClick: () => void;
  onRemoveClick: () => void;
  onDeleteClick: () => void;
}

export default function CartControlButtons(props: CartControlButtonsProps) {
  const { cantidad, onRemoveClick, onAddClick, onDeleteClick } = props;

  return (
    <div className={styles.cartControlButtonsContainer}>
      <div className={styles.cartControlButtons}>
        <button
          aria-label="Disminuir cantidad"
          className={styles.cartControlButton}
          onClick={onRemoveClick}
        >
          <SimpleIcon icon={REMOVE} color="white" fontSize={14} />
        </button>
        <span className={styles.cartControlButtonsCantidad}>{cantidad}</span>
        <button
          aria-label="Aumentar cantidad"
          className={styles.cartControlButton}
          onClick={onAddClick}
        >
          <SimpleIcon icon={ADD} color="white" fontSize={18} />
        </button>
      </div>
      <button
        className={styles.cartControlButtonsDelete}
        onClick={onDeleteClick}
      >
        <SimpleIcon icon={TRASH} fontSize={12} />
      </button>
    </div>
  );
}
