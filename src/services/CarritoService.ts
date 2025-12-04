import { Carrito } from "@/models/Carrito";
import { ItemCarrito } from "@/models/ItemCarrito";
import { carritosApi } from "@/services/AxiosConfig";

type VoidFunction = () => void;

export class CarritoService {
  private cartItems: ItemCarrito[] = [];
  private total: number = 0;
  private subscribers: VoidFunction[] = [];

  private getUserId(): number | null {
    const idStored = localStorage.getItem("idUsuario");
    if (!idStored) {
      console.warn(
        "No hay un usuario logueado, operación de carrito abortada."
      );
      return null;
    }
    return parseInt(idStored);
  }

  async addItemToCart(codigoProducto: string, cantidad: number): Promise<void> {
    const idUsuario = this.getUserId();
    if (!idUsuario) return;

    const payload = {
      codigoProducto: codigoProducto,
      cantidad: cantidad,
    };

    try {
      const response = await carritosApi.post<Carrito>(
        `/${idUsuario}`,
        payload
      );

      this.updateState(response.data);
    } catch (error) {
      console.error("Error al agregar item al carrito:", error);
    }
  }

  async getItemCart(): Promise<void> {
    const idUsuario = this.getUserId();
    if (!idUsuario) return;

    try {
      const response = await carritosApi.get<Carrito>(`/${idUsuario}`);

      this.updateState(response.data);
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

  public subscribe(callback: VoidFunction): void {
    this.subscribers.push(callback);
  }

  public unsubscribe(callback: VoidFunction): void {
    this.subscribers = this.subscribers.filter((n) => n !== callback);
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback());
  }
}

export const carritoService = new CarritoService();
