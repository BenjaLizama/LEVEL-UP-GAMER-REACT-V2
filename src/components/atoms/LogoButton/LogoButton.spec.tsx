import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LogoButton from "./LogoButton";
import LOGO from "@/assets/images/Level-Up.png";

// =================================================================
//                 MOCKS
// =================================================================

// Mockear el módulo de estilos CSS
jest.mock("./LogoButton.module.css", () => ({
  container: "mocked-container",
  logo: "mocked-logo",
}));

// --- Función Auxiliar para Renderizar ---
const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <LogoButton />
    </BrowserRouter>
  );
};

// =================================================================
//                 INICIO DE LOS TESTS
// =================================================================

describe("LogoButton", () => {
  // Test 1: Verifica el renderizado básico del componente
  test("debería renderizar la imagen del logo correctamente", () => {
    renderWithRouter();
    // Buscamos por el rol img y el texto alternativo
    const logoImage = screen.getByRole("img", { name: /Logo LEVEL-UP GAMER/i });
    expect(logoImage).toBeInTheDocument();
  });

  // Test 2: Verifica el destino del enlace
  test("debería ser un enlace que apunta a la ruta raíz ('/')", () => {
    renderWithRouter();
    const linkElement = screen.getByRole("link", {
      name: /Logo LEVEL-UP GAMER/i,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  // Test 3: Verifica la fuente y el atributo de arrastre
  test("la imagen debería tener el src correcto y draggable=false", () => {
    renderWithRouter();
    const logoImage = screen.getByRole("img");

    expect(logoImage).toHaveAttribute("src", LOGO);
    expect(logoImage).toHaveAttribute("draggable", "false");
  });
});
