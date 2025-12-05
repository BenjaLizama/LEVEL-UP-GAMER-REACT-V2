import { ItemCarrito } from "@/models/ItemCarrito";
import { carritoService } from "@/services/CarritoService";
import { useState, useEffect } from "react";

interface CartData {
  itemCart: ItemCarrito[];
  total: number;
}

export function useCartData(): CartData {
  const [cartData, setCartData] = useState<CartData>({
    itemCart: carritoService.getCartItems(),
    total: carritoService.getTotal(),
  });

  useEffect(() => {
    const handleUpdate = () => {
      setCartData({
        itemCart: carritoService.getCartItems(),
        total: carritoService.getTotal(),
      });
    };

    carritoService.getItemCart();
    carritoService.subscribe(handleUpdate);
    return () => {
      carritoService.unsubscribe(handleUpdate);
    };
  }, []);

  return cartData;
}
