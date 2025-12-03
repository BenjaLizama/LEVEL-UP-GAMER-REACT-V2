import { Carrito } from "@/models/Carrito";
import { ItemCarrito } from "@/models/ItemCarrito";
import { carritosApi } from "@/services/AxiosConfig";

export class CarritoService {
  private cartItems: ItemCarrito[] = [];
  private total: number = 0;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private subscribers: Function[] = [];

  private getUserId(): number {
    const idStored = localStorage.getItem("idUsuario");
    if (!idStored) {
      console.warn("No hay un usuario logueado");
      return -1;
    }
    return parseInt(idStored);
  }

  async addItemToCart(codigoProducto: string, cantidad: number): Promise<void> {
    const payload = {
      codigoProducto: codigoProducto,
      cantidad: cantidad,
    };

    const idUsuario = this.getUserId();
    if (idUsuario === -1) return;

    try {
      const response = await carritosApi.post<Carrito>(
        `/${idUsuario}`,
        payload
      );

      const updatedCarrito: Carrito = response.data;
      this.updateState(updatedCarrito);
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  }

  async getItemCart(): Promise<void> {
    const idUsuario = this.getUserId();
    if (idUsuario === -1) return;

    try {
      const response = await carritosApi.get<Carrito>(`/${idUsuario}`);

      const updatedCarrito: Carrito = response.data;
      this.updateState(updatedCarrito);
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  }

  private updateState(data: Carrito) {
    this.cartItems = data.items;
    this.total = data.total;
    this.notifySubscribers();
  }

  public getCartItems() {
    return this.cartItems;
  }

  public getTotal() {
    return this.total;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  public subscribe(callback: Function): void {
    this.subscribers.push(callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback());
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  public unsubscribe(callback: Function): void {
    this.subscribers = this.subscribers.filter((n) => n !== callback);
  }
}

export const carritoService = new CarritoService();
