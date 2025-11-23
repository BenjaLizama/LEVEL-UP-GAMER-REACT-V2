import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import LogoButton from "./LogoButton";
import LOGO from "@/assets/images/Level-Up.png";

jest.mock("./LogoButton.module.css", () => ({
  container: "mocked-container",
  logo: "mocked-logo",
}));

const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <LogoButton />
    </BrowserRouter>
  );
};

describe("LogoButton", () => {
  test("debería renderizar la imagen del logo correctamente", () => {
    renderWithRouter();
    const logoImage = screen.getByRole("img", { name: /Logo LEVEL-UP GAMER/i });
    expect(logoImage).toBeInTheDocument();
  });

  test("debería ser un enlace que apunta a la ruta raíz ('/')", () => {
    renderWithRouter();
    const linkElement = screen.getByRole("link", {
      name: /Logo LEVEL-UP GAMER/i,
    });

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  test("la imagen debería tener el src correcto y draggable=false", () => {
    renderWithRouter();
    const logoImage = screen.getByRole("img");

    expect(logoImage).toHaveAttribute("src", LOGO);
    expect(logoImage).toHaveAttribute("draggable", "false");
  });
});
