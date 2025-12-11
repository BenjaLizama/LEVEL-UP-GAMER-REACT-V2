import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductAdminCard from "./ProductAdminCard";
import { Producto } from "@/models/Producto";

jest.mock("@/utils/Funciones", () => ({
  formatearACLP: (precio: number) => `$ ${precio.toLocaleString("es-CL")}`,
}));

const NO_IMAGE = "no-product-image.png";
jest.mock(
  "@/assets/images/defaultImages/no-product-image.png",
  () => "no-product-image.png"
);

// Mock de SimpleIcon
jest.mock("@/components/atoms/SimpleIcon/SimpleIcon", () => ({
  __esModule: true,
  default: ({ icon }: { icon: string; fontSize: number }) => (
    <div data-testid="simple-icon" data-icon-type={icon}>
      Icon: {icon}
    </div>
  ),
}));

const mockProduct: Producto = {
  codigoProducto: "PROD001",
  nombreProducto: "Monitor Curvo Ultra HD",
  precioProducto: 520000,
  cantidadStockProducto: 22,
  imagenesUrl: ["http://example.com/monitor.jpg"],
  descripcionProducto: "Descripción del monitor",
  categoria: "Tecnología",
};

const mockProductWithoutImage: Producto = {
  ...mockProduct,
  codigoProducto: "PROD002",
  nombreProducto: "Silla Ergonómica",
  precioProducto: 120000,
  cantidadStockProducto: 5,
  imagenesUrl: [],
};

describe("ProductAdminCard", () => {
  it("debe renderizar correctamente el nombre, precio y stock del producto", () => {
    render(<ProductAdminCard {...mockProduct} />);

    expect(screen.getByText("Monitor Curvo Ultra HD")).toBeInTheDocument();

    expect(screen.getByText("$ 520.000")).toBeInTheDocument();

    expect(screen.getByText("Stock disponible: 22")).toBeInTheDocument();
  });

  it("debe mostrar la primera imagen de la lista si está disponible", () => {
    render(<ProductAdminCard {...mockProduct} />);

    const image = screen.getByAltText("Monitor Curvo Ultra HD");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "http://example.com/monitor.jpg");
  });

  it("debe mostrar la imagen por defecto cuando imagenesUrl está vacío", () => {
    render(<ProductAdminCard {...mockProductWithoutImage} />);

    const image = screen.getByAltText("Silla Ergonómica");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", NO_IMAGE);
  });

  it("debe llamar a onProductClick cuando se hace clic en el área principal de la tarjeta", () => {
    const handleProductClick = jest.fn();
    render(
      <ProductAdminCard {...mockProduct} onProductClick={handleProductClick} />
    );

    const cardElement = screen.getByRole("button", {
      name: /monitor curvo ultra hd/i,
    });

    fireEvent.click(cardElement);

    expect(handleProductClick).toHaveBeenCalledTimes(1);
  });

  it("debe llamar a onEditClick al hacer clic en el botón con el ícono de edición", () => {
    const handleEditClick = jest.fn();
    render(<ProductAdminCard {...mockProduct} onEditClick={handleEditClick} />);

    const editIcon = screen.getByTestId("simple-icon");
    const editButton = editIcon.closest("button");

    expect(editButton).toBeInTheDocument();
    if (editButton) {
      fireEvent.click(editButton);
      expect(handleEditClick).toHaveBeenCalledTimes(1);
    }
  });

  it("debe llamar a onCheckboxClick al hacer clic en el checkbox", () => {
    const handleCheckboxClick = jest.fn();
    render(
      <ProductAdminCard
        {...mockProduct}
        onCheckboxClick={handleCheckboxClick}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "" });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("id", "PROD001");

    fireEvent.click(checkbox);

    expect(handleCheckboxClick).toHaveBeenCalledTimes(1);
  });

  it("no debe llamar a onProductClick al hacer clic en el botón de edición", () => {
    const handleProductClick = jest.fn();
    const handleEditClick = jest.fn();

    render(
      <ProductAdminCard
        {...mockProduct}
        onProductClick={handleProductClick}
        onEditClick={handleEditClick}
      />
    );

    const editIcon = screen.getByTestId("simple-icon");
    const editButton = editIcon.closest("button");

    if (editButton) {
      fireEvent.click(editButton);
      expect(handleEditClick).toHaveBeenCalledTimes(1);
      expect(handleProductClick).not.toHaveBeenCalled();
    }
  });

  it("no debe llamar a onProductClick al hacer clic en el checkbox", () => {
    const handleProductClick = jest.fn();
    const handleCheckboxClick = jest.fn();

    render(
      <ProductAdminCard
        {...mockProduct}
        onProductClick={handleProductClick}
        onCheckboxClick={handleCheckboxClick}
      />
    );

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(handleCheckboxClick).toHaveBeenCalledTimes(1);
    expect(handleProductClick).not.toHaveBeenCalled();
  });
});
