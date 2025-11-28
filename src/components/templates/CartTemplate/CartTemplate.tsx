import React from "react";
import CartItem from "@/components/molecules/CartItem/CartItem";
import OrderSummary from "@/components/molecules/OrderSummary/OrderSummary";
import styles from "./CartTemplate.module.css";
import { formatearACLP } from "@/utils/Funciones";
interface plantillaCartProps {
  itemlist: Array<any>;
  total: number;
}

export default function CartTemplate({ itemlist, total }: plantillaCartProps) {
  return (
    <>
      <section className={styles.seccionItems}>
        {itemlist.map((prod) => (
          <CartItem
            key={prod.codigoProducto}
            nombre={prod.nombre}
            precio={prod.precioUnitario}
            cantidad={prod.cantidad}
            idItem={prod.codigoProducto}
            imagen={prod.img}
          >
            <button>hola soy un boton</button>
          </CartItem>
        ))}
      </section>

      <div className={styles.orderSummary}>
        <OrderSummary total={formatearACLP(total)}></OrderSummary>
      </div>
    </>
  );
}
