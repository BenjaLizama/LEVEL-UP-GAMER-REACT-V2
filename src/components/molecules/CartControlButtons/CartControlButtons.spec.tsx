// CartControlButtons.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartControlButtons from "./CartControlButtons";

// =================================================================
// MOCKING DE DEPENDENCIAS MÍNIMAS (Solo funciones de utilidad)
// =================================================================

// 💡 NOTA: Eliminamos todos los mocks de SimpleIcon, ADD, REMOVE, TRASH para evitar el Hoisting.
// El test se enfocará únicamente en la cantidad y los eventos onClick.

describe("CartControlButtons", () => {
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnDelete = jest.fn();

  // Props base completas
  const baseProps = {
    cantidad: 1,
    onAddClick: mockOnAdd,
    onRemoveClick: mockOnRemove,
    onDeleteClick: mockOnDelete,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe renderizar la cantidad proporcionada", () => {
    render(<CartControlButtons {...baseProps} cantidad={10} />);
    // Verificación de la cantidad mostrada
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  // --- Tests de Funcionalidad y Eventos ---

  test("debe llamar a onRemoveClick al pulsar el botón 'Disminuir cantidad'", () => {
    render(<CartControlButtons {...baseProps} />);

    // Seleccionamos por el nombre accesible (aria-label)
    const removeBtn = screen.getByRole("button", {
      name: /disminuir cantidad/i,
    });

    fireEvent.click(removeBtn);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  test("debe llamar a onAddClick al pulsar el botón 'Aumentar cantidad'", () => {
    render(<CartControlButtons {...baseProps} />);

    const addBtn = screen.getByRole("button", { name: /aumentar cantidad/i });

    fireEvent.click(addBtn);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
  });

  test("debe llamar a onDeleteClick al pulsar el botón de eliminar", () => {
    render(<CartControlButtons {...baseProps} />);

    // Dado que el botón de eliminar no tiene un texto único ni aria-label,
    // necesitamos un selector más específico. Si el ícono de TRASH es el tercer botón
    // en el componente (fuera del contenedor de +/-), lo seleccionamos por su onClick.
    // O buscamos el botón que no tiene aria-label (el de eliminar).

    // Estrategia segura: Buscamos todos los botones y hacemos clic en el de eliminar.
    // Asumiendo que es el último botón en el componente.
    const allButtons = screen.getAllByRole("button");
    // El botón de eliminar es el último botón en el DOM (ADD, REMOVE, DELETE)
    const deleteBtn = allButtons[allButtons.length - 1];

    fireEvent.click(deleteBtn);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
