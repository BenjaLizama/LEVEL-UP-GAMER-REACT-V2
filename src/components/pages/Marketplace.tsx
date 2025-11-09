import { useEffect, useState } from "react";
import { Producto } from "@/models/Producto";
import { productoService } from "@/services/ProductoService";
import ProductGrid from "../organisms/ProductGrid/ProductGrid";

export default function Marketplace() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setIsLoading(true);
      const data = await productoService.getAllProducts();
      setProductos(data);
      setError(null);
    } catch {
      setError(
        "No se pudieron cargar los productos. Intenta nuevamente mas tarde"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        Cargando catálogo...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
        {error}
      </div>
    );
  }

  return (
    <main>
      <h1>Nuestra Tienda</h1>
      <ProductGrid productos={productos} />
    </main>
  );
}
