import axios from "axios";
import { Carrito } from "../models/Carrito";
import { ItemCarrito } from "../models/ItemCarrito";

export class CarritoService {
  private cartItems: ItemCarrito[] = [];
  private total: number = 0;
  private subscribers: Function[] = [];
  private apiUrl = "http://54.85.135.89:8083/api/carritos";

  private getUserId(): number {
    const idStored = localStorage.getItem("idUsuario");
    if (!idStored) {
      console.warn("no hay un usuario logeado");
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
      const response = await axios.post<Carrito>(
        this.apiUrl + "/" + idUsuario,
        payload
      );
      const updatedCarrito: Carrito = response.data;
      this.cartItems = updatedCarrito.items;
      this.total = updatedCarrito.total;
      this.notifySubscribers();
    } catch (error) {
      console.error("error al actualizar el carrito");
    }
  }

  async getItemCart(): Promise<void> {
    const idUsuario = this.getUserId();
    if (idUsuario === -1) return;

    try {
      const response = await axios.get<Carrito>(this.apiUrl + "/" + idUsuario);
      const updatedCarrito: Carrito = response.data;
      this.cartItems = updatedCarrito.items;
      this.total = updatedCarrito.total;
      this.notifySubscribers();
    } catch (error) {
      console.error("error al obtener el carrito");
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
  public subscribe(callback: Function): void {
    this.subscribers.push(callback);
  }
  private notifySubscribers(): void {
    this.subscribers.forEach((callback) => callback());
  }
  public unsubscribe(callback: Function): void {
    this.subscribers = this.subscribers.filter((n) => n !== callback);
  }
}
export const carritoService = new CarritoService();
