import React from "react";
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextEncoder, TextDecoder });
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductCard from "./ProductCard";
import { Producto } from "@/models/Producto";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("@/utils/Funciones", () => ({
  formatearACLP: (precio: number) => `$ ${precio}`,
}));

jest.mock(
  "@/assets/images/defaultImages/no-product-image.png",
  () => "no-image-mock.png"
);

jest.mock("@/components/atoms/Button/Button", () => {
  return function MockButton({
    onClick,
    children,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onClick: any;
    children: React.ReactNode;
  }) {
    return (
      <button onClick={onClick} data-testid="add-to-cart-button">
        {children}
      </button>
    );
  };
});

const mockProduct: Producto = {
  codigoProducto: "PROD-123",
  nombreProducto: "Teclado Mecánico",
  descripcionProducto: "Esta es la descripción",
  precioProducto: 50000,
  imagenesUrl: [
    "https://example.com/teclado.jpg",
    "https://example.com/teclado2.jpg",
  ],
  cantidadStockProducto: 10,
  categoria: "Periféricos",
};

describe("ProductCard Component", () => {
  const mockOnAddCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza la información del producto correctamente", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockProduct.nombreProducto)).toBeInTheDocument();
    expect(screen.getByText("$ 50000")).toBeInTheDocument();
    expect(
      screen.getByText(`Stock disponible: ${mockProduct.cantidadStockProducto}`)
    ).toBeInTheDocument();

    const img = screen.getByAltText(
      mockProduct.nombreProducto
    ) as HTMLImageElement;
    expect(img.src).toBe(mockProduct.imagenesUrl![0]);
  });

  test("debe mostrar la imagen por defecto cuando imagenesUrl es nulo o vacío", () => {
    const productWithoutImages = { ...mockProduct, imagenesUrl: [] };
    const { rerender } = render(
      <MemoryRouter>
        <ProductCard {...productWithoutImages} />
      </MemoryRouter>
    );

    const img1 = screen.getByAltText(
      productWithoutImages.nombreProducto
    ) as HTMLImageElement;
    expect(img1.src).toContain("no-image-mock.png");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productWithNullImages = { ...mockProduct, imagenesUrl: null as any };
    rerender(
      <MemoryRouter>
        <ProductCard {...productWithNullImages} />
      </MemoryRouter>
    );

    const img2 = screen.getByAltText(
      productWithNullImages.nombreProducto
    ) as HTMLImageElement;
    expect(img2.src).toContain("no-image-mock.png");
  });

  test("debe navegar a la URL del producto al hacer clic en la tarjeta (contenedor principal)", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>
    );

    const cardElement = screen.getByRole("button", {
      name: new RegExp(mockProduct.nombreProducto, "i"),
    });

    fireEvent.click(cardElement);

    expect(mockNavigate).toHaveBeenCalledWith(
      `/producto/${mockProduct.codigoProducto}`
    );
  });

  test("el clic en el botón Añadir NO debe disparar la navegación", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} onAddCart={mockOnAddCart} />
      </MemoryRouter>
    );

    const addButton = screen.getAllByTestId("add-to-cart-button")[0];

    fireEvent.click(addButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("el botón de Añadir no debe fallar si onAddCart no está definido", () => {
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} onAddCart={undefined} />
      </MemoryRouter>
    );

    const addButton = screen.getAllByTestId("add-to-cart-button")[0];

    expect(() => {
      fireEvent.click(addButton);
    }).not.toThrow();
  });
});
