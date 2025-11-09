import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductGrid from "./ProductGrid";
import { Producto } from "@/models/Producto";

// --- MOCKS ---

// Definimos una interfaz mínima para las props que espera el mock,
// extendiendo de Partial<Producto> para flexibilidad.
interface MockProductCardProps extends Partial<Producto> {
  onAddCart?: (producto: Producto) => void;
}

jest.mock("@/components/molecules/ProductCard/ProductCard", () => ({
  __esModule: true,
  default: ({ onAddCart, ...producto }: MockProductCardProps) => (
    <div data-testid="product-card-mock">
      <span>{producto.nombreProducto}</span>
      <button
        onClick={() => onAddCart && onAddCart(producto as Producto)}
        aria-label={`Agregar ${producto.nombreProducto}`}
      >
        Add mock
      </button>
    </div>
  ),
}));

// --- DATOS DE PRUEBA ---
// Usamos 'as Producto[]' para simplificar si tu interfaz real tiene muchas props obligatorias
// que no necesitamos para este test específico.
const mockProductos = [
  { codigoProducto: "P1", nombreProducto: "Laptop Pro", precioProducto: 1500 },
  { codigoProducto: "P2", nombreProducto: "Smartphone X", precioProducto: 800 },
] as Producto[];

describe("ProductGrid Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debe renderizar mensaje de vacío si no hay productos", () => {
    render(<ProductGrid productos={[]} />);
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
  });

  test("debe pasar la función onAddCart correctamente", () => {
    const handleAddCartMock = jest.fn();
    render(
      <ProductGrid productos={mockProductos} onAddCart={handleAddCartMock} />
    );

    const addButtons = screen.getAllByText("Add mock");
    fireEvent.click(addButtons[0]);

    expect(handleAddCartMock).toHaveBeenCalledTimes(1);
    expect(handleAddCartMock).toHaveBeenCalledWith(
      expect.objectContaining({
        codigoProducto: "P1",
      })
    );
  });
});
