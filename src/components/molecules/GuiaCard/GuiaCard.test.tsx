import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GuiaCard from "./GuiaCard"; // Asegúrate de que la ruta sea correcta

describe("GuiaCard Component", () => {
  // Definimos unos props de prueba (mock data)
  const mockProps = {
    titulo: "Título de Prueba",
    imagen: "https://via.placeholder.com/150",
    descripcion: "Esta es una descripción de prueba para el componente",
  };

  test("debe renderizar el título y la descripción correctamente", () => {
    render(<GuiaCard {...mockProps} />);

    // Buscamos el título por su texto
    // Usamos getByRole para el título para asegurarnos que es un encabezado (h1-h6)
    const tituloElement = screen.getByRole("heading", {
      level: 1,
      name: mockProps.titulo,
    });
    expect(tituloElement).toBeInTheDocument();

    // Buscamos la descripción por su texto
    const descripcionElement = screen.getByText(mockProps.descripcion);
    expect(descripcionElement).toBeInTheDocument();
  });

  test("debe renderizar la imagen con el src correcto", () => {
    render(<GuiaCard {...mockProps} />);

    // Buscamos la imagen. Como tu componente tiene alt="", getByRole('img') funciona
    // pero es considerado "decorativo".
    const imagen = document.querySelector("img");
    expect(imagen).toHaveAttribute("src", mockProps.imagen);

    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute("src", mockProps.imagen);
  });

  // Opcional: Verificar que la imagen tiene alt vacío como está en tu código actual
  test("la imagen debe tener un atributo alt vacío (decorativo)", () => {
    render(<GuiaCard {...mockProps} />);
    const imagenElement = document.querySelector("img");
    expect(imagenElement).toHaveAttribute("alt", "");
  });
});
