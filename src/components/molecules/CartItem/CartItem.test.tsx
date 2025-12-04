import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from "./CartItem";
import { formatearACLP } from "@/utils/Funciones";

jest.mock("./CartItem.module.css", () => ({
  contenido: "mocked-contenido",
  itemContainer: "mocked-itemContainer",
  contenedorImg: "mocked-contenedorImg",
  imagen: "mocked-imagen",
  info: "mocked-info",
  nombreProd: "mocked-nombreProd",
  child: "mocked-child",
}));

const baseProps = {
  precio: formatearACLP(5000),
  nombre: "Café premium - Colombia",
  cantidad: 2,
  idItem: "ABC-123",
  imagen: "http://example.com/cafe.jpg",
};

describe("CartItem", () => {
  test("debe renderizar el nombre, precio y cantidad del producto correctamente", () => {
    render(<CartItem {...baseProps} />);

    expect(screen.getByText(baseProps.nombre)).toBeInTheDocument();

    expect(screen.getByText(/precio: \$5.000/i)).toBeInTheDocument();

    expect(
      screen.getByText(`cantidad: ${baseProps.cantidad}`)
    ).toBeInTheDocument();
  });

  test("debe renderizar la imagen con la URL y el texto alternativo (alt) correctos", () => {
    render(<CartItem {...baseProps} />);

    const itemImage = screen.getByAltText(baseProps.nombre);

    expect(itemImage).toBeInTheDocument();

    expect(itemImage).toHaveAttribute("src", baseProps.imagen);

    expect(itemImage).toHaveClass("mocked-imagen");
  });

  test("debe renderizar el contenido anidado (children)", () => {
    const mockChildContent = "Botones de control de cantidad";

    render(
      <CartItem {...baseProps}>
        <button data-testid="child-button">{mockChildContent}</button>
      </CartItem>
    );

    const childElement = screen.getByText(mockChildContent);
    expect(childElement).toBeInTheDocument();

    expect(childElement.closest("div")).toHaveClass("mocked-child");
  });

  test("debe renderizar correctamente si no se proporciona children", () => {
    const { container } = render(
      <CartItem {...baseProps} children={undefined} />
    );

    expect(screen.getByText(baseProps.nombre)).toBeInTheDocument();

    const childDiv = container.querySelector(".mocked-child");
    expect(childDiv).toBeInTheDocument();
    expect(childDiv).toBeEmptyDOMElement();
  });

  test("debe aplicar las clases CSS mockeadas a los contenedores principales", () => {
    const { container } = render(<CartItem {...baseProps} />);

    expect(container.firstChild).toHaveClass("mocked-contenido");

    const imageContainer = screen
      .getByAltText(baseProps.nombre)
      .closest(".mocked-contenedorImg");
    expect(imageContainer).toBeInTheDocument();

    const infoDiv = screen
      .getByText(`precio: $${baseProps.precio}`)
      .closest(".mocked-info");
    expect(infoDiv).toBeInTheDocument();

    const itemContainer = imageContainer?.closest(".mocked-itemContainer");
    expect(itemContainer).toBeInTheDocument();
  });
});
