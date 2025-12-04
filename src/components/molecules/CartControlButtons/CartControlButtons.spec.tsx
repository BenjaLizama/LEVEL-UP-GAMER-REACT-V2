import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartControlButtons from "./CartControlButtons";

// 1. Mock de los íconos:
// Esto aísla el test. No queremos probar si SimpleIcon funciona (eso es otro test),
// solo queremos saber si CartControlButtons intenta renderizarlos con los props correctos.
jest.mock("@/components/atoms/SimpleIcon/SimpleIcon", () => {
  return function MockIcon({ icon }: { icon: string }) {
    return <span data-testid={`icon-${icon}`}>IconMock: {icon}</span>;
  };
});

// 2. Mock de los strings de íconos para verificar cuál se pasa
jest.mock("@/utils/Icons", () => ({
  ADD: "ADD_ICON",
  REMOVE: "REMOVE_ICON",
  TRASH: "TRASH_ICON",
}));

describe("CartControlButtons", () => {
  // Props base para reutilizar
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();
  const baseProps = {
    cantidad: 1,
    onAddClick: mockOnAdd,
    onRemoveClick: mockOnRemove,
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Limpiamos contadores de las funciones mock antes de cada test
  });

  test("debe renderizar la cantidad proporcionada", () => {
    render(<CartControlButtons {...baseProps} cantidad={10} />);
    // Buscamos texto exacto en el documento
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("debe llamar a onRemoveClick al pulsar el botón 'Disminuir cantidad'", () => {
    render(<CartControlButtons {...baseProps} />);

    // MEJORA CLAVE: Seleccionamos por su nombre accesible (aria-label)
    // Esto asegura que el test funcione aunque cambies el CSS o el orden HTML
    const removeBtn = screen.getByRole("button", {
      name: /disminuir cantidad/i,
    });

    fireEvent.click(removeBtn);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    // Verificamos que el botón contiene el ícono correcto
    expect(screen.getByTestId("icon-REMOVE_ICON")).toBeInTheDocument();
  });

  test("debe llamar a onAddClick al pulsar el botón 'Aumentar cantidad'", () => {
    render(<CartControlButtons {...baseProps} />);

    const addBtn = screen.getByRole("button", { name: /aumentar cantidad/i });

    fireEvent.click(addBtn);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("icon-ADD_ICON")).toBeInTheDocument();
  });

  test("debe renderizar el botón de eliminar (trash)", () => {
    render(<CartControlButtons {...baseProps} />);

    // Como el botón de eliminar no tiene aria-label ni texto,
    // una estrategia sólida es buscar el botón que contiene el ícono de TRASH.
    const trashIcon = screen.getByTestId("icon-TRASH_ICON");
    const trashBtn = trashIcon.closest("button");

    expect(trashBtn).toBeInTheDocument();
  });
});
