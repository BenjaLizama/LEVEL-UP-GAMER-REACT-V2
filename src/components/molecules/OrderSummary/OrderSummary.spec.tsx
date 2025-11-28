import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import OrderSummary from "./OrderSummary";

jest.mock("./OrderSummary.module.css", () => ({
  contenedor: "mocked-contenedor",
  contenido: "mocked-contenido",
  button: "mocked-button",
}));

const mockOnPagar = jest.fn();

const baseProps = {
  total: 150.75,
  onPagar: mockOnPagar,
};

describe("OrderSummary", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("debería renderizar el total de la orden con el formato correcto", () => {
    const totalMonto = 99.5;
    render(<OrderSummary total={totalMonto} />);

    const expectedText = `Total:$${totalMonto}`;

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test('debería renderizar el texto del botón "Continuar compra"', () => {
    render(<OrderSummary {...baseProps} />);

    expect(
      screen.getByRole("button", { name: /continuar compra/i })
    ).toBeInTheDocument();
  });

  test("debería aplicar las clases CSS mockeadas correctamente", () => {
    render(<OrderSummary {...baseProps} />);

    const totalElement = screen.getByText(`Total:$${baseProps.total}`);

    const innerContent = totalElement.closest("div");

    const container = innerContent?.parentElement;

    expect(container).toHaveClass("mocked-contenedor");
    expect(innerContent).toHaveClass("mocked-contenido");

    const button = screen.getByRole("button", { name: /continuar compra/i });
    expect(button).toHaveClass("mocked-button");
  });

  test("debería llamar a la función onPagar al hacer clic en el botón", () => {
    render(<OrderSummary {...baseProps} />);

    const button = screen.getByRole("button", { name: /continuar compra/i });

    fireEvent.click(button);

    expect(mockOnPagar).toHaveBeenCalledTimes(1);
  });

  test("NO debería fallar si la prop onPagar no se proporciona (opcional)", () => {
    render(<OrderSummary total={200} onPagar={undefined} />);

    const button = screen.getByRole("button", { name: /continuar compra/i });

    expect(() => fireEvent.click(button)).not.toThrow();

    expect(mockOnPagar).not.toHaveBeenCalled();
  });
});
