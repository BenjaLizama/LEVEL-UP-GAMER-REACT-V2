import React from "react";
import styles from "./AdminProductEdit.module.css";
import { formatearACLP } from "@/utils/Funciones";
import Button from "@/components/atoms/Button/Button";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { X } from "@/utils/Icons";

interface AdminProductEditProps {
  titulo: string;
  codigoProducto?: string;
  nombreProducto?: string;
  categoriaProducto?: string;
  descripcionProducto?: string;
  precioProducto?: number;
  imagenesURL?: Array<string>;
  cantidadStockProducto: number;

  onNombreChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPrecioChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStockChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImagenesUrlChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  onCategoriaChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;

  onDescripcionChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;

  onCancelarClick?: () => void;
  onAceptarClick?: () => void;
}

export default function AdminProductEdit({
  titulo,
  nombreProducto,
  categoriaProducto,
  descripcionProducto,
  precioProducto,
  imagenesURL,
  cantidadStockProducto,
  onNombreChange,
  onCategoriaChange,
  onPrecioChange,
  onStockChange,
  onImagenesUrlChange,
  onDescripcionChange,
  onCancelarClick,
  onAceptarClick,
}: AdminProductEditProps) {
  return (
    <div className={styles.productEditContainer}>
      <div className={styles.buttonCloseContainer}>
        <button className={styles.buttonClose} onClick={onCancelarClick}>
          <SimpleIcon icon={X} fontSize={30} />
        </button>
      </div>
      <h3 className={styles.titulo}>{titulo}</h3>
      <div className={styles.productEditContainerSecundario}>
        <div className={styles.containerSecundario}>
          <input
            type="text"
            value={nombreProducto || ""}
            placeholder="Nombre del producto"
            className={styles.input}
            onChange={(e) => onNombreChange?.(e)}
          />
        </div>
        <div className={styles.containerSecundario}>
          <select
            name="categoria"
            id="id-categoria"
            aria-label="categoria del producto"
            value={categoriaProducto || "categoria"}
            className={styles.select}
            onChange={(e) => onCategoriaChange?.(e)}
          >
            <option value="categoria">Categoria</option>
            <option value="JUEGO_MESA">Juego Mesa</option>
          </select>
          <input
            type="text"
            value={formatearACLP(precioProducto || 0)}
            placeholder="Precio del producto"
            className={styles.input}
            onChange={(e) => onPrecioChange?.(e)}
          />
        </div>
        <div className={styles.containerSecundario}>
          <input
            type="text"
            value={cantidadStockProducto || 0}
            className={styles.input}
            onChange={(e) => onStockChange?.(e)}
          />
          <input
            type="text"
            value={imagenesURL || ""}
            className={styles.input}
            onChange={(e) => onImagenesUrlChange?.(e)}
          />
        </div>
        <div className={styles.containerSecundario}>
          <textarea
            value={descripcionProducto || ""}
            className={styles.textarea}
            onChange={(e) => onDescripcionChange?.(e)}
          />
        </div>
      </div>
      <div className={styles.containerBotones}>
        <Button onClick={onCancelarClick}>Cancelar</Button>
        <Button onClick={onAceptarClick}>Aceptar</Button>
      </div>
    </div>
  );
}
