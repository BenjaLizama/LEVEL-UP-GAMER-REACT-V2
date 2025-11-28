import React from "react";
import { render, screen } from "@testing-library/react";
import CartItem from "./CartItem";

jest.mock("./CartItem.module.css", () => ({
  contenido: "mocked-contenido",
  item: "mocked-item",
  contenedorImg: "mocked-contenedorImg",
  imagen: "mocked-imagen",
  info: "mocked-info",
  nombreProd: "mocked-nombreProd",
  child: "mocked-child",
}));

const baseProps = {
  precio: 45.99,
  nombre: "Café premium - Colombia",
  cantidad: 2,
  idItem: "ABC-123",
  imagen: "http://example.com/cafe.jpg",
};

describe("CartItem", () => {
  test("debería renderizar el nombre, precio y cantidad del producto correctamente", () => {
    render(<CartItem {...baseProps} />);

    expect(
      screen.getByRole("heading", { level: 5, name: baseProps.nombre })
    ).toBeInTheDocument();

    expect(
      screen.getByText(`precio: $${baseProps.precio}`)
    ).toBeInTheDocument();

    expect(
      screen.getByText(`cantidad: ${baseProps.cantidad}`)
    ).toBeInTheDocument();
  });

  test("debería renderizar la imagen con la URL y el texto alternativo (alt) correctos", () => {
    render(<CartItem {...baseProps} />);

    const itemImage = screen.getByAltText(baseProps.nombre);

    expect(itemImage).toBeInTheDocument();

    expect(itemImage).toHaveAttribute("src", baseProps.imagen);

    expect(itemImage).toHaveClass("mocked-imagen");
  });

  test("debería renderizar contenido anidado (children) dentro del contenedor de control", () => {
    const mockChildContent = "Controles de ajuste";

    render(
      <CartItem {...baseProps}>
        <button>{mockChildContent}</button>
      </CartItem>
    );

    const childElement = screen.getByRole("button", { name: mockChildContent });
    expect(childElement).toBeInTheDocument();

    expect(childElement.closest("div")).toHaveClass("mocked-child");
  });

  test("debería renderizar correctamente si no se proporciona children", () => {
    const { container } = render(
      <CartItem {...baseProps} children={undefined} />
    );

    expect(screen.getByText(baseProps.nombre)).toBeInTheDocument();

    const childDiv = container.querySelector(".mocked-child");
    expect(childDiv).toBeEmptyDOMElement();
  });

  test("debería aplicar las clases CSS mockeadas a los contenedores principales", () => {
    const { container } = render(<CartItem {...baseProps} />);

    expect(container.firstChild).toHaveClass("mocked-contenido");

    const itemDiv = screen.getByText(baseProps.nombre).closest(".mocked-item");
    expect(itemDiv).toBeInTheDocument();

    const infoDiv = screen
      .getByText(`precio: $${baseProps.precio}`)
      .closest(".mocked-info");
    expect(infoDiv).toBeInTheDocument();
  });
});
