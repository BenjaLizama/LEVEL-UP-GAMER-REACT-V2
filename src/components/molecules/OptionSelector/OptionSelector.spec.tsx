import { render, screen } from "@testing-library/react";
import OptionSelector from "./OptionSelector";
import { LINK_EXTERNAL } from "@/utils/Icons";

interface SimpleIconProps {
  icon: string;
  fontSize: number;
}

jest.mock("@/components/atoms/SimpleIcon/SimpleIcon", () => {
  return function MockSimpleIcon({ icon, fontSize }: SimpleIconProps) {
    return (
      <div
        data-testid="mock-simple-icon"
        data-icon={icon}
        data-fontsize={fontSize}
        className={`icon-${icon}`}
      >
        Mock Icono {icon}
      </div>
    );
  };
});

const mockProps = {
  icono: "TEST_ICONO_DINAMICO",
  descripcion: "Seleccionar idioma o región",
};

const setup = (props = mockProps) => {
  return render(<OptionSelector {...props} />);
};

describe("OptionSelector", () => {
  test("Renderiza correctamente la descripción pasada por props", () => {
    setup();

    expect(screen.getByText(mockProps.descripcion)).toBeInTheDocument();
  });

  test("Renderiza el SimpleIcon dinámico con el icono y tamaño correctos", () => {
    setup();

    const dynamicIcon = screen.getByText(`Mock Icono ${mockProps.icono}`);

    expect(dynamicIcon).toBeInTheDocument();

    expect(dynamicIcon).toHaveAttribute("data-icon", mockProps.icono);
    expect(dynamicIcon).toHaveAttribute("data-fontsize", "20");
  });

  test("Renderiza el SimpleIcon estático (flecha) con el icono y tamaño correctos", () => {
    setup();

    const staticIcon = screen.getByText(`Mock Icono ${LINK_EXTERNAL}`);

    expect(staticIcon).toBeInTheDocument();

    expect(staticIcon).toHaveAttribute("data-icon", LINK_EXTERNAL);
    expect(staticIcon).toHaveAttribute("data-fontsize", "25");
  });

  test("Asegura que hay exactamente dos instancias de SimpleIcon renderizadas", () => {
    setup();

    const iconInstances = screen.getAllByTestId("mock-simple-icon");
    expect(iconInstances).toHaveLength(2);
  });
});
