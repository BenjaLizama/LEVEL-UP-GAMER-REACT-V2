import React, { useEffect, useState, useMemo } from "react";
import styles from "./Cart.module.css";
import { Producto } from "@/models/Producto";
import { productoService } from "@/services/ProductoService";
import { enriqucerCarrito } from "@/utils/CarritoHelper";
import { useCartData } from "@/utils/useCartData";
import CartTemplate from "@/components/templates/CartTemplate/CartTemplate";
import Empty from "@/components/atoms/Empty/Empty";
import { EMPTY_CART } from "@/utils/Icons";
import Button from "@/components/atoms/Button/Button";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { itemCart, total } = useCartData();
  const [productos, setProductos] = useState<Producto[]>([]);
  const navigate = useNavigate();

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
    <>
      {itemsParaMostrar.length > 0 ? (
        <div className={styles.container}>
          <CartTemplate
            itemlist={itemsParaMostrar}
            total={total}
          ></CartTemplate>
        </div>
      ) : localStorage.getItem("idUsuario") != null ? (
        <div className={styles.emptyContainer}>
          <Empty
            icono={EMPTY_CART}
            descripcion="Aun no tienes productos en tu carrito."
          >
            <Button onClick={() => navigate("/marketplace")}>
              Ir a la tienda
            </Button>
          </Empty>
        </div>
      ) : (
        <div className={styles.emptyContainer}>
          <Empty
            icono={EMPTY_CART}
            descripcion="Debes iniciar sesión para agregar productos."
          >
            <Button onClick={() => navigate("/login")}>Iniciar sesión</Button>
          </Empty>
        </div>
      )}
    </>
  );
}
