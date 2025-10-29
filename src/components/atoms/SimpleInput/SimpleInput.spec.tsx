import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import SimpleInput from "./SimpleInput";
import { InputType } from "./SimpleInput.types";

jest.mock("./SimpleInput.module.css", () => ({
  input: "mocked-input-class",
}));

describe("SimpleInput Component", () => {
  const defaultProps = {
    value: "",
    type: InputType.Text,
    onChange: jest.fn(),
  };

  it("should render correctly with default props", () => {
    render(<SimpleInput {...defaultProps} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("");
  });

  it("should render with the correct initial value", () => {
    render(<SimpleInput {...defaultProps} value="Hola" />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveValue("Hola");
    expect(screen.getByDisplayValue("Hola")).toBeInTheDocument();
  });

  it("should call onChange when the user types", async () => {
    const mockOnChange = jest.fn();

    const StatefulSimpleInput = () => {
      const [value, setValue] = useState("");

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        mockOnChange(e);
      };

      return (
        <SimpleInput
          onChange={handleChange}
          type={InputType.Text}
          value={value}
        />
      );
    };

    render(<StatefulSimpleInput />);
    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveValue("");

    await userEvent.type(inputElement, "test");

    expect(inputElement).toHaveValue("test");

    expect(mockOnChange).toHaveBeenCalledTimes(4);
    const lastCallEvent = mockOnChange.mock.calls[3][0];
    expect(lastCallEvent.target.value).toBe("test");
  });

  it("should render with a placeholder", () => {
    render(<SimpleInput {...defaultProps} placeholder="Escribe aquí" />);

    const inputElement = screen.getByPlaceholderText("Escribe aquí");
    expect(inputElement).toBeInTheDocument();
  });

  it("should be disabled when disabled prop is true", () => {
    render(<SimpleInput {...defaultProps} disabled={true} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeDisabled();
  });

  it("should apply the correct input type (e.g., password)", () => {
    render(<SimpleInput {...defaultProps} type={InputType.Password} />);

    const inputElement = document.querySelector('input[type="password"]');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "password");
  });

  it("should merge internal module className with external className prop", () => {
    render(<SimpleInput {...defaultProps} className="mi-clase-externa" />);

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveClass("mocked-input-class");
    expect(inputElement).toHaveClass("mi-clase-externa");
  });
});
