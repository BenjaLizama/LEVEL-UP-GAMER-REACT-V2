import React from "react";
import { TextEncoder, TextDecoder } from "util";
Object.assign(global, { TextEncoder, TextDecoder });
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import FullScreenMenu from "./FullScreenMenu";

jest.mock("./FullScreenMenu.module.css", () => ({
  menu: "menu",
  open: "open",
  nav: "nav",
  navList: "navList",
  navItem: "navItem",
  navLink: "navLink",
}));

describe("componente FullScreenMenu", () => {
  const mockLinks = [
    { label: "Inicio", to: "/" },
    { label: "Acerca de", to: "/about" },
    { label: "Contacto", to: "/contact" },
  ];
  const mockOnClose = jest.fn();

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    document.body.style.overflow = "";
  });

  test("debe renderizarse pero estar oculto accesiblmente cuando isOpen es false", () => {
    render(
      <MemoryRouter>
        <FullScreenMenu
          isOpen={false}
          onClose={mockOnClose}
          links={mockLinks}
        />
      </MemoryRouter>
    );

    const menuContainer = document.querySelector(".menu");
    expect(menuContainer).toBeInTheDocument();
    expect(menuContainer).toHaveAttribute("aria-hidden", "true");
    expect(menuContainer).not.toHaveClass("open");
  });

  test('es visible y tiene la clase "open" cuando isOpen es true', () => {
    render(
      <MemoryRouter>
        <FullScreenMenu isOpen={true} onClose={mockOnClose} links={mockLinks} />
      </MemoryRouter>
    );

    const menuContainer = document.querySelector(".menu");
    expect(menuContainer).toHaveAttribute("aria-hidden", "false");
    expect(menuContainer).toHaveClass("open");
  });

  test("renderiza la lista correcta de enlaces", () => {
    render(
      <MemoryRouter>
        <FullScreenMenu isOpen={true} onClose={mockOnClose} links={mockLinks} />
      </MemoryRouter>
    );

    const listItems = screen.getAllByRole("listitem");
    expect(listItems).toHaveLength(mockLinks.length);

    mockLinks.forEach((link) => {
      const linkElement = screen.getByRole("link", { name: link.label });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", link.to);
    });
  });

  test("ejecuta onClose cuando se hace clic en un enlace", () => {
    render(
      <MemoryRouter>
        <FullScreenMenu isOpen={true} onClose={mockOnClose} links={mockLinks} />
      </MemoryRouter>
    );

    const contactLink = screen.getByRole("link", { name: /contacto/i });
    fireEvent.click(contactLink);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("debe bloquear el scroll del body cuando el menu se abre", () => {
    render(
      <MemoryRouter>
        <FullScreenMenu isOpen={true} onClose={mockOnClose} links={mockLinks} />
      </MemoryRouter>
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  test("desbloquea el scroll del body cuando el menu se cierra", () => {
    const { rerender } = render(
      <MemoryRouter>
        <FullScreenMenu isOpen={true} onClose={mockOnClose} links={mockLinks} />
      </MemoryRouter>
    );

    expect(document.body.style.overflow).toBe("hidden");

    rerender(
      <MemoryRouter>
        <FullScreenMenu
          isOpen={false}
          onClose={mockOnClose}
          links={mockLinks}
        />
      </MemoryRouter>
    );

    expect(document.body.style.overflow).not.toBe("hidden");
  });

  test("restaura el scroll del body si el componente se desmonta estando abierto", () => {
    const { unmount } = render(
      <MemoryRouter>
        <FullScreenMenu isOpen={true} onClose={mockOnClose} links={mockLinks} />
      </MemoryRouter>
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).not.toBe("hidden");
  });
});
