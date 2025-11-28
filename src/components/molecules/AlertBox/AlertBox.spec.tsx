import React from "react";
import { render, screen } from "@testing-library/react";
import { TemporaryAlert, TemporaryAlertProps } from "./AlertBox";

jest.mock("./AlertBox.module.css", () => ({
  alert: "mocked-alert-class",
}));

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

const mockOnClose = jest.fn();
const baseProps: TemporaryAlertProps = {
  message: "¡Operación completada con éxito!",
  type: "success",
  onClose: mockOnClose,
};

describe("TemporaryAlert", () => {
  test("debería renderizar el mensaje correcto y la clase base", () => {
    render(<TemporaryAlert {...baseProps} />);

    expect(screen.getByText(baseProps.message)).toBeInTheDocument();

    const alertElement = screen.getByText(baseProps.message).closest("div");
    expect(alertElement).toHaveClass("mocked-alert-class");
  });

  test('debería aplicar los estilos de "success" correctamente', () => {
    render(<TemporaryAlert {...baseProps} type="success" />);
    const alertElement = screen.getByText(baseProps.message).closest("div");

    expect(alertElement).toHaveStyle("background-color: #d4edda");
    expect(alertElement).toHaveStyle("color: #155724");
  });

  test('debería aplicar los estilos de "error" correctamente', () => {
    const errorProps: TemporaryAlertProps = {
      ...baseProps,
      type: "error",
      message: "¡Ha ocurrido un error!",
    };
    render(<TemporaryAlert {...errorProps} />);
    const alertElement = screen.getByText(errorProps.message).closest("div");

    expect(alertElement).toHaveStyle("background-color: #f8d7da");
    expect(alertElement).toHaveStyle("color: #721c24");
  });

  test('debería aplicar los estilos de "warning" correctamente', () => {
    const warningProps: TemporaryAlertProps = {
      ...baseProps,
      type: "warning",
      message: "¡Advertencia, revisa la información!",
    };
    render(<TemporaryAlert {...warningProps} />);
    const alertElement = screen.getByText(warningProps.message).closest("div");

    expect(alertElement).toHaveStyle("background-color: #fff3cd");
    expect(alertElement).toHaveStyle("color: #856404");
  });

  test("debería llamar a onClose después de la duración especificada (custom duration)", () => {
    const customDuration = 5000;
    const propsWithDuration = { ...baseProps, durationMs: customDuration };

    render(<TemporaryAlert {...propsWithDuration} />);

    expect(mockOnClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(customDuration - 1);
    expect(mockOnClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("debería usar la duración por defecto (3000ms) cuando no se proporciona durationMs", () => {
    const defaultDuration = 3000;

    render(<TemporaryAlert {...baseProps} durationMs={undefined} />);

    jest.advanceTimersByTime(defaultDuration - 1);
    expect(mockOnClose).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("debería limpiar el timer al desmontar el componente", () => {
    const duration = 10000;
    const { unmount } = render(
      <TemporaryAlert {...baseProps} durationMs={duration} />
    );

    unmount();

    jest.runAllTimers();

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
