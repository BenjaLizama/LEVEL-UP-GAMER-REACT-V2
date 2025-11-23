import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GuiaCard from "./GuiaCard";

describe("GuiaCard Component", () => {
  const mockProps = {
    titulo: "Título de Prueba",
    imagen: "https://via.placeholder.com/150",
    descripcion: "Esta es una descripción de prueba para el componente",
  };

  test("debe renderizar el título y la descripción correctamente", () => {
    render(<GuiaCard {...mockProps} />);

    const tituloElement = screen.getByRole("heading", {
      level: 1,
      name: mockProps.titulo,
    });
    expect(tituloElement).toBeInTheDocument();

    const descripcionElement = screen.getByText(mockProps.descripcion);
    expect(descripcionElement).toBeInTheDocument();
  });

  test("debe renderizar la imagen con el src correcto", () => {
    render(<GuiaCard {...mockProps} />);

    const imagen = document.querySelector("img");
    expect(imagen).toHaveAttribute("src", mockProps.imagen);

    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute("src", mockProps.imagen);
  });

  test("la imagen debe tener un atributo alt vacío (decorativo)", () => {
    render(<GuiaCard {...mockProps} />);
    const imagenElement = document.querySelector("img");
    expect(imagenElement).toHaveAttribute("alt", "");
  });
});
