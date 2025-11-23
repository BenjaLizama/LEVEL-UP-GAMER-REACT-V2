import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateSelector from "./DateSelector";

jest.mock("./DateSelector.module.css", () => ({
  wrapper: "mocked-wrapper",
  label: "mocked-label",
  inputContainer: "mocked-input-container",
  dateComponent: "mocked-date-component",
  errorMessage: "mocked-error-message",
}));

const defaultProps = {
  value: "2023-10-26",
  onValueChange: jest.fn(),
  id: "test-date-input",
};

describe("DateSelector", () => {
  test("debería renderizar el input con el valor inicial proporcionado", () => {
    render(<DateSelector {...defaultProps} />);
    const dateInput = screen.getByDisplayValue(defaultProps.value);
    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute("type", "date");
  });

  test("debería renderizar el label si se proporciona, y estar correctamente asociado al input", () => {
    const testLabel = "Fecha de Nacimiento";
    render(<DateSelector {...defaultProps} label={testLabel} />);

    const labelElement = screen.getByText(testLabel);
    expect(labelElement).toBeInTheDocument();

    const inputByLabel = screen.getByLabelText(testLabel);
    expect(inputByLabel).toBeInTheDocument();
  });

  test("debería llamar a 'onValueChange' con el nuevo valor cuando el usuario cambia el input", () => {
    defaultProps.onValueChange.mockClear();
    render(<DateSelector {...defaultProps} />);

    const dateInput = screen.getByDisplayValue(defaultProps.value);
    const newDate = "2024-01-15";

    fireEvent.change(dateInput, { target: { value: newDate } });

    expect(defaultProps.onValueChange).toHaveBeenCalledTimes(1);
    expect(defaultProps.onValueChange).toHaveBeenCalledWith(newDate);
  });

  test("debería mostrar el mensaje de error si se proporciona 'errorMessage'", () => {
    const errorText = "La fecha no puede ser en el futuro";
    render(<DateSelector {...defaultProps} errorMessage={errorText} />);

    const errorMessageElement = screen.getByText(errorText);
    expect(errorMessageElement).toBeInTheDocument();
  });

  test("debería mostrar el span de error, pero sin texto visible, si errorMessage es undefined", () => {
    render(<DateSelector {...defaultProps} errorMessage={undefined} />);

    const errorSpan = screen.getByText((content, element) => {
      const elementClassName = element?.className ?? "";

      const isErrorMessageSpan = elementClassName.includes(
        "mocked-error-message"
      );
      const contentIsBlank = content.trim() === "";

      return isErrorMessageSpan && contentIsBlank;
    });

    expect(errorSpan).toBeInTheDocument();
  });

  test("debería propagar props nativas al elemento input (e.g., 'min')", () => {
    render(
      <DateSelector
        {...defaultProps}
        min="2023-01-01"
        data-testid="date-input-element"
      />
    );

    const dateInput = screen.getByTestId("date-input-element");

    expect(dateInput).toHaveAttribute("min", "2023-01-01");
  });
});
