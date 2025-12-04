import React from "react";
import styles from "./CartControlButtons.module.css";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { ADD, REMOVE, TRASH } from "@/utils/Icons";

interface CartControlButtonsProps {
  cantidad: number;
  onAddClick: () => void;
  onRemoveClick: () => void;
}

export default function CartControlButtons(props: CartControlButtonsProps) {
  const { cantidad, onRemoveClick, onAddClick } = props;

  return (
    <div className={styles.cartControlButtonsContainer}>
      <div className={styles.cartControlButtons}>
        <button
          aria-label="Disminuir cantidad"
          className={styles.cartControlButton}
          onClick={onRemoveClick}
        >
          <SimpleIcon icon={REMOVE} color="white" fontSize={22} />
        </button>
        <span className={styles.cartControlButtonsCantidad}>{cantidad}</span>
        <button
          aria-label="Aumentar cantidad"
          className={styles.cartControlButton}
          onClick={onAddClick}
        >
          <SimpleIcon icon={ADD} color="white" fontSize={24} />
        </button>
      </div>
      <button className={styles.cartControlButtonsDelete}>
        <SimpleIcon icon={TRASH} fontSize={16} />
      </button>
    </div>
  );
}
