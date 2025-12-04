import React from "react";
import CartItem from "@/components/molecules/CartItem/CartItem";
import OrderSummary from "@/components/molecules/OrderSummary/OrderSummary";
import styles from "./CartTemplate.module.css";
import { formatearACLP } from "@/utils/Funciones";
import CartControlButtons from "@/components/molecules/CartControlButtons/CartControlButtons";

interface plantillaCartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            precio={formatearACLP(prod.precioUnitario)}
            cantidad={prod.cantidad}
            idItem={prod.codigoProducto}
            imagen={prod.img}
            categoria={prod.categoria}
          >
            <CartControlButtons
              cantidad={prod.cantidad}
              onAddClick={() => {}}
              onRemoveClick={() => {}}
            />
          </CartItem>
        ))}
      </section>

      <div className={styles.orderSummary}>
        <OrderSummary total={formatearACLP(total)}></OrderSummary>
      </div>
    </>
  );
}
