import React from "react";
import CartItem from "@/components/molecules/CartItem/CartItem";
import OrderSummary from "@/components/molecules/OrderSummary/OrderSummary";
import styles from "./CartTemplate.module.css";
import { formatearACLP } from "@/utils/Funciones";
import CartControlButtons from "@/components/molecules/CartControlButtons/CartControlButtons";
import { carritoService } from "@/services/CarritoService";
import { usuarioService } from "@/services/UsuarioService";

interface plantillaCartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  itemlist: Array<any>;
  total: number;
}

export default function CartTemplate({ itemlist, total }: plantillaCartProps) {
  const handleAddClick = (codigoProducto: string) => {
    carritoService.addItemToCart(codigoProducto, 1);
  };

  const handleRemoveClick = (codigoProducto: string) => {
    carritoService.removeItemCart(codigoProducto);
  };

  const handleDeleteClick = (codigoProducto: string) => {
    carritoService.deleteItemCart(codigoProducto);
  };

  const handleOnPagarClick = async () => {
    try {
      const respuestaPago = await usuarioService.pagar();

      const pagoUrl = respuestaPago.url;

      if (pagoUrl) {
        window.location.href = pagoUrl;
      } else {
        alert("Error: No se pudo obtener la URL de pago");
      }
    } catch (error) {
      console.error("Error al iniciar el pago:", error);
      alert(error);
    }
  };

  return (
    <>
      <section className={styles.seccionItems}>
        {itemlist.map((prod) => (
          <CartItem
            key={prod.codigoProducto}
            nombre={prod.nombre}
            precio={formatearACLP(prod.precioUnitario)}
            cantidad={prod.cantidad}
            idItem={prod.codigoProducto}
            imagen={prod.img}
            categoria={prod.categoria}
          >
            <CartControlButtons
              cantidad={prod.cantidad}
              onAddClick={() => handleAddClick(prod.codigoProducto)}
              onRemoveClick={() => handleRemoveClick(prod.codigoProducto)}
              onDeleteClick={() => handleDeleteClick(prod.codigoProducto)}
            />
          </CartItem>
        ))}
      </section>

      <div className={styles.orderSummary}>
        <OrderSummary
          total={formatearACLP(total)}
          onPagar={() => handleOnPagarClick()}
        ></OrderSummary>
      </div>
    </>
  );
}
