import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryFilter from "./CategoryFilter";
import { Categoria } from "@/models/Categoria";

const mockCategories: Categoria[] = [
  { id: 1, value: "Electrónica", nombreVisible: "Electrónica" },
  { id: 2, value: "Ropa", nombreVisible: "Ropa" },
  { id: 3, value: "Hogar", nombreVisible: "Hogar" },
];

const mockOnCategoriaChange = jest.fn();

describe("componente CategoryFilter", () => {
  beforeEach(() => {
    mockOnCategoriaChange.mockClear();
  });

  test('renderiza todas las categorias y la opción "Todas"', () => {
    render(
      <CategoryFilter
        categorias={mockCategories}
        categoriaSeleccionada=""
        onCategoriaChange={mockOnCategoriaChange}
      />
    );

    const selectElement = screen.getByLabelText("Filtrar por categoria");
    expect(selectElement).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);

    expect(
      screen.getByRole("option", { name: "Todas las categorias" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Electrónica" })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Ropa" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Hogar" })).toBeInTheDocument();
  });

  test("muestra la categoria seleccionada pasada por props", () => {
    render(
      <CategoryFilter
        categorias={mockCategories}
        categoriaSeleccionada="2" // ID de 'Ropa'
        onCategoriaChange={mockOnCategoriaChange}
      />
    );

    const selectElement = screen.getByLabelText("Filtrar por categoria");
    expect(selectElement).toHaveValue("2");

    expect(
      (screen.getByRole("option", { name: "Ropa" }) as HTMLOptionElement)
        .selected
    ).toBe(true);

    expect(
      (screen.getByRole("option", { name: "Electrónica" }) as HTMLOptionElement)
        .selected
    ).toBe(false);
  });

  test("llama a onCategoriaChange con el ID correcto cuando el usuario selecciona una opcion", async () => {
    const user = userEvent.setup();

    render(
      <CategoryFilter
        categorias={mockCategories}
        categoriaSeleccionada=""
        onCategoriaChange={mockOnCategoriaChange}
      />
    );

    const selectElement = screen.getByLabelText("Filtrar por categoria");

    await user.selectOptions(selectElement, "1");

    expect(mockOnCategoriaChange).toHaveBeenCalledTimes(1);
    expect(mockOnCategoriaChange).toHaveBeenCalledWith("1");

    await user.selectOptions(selectElement, "");

    expect(mockOnCategoriaChange).toHaveBeenCalledTimes(2);
    expect(mockOnCategoriaChange).toHaveBeenLastCalledWith("");
  });
});
