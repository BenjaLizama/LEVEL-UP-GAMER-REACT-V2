import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import HamburgerButton from "./HamburgerButton";

jest.mock("./HamburgerButton.module.css", () => ({
  hamburgerButton: "hamburgerButton",
  open: "open",
  top: "top",
  middle: "middle",
  bottom: "bottom",
}));

describe("componente HamburgerButton", () => {
  const defaultProps = {
    isOpen: false,
    onClick: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("se renderiza correctamente con los atributos de accesibilidad iniciales", () => {
    render(<HamburgerButton {...defaultProps} />);

    const button = screen.getByRole("button", { name: /menu/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-label", "Menu");
  });

  test("ejecuta la función onClick cuando es clickeado", () => {
    render(<HamburgerButton {...defaultProps} />);

    const button = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  test('debe reflejar visualmente y semánticamente el estado "abierto"', () => {
    render(<HamburgerButton isOpen={true} onClick={defaultProps.onClick} />);

    const button = screen.getByRole("button", { name: /menu/i });

    expect(button).toHaveAttribute("aria-expanded", "true");

    expect(button).toHaveClass("hamburgerButton");
    expect(button).toHaveClass("open");
  });

  test('debe reflejar visualmente y semánticamente el estado "cerrado"', () => {
    render(<HamburgerButton isOpen={false} onClick={defaultProps.onClick} />);

    const button = screen.getByRole("button", { name: /menu/i });

    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveClass("hamburgerButton");
    expect(button).not.toHaveClass("open");
  });

  test("debe tener el z-index correcto para superponerse a otros elementos", () => {
    render(<HamburgerButton {...defaultProps} />);
    const button = screen.getByRole("button", { name: /menu/i });
    expect(button).toHaveStyle({ zIndex: "1001" });
  });
});
