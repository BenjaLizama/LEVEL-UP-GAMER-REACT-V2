import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NavBar from "./NavBar";

jest.mock("@/components/atoms/HamburguerButton/HamburgerButton", () => {
  return function MockHamburger({
    isOpen,
    onClick,
  }: {
    isOpen: boolean;
    onClick: () => void;
  }) {
    return (
      <button
        data-testid="hamburger-mock"
        data-isopen={String(isOpen)}
        onClick={onClick}
      >
        Mock Menu
      </button>
    );
  };
});

jest.mock("../../atoms/Switch/Switch", () => {
  return function MockSwitch({
    isLightMode,
    onToggle,
  }: {
    isLightMode: boolean;
    onToggle: () => void;
  }) {
    return (
      <input
        type="checkbox"
        data-testid="switch-mock"
        checked={isLightMode}
        onChange={onToggle}
      />
    );
  };
});

jest.mock("./NavBar.module.css", () => ({
  navbar: "navbar",
  left: "left",
  middle: "middle",
  right: "right",
}));

describe("NavBar Component", () => {
  const defaultProps = {
    isMenuOpen: false,
    onMenuToggle: jest.fn(),
    isLightMode: false,
    onThemeToggle: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza la estructura base (logo y contenedor header)", () => {
    render(<NavBar {...defaultProps} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText("Logo")).toBeInTheDocument();
  });

  test("pasa las props correctas al HamburgerButton", () => {
    render(<NavBar {...defaultProps} isMenuOpen={true} />);

    const hamburgerMock = screen.getByTestId("hamburger-mock");
    expect(hamburgerMock).toHaveAttribute("data-isopen", "true");
  });

  test("ejecuta onMenuToggle cuando el HamburgerButton es clickeado", () => {
    render(<NavBar {...defaultProps} />);

    const hamburgerMock = screen.getByTestId("hamburger-mock");
    fireEvent.click(hamburgerMock);

    expect(defaultProps.onMenuToggle).toHaveBeenCalledTimes(1);
  });

  test("pasa las props correctas al Switch de tema", () => {
    render(<NavBar {...defaultProps} isLightMode={true} />);

    const switchMock = screen.getByTestId("switch-mock");
    expect(switchMock).toBeChecked();
  });

  test("ejecuta onThemeToggle cuando el Switch cambia", () => {
    render(<NavBar {...defaultProps} />);

    const switchMock = screen.getByTestId("switch-mock");
    fireEvent.click(switchMock);

    expect(defaultProps.onThemeToggle).toHaveBeenCalledTimes(1);
  });
});
