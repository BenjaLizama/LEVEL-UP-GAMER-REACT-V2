import { render, screen } from "@testing-library/react";
import OptionSelectorContainer from "./OptionSelectorContainer";

const mockProps = {
  descripcion: "Ajustes de la Cuenta",
};

const setup = (props = mockProps, children: React.ReactNode = null) => {
  return render(
    <OptionSelectorContainer {...props}>{children}</OptionSelectorContainer>
  );
};

describe("OptionSelectorContainer", () => {
  test("Renderiza correctamente la descripción pasada por props", () => {
    setup();

    expect(screen.getByText(mockProps.descripcion)).toBeInTheDocument();
  });

  test("Renderiza el contenido children cuando es pasado", () => {
    const childText = "Contenido Hijo 1";
    setup(mockProps, <div>{childText}</div>);

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  test("Renderiza múltiples elementos children correctamente", () => {
    const childrenContent = (
      <>
        <div data-testid="child-1">Opción Uno</div>
        <p data-testid="child-2">Opción Dos</p>
      </>
    );

    setup(mockProps, childrenContent);

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });

  test("Renderiza correctamente cuando no se pasa la prop children", () => {
    const { container } = setup(mockProps);

    expect(screen.getByText(mockProps.descripcion)).toBeInTheDocument();

    expect(container.firstChild).toBeInTheDocument();
  });
});
