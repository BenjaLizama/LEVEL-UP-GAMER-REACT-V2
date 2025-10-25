import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

describe("Componente Button", () => {
  test("Renderiza el children sin problemas", () => {
    render(<Button>Este es el children</Button>);
    expect(screen.getByText("Este es el children")).toBeInTheDocument();
  });

  test("Llama onClick cuando el boton es clickeado", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click aqui</Button>);

    const boton = screen.getByText("Click aqui");
    fireEvent.click(boton);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("El type del boton es 'button' por defecto", () => {
    render(<Button>Boton</Button>);

    const button = screen.getByText("Boton");
    expect(button).toHaveAttribute("type", "button");
  });

  test("El componente acepta props", () => {
    render(<Button type="submit">Boton</Button>);

    const button = screen.getByText("Boton");
    expect(button).toHaveAttribute("type", "submit");
  });

  test("applies CSS class", () => {
    render(<Button>Boton</Button>);
    const button = screen.getByText("Boton");
    expect(button).toHaveClass("button");
  });
});
