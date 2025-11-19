import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./Input";

interface SimpleIconProps {
  icon: string;
  fontSize: number;
}

jest.mock(
  "../SimpleIcon/SimpleIcon",
  () =>
    ({ icon, fontSize }: SimpleIconProps) =>
      (
        <span
          data-testid="simple-icon"
          data-icon={icon}
          data-font-size={fontSize}
        >
          {icon}
        </span>
      )
);

jest.mock("./Input.module.css", () => ({
  wrapper: "wrapper",
  label: "label",
  inputContainer: "inputContainer",
  containerIcono: "containerIcono",
  inputElement: "inputElement",
  button: "button",
  errorMessage: "errorMessage",
}));

describe("componente Input", () => {
  const mockOnValueChange = jest.fn();
  const defaultProps = {
    value: "",
    onValueChange: mockOnValueChange,
    icon: "ph:user-bold",
    id: "test-input",
    label: "Test Input Label",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza correctamente con props basicas", () => {
    render(<Input {...defaultProps} />);

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
    expect(screen.getByTestId("simple-icon")).toBeInTheDocument();
  });

  it("renderiza el valor correcto", () => {
    const testValue = "Hola Mundo";
    render(<Input {...defaultProps} value={testValue} />);

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveValue(testValue);
  });

  it("renderiza la etiqueta si se proporciona", () => {
    const testLabel = "Nombre de Usuario";
    render(<Input {...defaultProps} label={testLabel} />);

    expect(screen.getByLabelText(testLabel)).toBeInTheDocument();
    expect(screen.getByText(testLabel)).toHaveAttribute("for", "test-input");
  });

  it("no renderiza la etiqueta si no se proporciona", () => {
    render(<Input {...defaultProps} label={undefined} />);

    expect(screen.queryByText(/Test Input Label/i)).not.toBeInTheDocument();
  });

  it("renderiza el icono con las props correctas", () => {
    const testIcon = "ph:lock-bold";
    render(<Input {...defaultProps} icon={testIcon} />);

    const iconElement = screen.getByTestId("simple-icon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("data-icon", testIcon);
    expect(iconElement).toHaveAttribute("data-font-size", "20");
  });

  it("llama a onValueChange cuando el valor del input cambia", () => {
    const newValue = "nuevo valor";
    render(<Input {...defaultProps} />);

    const inputElement = screen.getByRole("textbox");

    fireEvent.change(inputElement, { target: { value: newValue } });

    expect(mockOnValueChange).toHaveBeenCalledTimes(1);
    expect(mockOnValueChange).toHaveBeenCalledWith(newValue);
  });

  it("renderiza el boton de limpiar cuando el valor no está vacio", () => {
    render(<Input {...defaultProps} value="algo" />);

    expect(
      screen.getByRole("button", { name: /Limpiar campo/i })
    ).toBeInTheDocument();

    const clearIcon = screen
      .getAllByTestId("simple-icon")
      .find(
        (iconElement) => iconElement.getAttribute("data-icon") === "ph:x-bold"
      );

    expect(clearIcon).toBeInTheDocument();
  });

  it("no renderiza el boton de limpiar cuando el valor esta vacio", () => {
    render(<Input {...defaultProps} value="" />);

    expect(
      screen.queryByRole("button", { name: /Limpiar campo/i })
    ).not.toBeInTheDocument();
  });

  it("llama a onValueChange con una cadena vacia cuando se hace clic en el botón de limpiar", () => {
    render(<Input {...defaultProps} value="algo" />);
    const clearButton = screen.getByRole("button", { name: /Limpiar campo/i });

    fireEvent.click(clearButton);

    expect(mockOnValueChange).toHaveBeenCalledTimes(1);
    expect(mockOnValueChange).toHaveBeenCalledWith("");
  });

  it("muestra el mensaje de error si se proporciona", () => {
    const errorMsg = "Campo obligatorio.";
    render(<Input {...defaultProps} errorMessage={errorMsg} />);

    const errorMessageSpan = screen.getByText(errorMsg);
    expect(errorMessageSpan).toBeInTheDocument();
  });

  it("renderiza un espacio en blanco (' ') en lugar del mensaje de error cuando no hay error", () => {
    render(<Input {...defaultProps} errorMessage={undefined} />);

    const wrapper = screen.getByRole("textbox").closest(".wrapper");

    const errorMessagePlaceholder = wrapper?.querySelector(".errorMessage");

    expect(errorMessagePlaceholder).toBeInTheDocument();
    expect(errorMessagePlaceholder!.textContent?.trim()).toBe("");
    expect(errorMessagePlaceholder!.textContent?.length).toBeGreaterThan(0);
  });

  it("pasa atributos adicionales al elemento input", () => {
    const placeholderText = "Escribe aqui";
    render(
      <Input {...defaultProps} placeholder={placeholderText} disabled={true} />
    );

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute("placeholder", placeholderText);
    expect(inputElement).toBeDisabled();
    expect(inputElement).toHaveAttribute("type", "text");
  });
});
