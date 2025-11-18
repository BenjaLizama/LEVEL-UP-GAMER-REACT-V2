import React from "react";
import { Categoria } from "@/models/Categoria";
import styles from "./CategoryFilter.module.css";

interface CategoryFilterProps {
  categorias: Categoria[];
  categoriaSeleccionada: string;
  onCategoriaChange: (categoriaId: string) => void;
}

export default function CategoryFilter(props: CategoryFilterProps) {
  const { categorias, categoriaSeleccionada, onCategoriaChange } = props;

  const handleCategoriaSeleccionada = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onCategoriaChange(event.target.value);
  };

  return (
    <div className={styles.filterContainer}>
      <select
        value={categoriaSeleccionada}
        onChange={handleCategoriaSeleccionada}
        className={styles.selector}
        aria-label="Filtrar por categoria"
      >
        <option value="">Todas las categorias</option>

        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nombreVisible}
          </option>
        ))}
      </select>
    </div>
  );
}
