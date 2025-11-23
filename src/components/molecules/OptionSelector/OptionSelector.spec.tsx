import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import OptionSelector from "./OptionSelector";
import { LINK_EXTERNAL } from "@/utils/Icons";

interface MockSimpleIconProps {
  icon: string;
  fontSize: number;
}

jest.mock("@/components/atoms/SimpleIcon/SimpleIcon", () => {
  return function MockSimpleIcon({ icon, fontSize }: MockSimpleIconProps) {
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
  ruta: "/configuracion",
  onClick: jest.fn(),
};

const setup = (props = mockProps) => {
  return render(
    <BrowserRouter>
      <OptionSelector {...props} />
    </BrowserRouter>
  );
};

describe("OptionSelector", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Renderiza correctamente la descripción pasada por props", () => {
    setup();
    expect(screen.getByText(mockProps.descripcion)).toBeInTheDocument();
  });

  test("Renderiza el SimpleIcon dinámico con el icono y tamaño correctos", () => {
    setup();

    const dynamicIconInstances = screen.getAllByTestId("mock-simple-icon");

    const dynamicIcon = dynamicIconInstances.find(
      (element) => element.getAttribute("data-icon") === mockProps.icono
    );

    expect(dynamicIcon).toBeInTheDocument();
    expect(dynamicIcon).toHaveAttribute("data-icon", mockProps.icono);
    expect(dynamicIcon).toHaveAttribute("data-fontsize", "20");
  });

  test("Renderiza el SimpleIcon estático (flecha) con el icono y tamaño correctos", () => {
    setup();

    const staticIconInstances = screen.getAllByTestId("mock-simple-icon");

    const staticIcon = staticIconInstances.find(
      (element) => element.getAttribute("data-icon") === LINK_EXTERNAL
    );

    expect(staticIcon).toBeInTheDocument();
    expect(staticIcon).toHaveAttribute("data-icon", LINK_EXTERNAL);
    expect(staticIcon).toHaveAttribute("data-fontsize", "25");
  });

  test("Asegura que hay exactamente dos instancias de SimpleIcon renderizadas", () => {
    setup();

    const iconInstances = screen.getAllByTestId("mock-simple-icon");
    expect(iconInstances).toHaveLength(2);
  });

  test("El componente Link apunta a la ruta correcta", () => {
    setup();
    const linkElement = screen.getByRole("link");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", mockProps.ruta);
  });
});
