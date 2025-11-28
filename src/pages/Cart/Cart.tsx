import React, { useEffect, useState, useMemo } from "react";
import styles from "./Cart.module.css";
import { Producto } from "@/models/Producto";
import { productoService } from "@/services/ProductoService";
import { enriqucerCarrito } from "@/utils/CarritoHelper";
import { useCartData } from "@/utils/useCartData";
import CartTemplate from "@/components/templates/CartTemplate/CartTemplate";

export default function Cart() {
  const { itemCart, total } = useCartData();
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const listaProductos = await productoService.getAllProducts();
        setProductos(listaProductos);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };
    fetchProductos();
  }, []);

  const itemsParaMostrar = useMemo(() => {
    return enriqucerCarrito(itemCart, productos);
  }, [itemCart, productos]);

  return (
    <div className={styles.container}>
      <CartTemplate itemlist={itemsParaMostrar} total={total}></CartTemplate>
    </div>
  );
}
