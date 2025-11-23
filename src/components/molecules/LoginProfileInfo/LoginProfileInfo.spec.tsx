import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import LoginProfileInfo from "./LoginProfileInfo";
import { USER } from "@/utils/Icons";

interface SimpleIconProps {
  icon: string;
  fontSize: number;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("@/components/atoms/SimpleIcon/SimpleIcon", () => {
  return function MockSimpleIcon({ icon, fontSize }: SimpleIconProps) {
    return (
      <div
        data-testid="mock-simple-icon"
        data-icon={icon}
        data-fontsize={fontSize}
      >
        Icono Mock
      </div>
    );
  };
});

jest.mock("@/components/atoms/Button/Button", () => {
  return function MockButton({ children, onClick }: ButtonProps) {
    return (
      <button onClick={onClick} data-testid="mock-button">
        {children}
      </button>
    );
  };
});

const setup = () => {
  return render(
    <MemoryRouter>
      <LoginProfileInfo />
    </MemoryRouter>
  );
};

describe("LoginProfileInfo", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renderiza correctamente y muestra los textos esperados", () => {
    setup();

    expect(screen.getByText("¡Bienvenido!")).toBeInTheDocument();

    expect(
      screen.getByText(
        "¡Los usuarios que han iniciado sesión pueden hacer más!"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Iniciar sesión/i })
    ).toBeInTheDocument();
  });

  test("Renderiza SimpleIcon con las props correctas", () => {
    setup();

    const iconElement = screen.getByTestId("mock-simple-icon");

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("data-icon", USER);
    expect(iconElement).toHaveAttribute("data-fontsize", "150");
  });

  test("Al hacer clic en el botón 'Iniciar sesión', navega a la ruta /login", () => {
    setup();

    const loginButton = screen.getByRole("button", { name: /Iniciar sesión/i });

    fireEvent.click(loginButton);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
