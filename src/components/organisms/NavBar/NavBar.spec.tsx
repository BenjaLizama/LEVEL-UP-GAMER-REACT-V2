import React from "react";
import { TextEncoder } from "util";
global.TextEncoder = TextEncoder;
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
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
  middleDesktop: "middleDesktop",
  link: "link",
  right: "right",
  logo: "logo",
}));

jest.mock("@/assets/images/Level-Up.png", () => "mock-logo.png");

describe("NavBar Component", () => {
  const mockLinks = [
    { label: "Inicio", to: "/" },
    { label: "Juegos", to: "/juegos" },
  ];

  const defaultProps = {
    isMenuOpen: false,
    onMenuToggle: jest.fn(),
    isLightMode: false,
    onThemeToggle: jest.fn(),
    links: mockLinks,
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renderiza la estructura base (logo y contenedor header)", () => {
    renderWithRouter(<NavBar {...defaultProps} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByAltText("Logo LEVEL-UP GAMER")).toBeInTheDocument();
  });

  test("renderiza correctamente los links de escritorio", () => {
    renderWithRouter(<NavBar {...defaultProps} />);

    mockLinks.forEach((link) => {
      const linkElement = screen.getByRole("link", { name: link.label });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.to);
    });
  });

  test("no renderiza links si el array está vacío", () => {
    renderWithRouter(<NavBar {...defaultProps} links={[]} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test("pasa las props correctas al HamburgerButton", () => {
    renderWithRouter(<NavBar {...defaultProps} isMenuOpen={true} />);

    const hamburgerMock = screen.getByTestId("hamburger-mock");
    expect(hamburgerMock).toHaveAttribute("data-isopen", "true");
  });

  test("ejecuta onMenuToggle cuando el HamburgerButton es clickeado", () => {
    renderWithRouter(<NavBar {...defaultProps} />);

    const hamburgerMock = screen.getByTestId("hamburger-mock");
    fireEvent.click(hamburgerMock);

    expect(defaultProps.onMenuToggle).toHaveBeenCalledTimes(1);
  });

  test("pasa las props correctas al Switch de tema", () => {
    renderWithRouter(<NavBar {...defaultProps} isLightMode={true} />);

    const switchMock = screen.getByTestId("switch-mock");
    expect(switchMock).toBeChecked();
  });

  test("ejecuta onThemeToggle cuando el Switch cambia", () => {
    renderWithRouter(<NavBar {...defaultProps} />);

    const switchMock = screen.getByTestId("switch-mock");
    fireEvent.click(switchMock);

    expect(defaultProps.onThemeToggle).toHaveBeenCalledTimes(1);
  });
});
