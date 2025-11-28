import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductGrid from "./ProductGrid";
import { Producto } from "@/models/Producto";

import { carritoService } from "@/services/CarritoService";
jest.mock("@/services/CarritoService");
const mockAddItemToCart = carritoService.addItemToCart as jest.Mock;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
jest.mock("@/components/atoms/Empty/Empty", () => ({ descripcion }: any) => (
  <div data-testid="empty-mock">
    <span>{descripcion}</span>
  </div>
));
jest.mock("@/utils/Icons", () => ({
  NO_PRODUCTS: "mock-icon-no-products",
}));

jest.mock("./ProductGrid.module.css", () => ({
  gridContainer: "mocked-grid-container",
  noProductContainer: "mocked-no-product-container",
}));

interface MockProductCardProps extends Partial<Producto> {
  onAddCart?: () => void;
}

jest.mock("@/components/molecules/ProductCard/ProductCard", () => ({
  __esModule: true,
  default: ({
    onAddCart,
    nombreProducto,
    codigoProducto,
  }: MockProductCardProps) => (
    <div data-testid="product-card-mock" data-code={codigoProducto}>
      <span>{nombreProducto}</span>
      <button onClick={onAddCart} aria-label={`Agregar ${nombreProducto}`}>
        Añadir mock
      </button>
    </div>
  ),
}));

const mockProductos = [
  { codigoProducto: "P1", nombreProducto: "Laptop Pro", precioProducto: 1500 },
  { codigoProducto: "P2", nombreProducto: "Smartphone X", precioProducto: 800 },
] as Producto[];

describe("ProductGrid Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe renderizar mensaje de vacío si el array de productos está vacío", () => {
    render(<ProductGrid productos={[]} />);
    expect(screen.getByTestId("empty-mock")).toBeInTheDocument();
    expect(
      screen.getByText(/no se encontraron productos/i)
    ).toBeInTheDocument();
  });

  test("debe renderizar la cantidad correcta de ProductCards", () => {
    render(<ProductGrid productos={mockProductos} />);
    expect(screen.getAllByTestId("product-card-mock")).toHaveLength(
      mockProductos.length
    );
    expect(screen.getByText("Laptop Pro")).toBeInTheDocument();
    expect(screen.getByText("Smartphone X")).toBeInTheDocument();
  });

  test("debe llamar a carritoService.addItemToCart con el código de producto correcto al hacer clic", () => {
    render(<ProductGrid productos={mockProductos} />);

    const laptopProButton = screen.getByRole("button", {
      name: /agregar laptop pro/i,
    });

    fireEvent.click(laptopProButton);

    expect(mockAddItemToCart).toHaveBeenCalledTimes(1);

    expect(mockAddItemToCart).toHaveBeenCalledWith("P1", 1);
  });

  test("debe llamar a carritoService.addItemToCart para el segundo producto", () => {
    render(<ProductGrid productos={mockProductos} />);

    const smartphoneButton = screen.getByRole("button", {
      name: /agregar smartphone x/i,
    });

    fireEvent.click(smartphoneButton);

    expect(mockAddItemToCart).toHaveBeenCalledTimes(1);
    expect(mockAddItemToCart).toHaveBeenCalledWith("P2", 1);
  });

  test("debe ignorar la prop onAddCart de ProductGrid y usar la implementación del servicio", () => {
    const handleAddCartMock = jest.fn();
    render(
      <ProductGrid productos={mockProductos} onAddCart={handleAddCartMock} />
    );

    const laptopProButton = screen.getByRole("button", {
      name: /agregar laptop pro/i,
    });
    fireEvent.click(laptopProButton);

    // Debe llamar al servicio, NO a la prop onAddCart del Grid.
    expect(mockAddItemToCart).toHaveBeenCalledTimes(1);
    expect(handleAddCartMock).not.toHaveBeenCalled();
  });
});
