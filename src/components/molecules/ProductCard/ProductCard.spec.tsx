import React from "react";
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextEncoder, TextDecoder });
import { render, screen } from "@testing-library/react";
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

interface MockIconProps {
  icon: string;
  [key: string]: unknown;
}

jest.mock("@/components/atoms/SimpleIcon/SimpleIcon", () => {
  return function MockIcon(props: MockIconProps) {
    return <span data-testid="icon-mock">{props.icon}</span>;
  };
});

const mockProduct: Producto = {
  codigoProducto: "PROD-123",
  nombreProducto: "Teclado Mecánico",
  descripcionProducto: "Esta es la descripción",
  precioProducto: 50000,
  imagenesUrl: ["https://example.com/teclado.jpg"],
  cantidadStockProducto: 10,
};

describe("ProductCard Component", () => {
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

  test("muestra la imagen correcta", () => {
    const productWithoutImage = { ...mockProduct, imagenesUrl: [] };
    render(
      <MemoryRouter>
        <ProductCard {...mockProduct} />
      </MemoryRouter>
    );

    const img = screen.getByAltText(
      productWithoutImage.nombreProducto
    ) as HTMLImageElement;
    expect(img.src).not.toContain("no-image-mock.png");
  });
});
