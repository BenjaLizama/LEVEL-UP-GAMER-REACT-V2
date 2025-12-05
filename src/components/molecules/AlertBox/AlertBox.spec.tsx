import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TemporaryAlert, TemporaryAlertProps } from "./AlertBox";

const TRANSITION_DURATION_MS = 500;

jest.mock("./AlertBox.module.css", () => ({
  alert: "mocked-alert-class",
  visible: "mocked-visible-class",
  animateOut: "mocked-animate-out-class",
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
  durationMs: 3000,
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

  test("debería tener la clase 'visible' inmediatamente después del montaje (animación de entrada)", () => {
    render(<TemporaryAlert {...baseProps} />);
    const alertElement = screen.getByText(baseProps.message).closest("div");

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(alertElement).toHaveClass("mocked-visible-class");
    expect(alertElement).not.toHaveClass("mocked-animate-out-class");
  });

  test("debería cambiar a la clase 'animateOut' al finalizar durationMs", () => {
    const customDuration = 4000;
    const propsWithDuration = { ...baseProps, durationMs: customDuration };

    render(<TemporaryAlert {...propsWithDuration} />);
    const alertElement = screen.getByText(baseProps.message).closest("div");

    act(() => {
      jest.advanceTimersByTime(customDuration - 1);
    });
    expect(alertElement).not.toHaveClass("mocked-animate-out-class");

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(alertElement).toHaveClass("mocked-animate-out-class");
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test("debería llamar a onClose (desmontaje) DESPUÉS de durationMs + TRANSITION_DURATION_MS", () => {
    const customDuration = 2000;
    const propsWithDuration = { ...baseProps, durationMs: customDuration };

    render(<TemporaryAlert {...propsWithDuration} />);

    act(() => {
      jest.advanceTimersByTime(customDuration);
    });
    expect(mockOnClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(TRANSITION_DURATION_MS - 1);
    });
    expect(mockOnClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test("debería usar la duración por defecto (3000ms) cuando no se proporciona durationMs", () => {
    const defaultDuration = 3000;
    const totalDuration = defaultDuration + TRANSITION_DURATION_MS;

    render(<TemporaryAlert {...baseProps} durationMs={undefined} />);

    act(() => {
      jest.advanceTimersByTime(totalDuration);
    });

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
