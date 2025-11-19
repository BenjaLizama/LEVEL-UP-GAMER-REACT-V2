import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Empty from "./Empty";

jest.mock("../EmptyCart/Empty.module.css", () => ({
  contenedor: "contenedor",
  contenido: "contenido",
  contPrincipal: "contPrincipal",
}));

describe("componente Empty", () => {
  const defaultProps = {
    descripcion: "No se encontraron resultados.",
    icono: <span data-testid="mock-icon">🛒</span>,
  };

  it("renderiza correctamente con la descripcion y el icono", () => {
    render(<Empty {...defaultProps} />);

    expect(screen.getByText(defaultProps.descripcion)).toBeInTheDocument();

    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("renderiza children si se proporciona", () => {
    const childText = "¡Añade algunos productos ahora!";
    const mockButton = <button data-testid="action-button">{childText}</button>;

    render(<Empty {...defaultProps}>{mockButton}</Empty>);

    const buttonElement = screen.getByTestId("action-button");
    expect(buttonElement).toBeInTheDocument();
    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it("renderiza correctamente cuando no se proporciona contenido hijo", () => {
    const { container } = render(
      <Empty {...defaultProps} children={undefined} />
    );

    expect(screen.getByText(defaultProps.descripcion)).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.textContent).not.toContain("Botón de Acción");
  });

  it("aplica las clases CSS correctas", () => {
    const { container } = render(<Empty {...defaultProps} />);

    expect(container.firstChild).toHaveClass("contenedor");

    const contenidoDiv = container.querySelector(".contenido");
    expect(contenidoDiv).toBeInTheDocument();
    expect(contenidoDiv).toHaveClass("contenido");

    const contPrincipalDiv = container.querySelector(".contPrincipal");
    expect(contPrincipalDiv).toBeInTheDocument();
    expect(contPrincipalDiv).toHaveClass("contPrincipal");
  });
});
