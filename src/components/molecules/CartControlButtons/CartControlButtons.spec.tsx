import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartControlButtons from "./CartControlButtons";

describe("CartControlButtons", () => {
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnDelete = jest.fn();

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
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("debe llamar a onRemoveClick al pulsar el botón 'Disminuir cantidad'", () => {
    render(<CartControlButtons {...baseProps} />);

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

    const allButtons = screen.getAllByRole("button");
    const deleteBtn = allButtons[allButtons.length - 1];

    fireEvent.click(deleteBtn);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
