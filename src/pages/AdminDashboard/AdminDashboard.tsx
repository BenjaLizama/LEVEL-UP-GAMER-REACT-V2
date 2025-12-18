import React from "react";

import { useEffect, useMemo, useState } from "react";
import styles from "./AdminDashboard.module.css";
import { Producto } from "@/models/Producto";
import { productoService } from "@/services/ProductoService";
import ProductAdminGrid from "@/components/organisms/ProductAdminGrid/ProductAdminGrid";
import CategoryFilter from "@/components/molecules/CategoryFilter/CategoryFilter";
import { CATEGORIAS_POR_DEFECTO } from "@/models/Categoria";
import Input from "@/components/atoms/Input/Input";
import { SEARCH } from "@/utils/Icons";

import AdminProductEdit from "@/components/organisms/AdminProductEdit/AdminProductEdit";
import ProductAdminCard from "@/components/molecules/ProductAdminCard/ProductAdminCard";
import { ActualizarProductoDTO } from "@/models/dto/ActualizarProductoDTO";

export default function AdminDashboard() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [productoEditando, setProductoEditando] = useState<Producto | null>(
    null
  );

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
          const categoriaObjeto = CATEGORIAS_POR_DEFECTO.find(
            (cat) => String(cat.id) === categoriaSeleccionada
          );

          const categoriaAEnviar = categoriaObjeto
            ? categoriaObjeto.value
            : categoriaSeleccionada;

          const categoriaNormalizada = categoriaAEnviar.toUpperCase();

          data = await productoService.filtrarProductosPorCategoria(
            categoriaNormalizada
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

  const handleEditClick = (productoSeleccionado: Producto) => {
    const rawCategoria =
      productoSeleccionado.categoria || productoSeleccionado.categoria || "";

    const categoriaNormalizada = rawCategoria.replace(/ /g, "_");

    setProductoEditando({
      ...productoSeleccionado,

      categoria: categoriaNormalizada,
    });
  };

  const handleCancelarEdicion = () => {
    setProductoEditando(null);
  };

  const handleGuardarCambios = async () => {
    if (!productoEditando) return;
    try {
      setIsLoading(true);
      const datosAEnviar: ActualizarProductoDTO = {
        nombreProducto: productoEditando.nombreProducto,
        precioProducto: productoEditando.precioProducto,
        cantidadInicial: productoEditando.cantidadStockProducto,
        descripcionProducto: productoEditando.descripcionProducto,
        categoriaProducto: productoEditando.categoria,
      };
      console.log("Valor actual de categoría:", productoEditando.categoria);
      const productoActualizadoDelBack =
        await productoService.actualizarProducto(
          productoEditando.codigoProducto,
          datosAEnviar
        );

      setProductos((productosActuales) =>
        productosActuales.map((prod) =>
          prod.codigoProducto === productoEditando.codigoProducto
            ? productoActualizadoDelBack
            : prod
        )
      );
      console.log("¡Éxito! Producto actualizado");
      setProductoEditando(null);
    } catch (error) {
      console.error("error al actualizar");
      alert("Error al guardar los cambios");
      console.log("Valor actual de categoría:", productoEditando.categoria);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormChange = (campo: keyof Producto, valor: any) => {
    if (productoEditando) {
      setProductoEditando({ ...productoEditando, [campo]: valor });
    }
  };

  if (productoEditando) {
    return (
      <AdminProductEdit
        nombreProducto={productoEditando.nombreProducto}
        codigoProducto={productoEditando.codigoProducto}
        descripcionProducto={productoEditando.descripcionProducto}
        cantidadStockProducto={productoEditando.cantidadStockProducto}
        categoriaProducto={productoEditando.categoria}
        precioProducto={productoEditando.precioProducto}
        titulo={productoEditando.nombreProducto}
        onNombreChange={(e) =>
          handleFormChange("nombreProducto", e.target.value)
        }
        onDescripcionChange={(e) =>
          handleFormChange("descripcionProducto", e.target.value)
        }
        onPrecioChange={(e) =>
          handleFormChange(
            "precioProducto",
            Number(e.target.value.replace(/[^0-9]/g, ""))
          )
        }
        onStockChange={(e) =>
          handleFormChange("cantidadStockProducto", Number(e.target.value))
        }
        onCategoriaChange={(e) => handleFormChange("categoria", e.target.value)}
        onCancelarClick={handleCancelarEdicion}
        onAceptarClick={handleGuardarCambios}
      />
    );
  }

  return (
    <main style={{ padding: "20px" }}>
      <h1>Inventario</h1>
      <div className={styles.searchContainer} style={{ marginBottom: "20px" }}>
        <Input
          icon={SEARCH}
          value={searchTerm}
          onValueChange={(val) => setSearchTerm(val)}
          placeholder="Buscar por nombre..."
        />
        <CategoryFilter
          categorias={CATEGORIAS_POR_DEFECTO}
          categoriaSeleccionada={categoriaSeleccionada}
          onCategoriaChange={setCategoriaSeleccionada}
        />
      </div>

      {isLoading ? (
        <p>Cargando catálogo...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ProductAdminGrid
          productos={productosFiltrados}
          onEdit={handleEditClick}
          onSelect={(id) => console.log("Seleccionado", id)}
        />
      )}
    </main>
  );
}
