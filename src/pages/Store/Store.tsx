import { useEffect, useMemo, useState } from "react";
import styles from "./Store.module.css";
import { Producto } from "@/models/Producto";
import { productoService } from "@/services/ProductoService";
import ProductGrid from "@/components/organisms/ProductGrid/ProductGrid";
import CategoryFilter from "@/components/molecules/CategoryFilter/CategoryFilter";
import { CATEGORIAS_POR_DEFECTO } from "@/models/Categoria";
import Input from "@/components/atoms/Input/Input";
import { SEARCH } from "@/utils/Icons";

export default function Store() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchProductosActualizados = async () => {
      try {
        setIsLoading(true);
        setError(null);
        let data: Producto[];

        if (categoriaSeleccionada === "") {
          data = await productoService.getAllProducts();
        } else {
          data = await productoService.filtrarProductosPorCategoria(
            categoriaSeleccionada
          );
        }

        setProductos(data);
      } catch {
        setError(
          "No se pudieron cargar los productos. Intenta nuevamente mas tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductosActualizados();
  }, [categoriaSeleccionada]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const productosFiltrados = useMemo(() => {
    if (!searchTerm) {
      return productos;
    }

    return productos.filter((producto) =>
      producto.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [productos, searchTerm]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {" "}
        <div className={styles.searchContainer}>
          {/* Props restauradas y deshabilitado durante la carga */}{" "}
          <Input
            icon={SEARCH}
            value={searchTerm}
            onValueChange={handleSearchChange}
            placeholder="Buscando..."
            disabled
          />{" "}
          <CategoryFilter
            categorias={CATEGORIAS_POR_DEFECTO}
            categoriaSeleccionada={categoriaSeleccionada}
            onCategoriaChange={setCategoriaSeleccionada}
          />{" "}
        </div>
        Cargando catálogo...{" "}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {" "}
        <div className={styles.searchContainer}>
          {/* Props restauradas y deshabilitado durante el error */}{" "}
          <Input
            icon={SEARCH}
            value={searchTerm}
            onValueChange={handleSearchChange}
            placeholder="Buscar por nombre..."
            disabled
          />{" "}
          <CategoryFilter
            categorias={CATEGORIAS_POR_DEFECTO}
            categoriaSeleccionada={categoriaSeleccionada}
            onCategoriaChange={setCategoriaSeleccionada}
          />{" "}
        </div>
        {error}{" "}
      </div>
    );
  }

  return (
    <main>
      {" "}
      <div className={styles.searchContainer}>
        {/* Props restauradas y HABILITADO para la interacción */}{" "}
        <Input
          icon={SEARCH}
          value={searchTerm}
          onValueChange={handleSearchChange}
          placeholder="Buscar por nombre..."
        />{" "}
        <CategoryFilter
          categorias={CATEGORIAS_POR_DEFECTO}
          categoriaSeleccionada={categoriaSeleccionada}
          onCategoriaChange={setCategoriaSeleccionada}
        />{" "}
      </div>
      <ProductGrid productos={productosFiltrados} />{" "}
    </main>
  );
}
