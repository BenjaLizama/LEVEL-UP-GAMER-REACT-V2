import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import CartItem from "./CartItem";

import styles from "../CartItem.module.css";

const defaultProps = {
  precio: "€25.99",
  nombre: "Teclado Mecánico RGB",
  cantidad: 2,
  categoria: "PERIFÉRICOS",
  idItem: "K2000",
  imagen: "http://example.com/teclado.jpg",
};

describe("CartItem", () => {
  it("debe renderizar el nombre, la categoría y el precio del producto", () => {
    render(<CartItem {...defaultProps} />);

    expect(screen.getByText(defaultProps.nombre)).toBeInTheDocument();

    expect(
      screen.getByText(`Categoria: ${defaultProps.categoria}`)
    ).toBeInTheDocument();

    expect(screen.getByText(defaultProps.precio)).toBeInTheDocument();
  });

  it("debe renderizar la imagen con la fuente correcta y texto alternativo para accesibilidad", () => {
    render(<CartItem {...defaultProps} />);

    const imageElement = screen.getByRole("img", { name: defaultProps.nombre });

    expect(imageElement).toHaveAttribute("src", defaultProps.imagen);

    expect(imageElement).toHaveAttribute("alt", defaultProps.nombre);

    expect(imageElement).toHaveAttribute("draggable", "false");
  });

  it("debe renderizar el contenido pasado a través de props.children (ej. contador de cantidad)", () => {
    const mockChildren = (
      <div data-testid="quantity-control">Controles de Cantidad</div>
    );

    render(<CartItem {...defaultProps}>{mockChildren}</CartItem>);

    expect(screen.getByTestId("quantity-control")).toBeInTheDocument();
  });

  it("debe aplicar la clase CSS Modules correcta al span que muestra el precio", () => {
    render(<CartItem {...defaultProps} />);

    const priceSpan = screen.getByText(defaultProps.precio);

    expect(priceSpan).toHaveClass(styles.precio);
  });
});
