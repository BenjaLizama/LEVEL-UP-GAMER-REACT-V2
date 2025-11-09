import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Switch from "./Switch";

describe("Switch Component", () => {
  const mockOnToggle = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("se renderizarsa correctamente y es accesible", () => {
    render(<Switch isLightMode={false} onToggle={mockOnToggle} />);

    const toggle = screen.getByRole("checkbox", { name: /cambiar tema/i });

    expect(toggle).toBeInTheDocument();
    expect(toggle).toBeEnabled();
  });

  test("muestra el estado correcto (checked) cuando isLightMode es true", () => {
    render(<Switch isLightMode={true} onToggle={mockOnToggle} />);

    const toggle = screen.getByRole("checkbox", { name: /cambiar tema/i });
    expect(toggle).toBeChecked();
  });

  test("muestra el estado correcto (unchecked) cuando isLightMode es false", () => {
    render(<Switch isLightMode={false} onToggle={mockOnToggle} />);

    const toggle = screen.getByRole("checkbox", { name: /cambiar tema/i });
    expect(toggle).not.toBeChecked();
  });

  test("llama a onToggle cuando se hace clic", () => {
    render(<Switch isLightMode={false} onToggle={mockOnToggle} />);

    const toggle = screen.getByRole("checkbox", { name: /cambiar tema/i });

    fireEvent.click(toggle);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test("es navegable y activable por teclado", () => {
    render(<Switch isLightMode={false} onToggle={mockOnToggle} />);
    const toggle = screen.getByRole("checkbox", { name: /cambiar tema/i });

    toggle.focus();
    expect(toggle).toHaveFocus();

    fireEvent.keyDown(toggle, { key: "Space", code: "Space" });
    fireEvent.click(toggle);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });
});
