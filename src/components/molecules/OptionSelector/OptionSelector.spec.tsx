import { render, screen } from "@testing-library/react";
import OptionSelector from "./OptionSelector";
import { LINK_EXTERNAL } from "@/utils/Icons";

// --- Tipos para Mocks ---
// Definimos los tipos para las props de SimpleIcon para satisfacer TypeScript (TS7031)
interface SimpleIconProps {
  icon: string;
  fontSize: number;
}

// --- Mocks ---

// Mock del componente SimpleIcon para aislar OptionSelector y verificar las props que recibe.
jest.mock("@/components/atoms/SimpleIcon/SimpleIcon", () => {
  return function MockSimpleIcon({ icon, fontSize }: SimpleIconProps) {
    return (
      // Usamos un data-testid único y pasamos las props como atributos de datos para la verificación
      <div
        data-testid="mock-simple-icon"
        data-icon={icon}
        data-fontsize={fontSize}
        className={`icon-${icon}`} // Agregamos una clase para distinguir mejor en los queries
      >
        Mock Icono {icon}
      </div>
    );
  };
});

// --- Configuración de Props y Renderizado ---

const mockProps = {
  icono: "TEST_ICONO_DINAMICO", // Un string de ejemplo para el ícono de entrada
  descripcion: "Seleccionar idioma o región",
};

const setup = (props = mockProps) => {
  return render(<OptionSelector {...props} />);
};

// --- Conjunto de Tests ---

describe("OptionSelector", () => {
  test("1. Renderiza correctamente la descripción pasada por props", () => {
    setup();

    // Verificamos que el texto de la descripción esté en el documento
    expect(screen.getByText(mockProps.descripcion)).toBeInTheDocument();
  });

  test("2. Renderiza el SimpleIcon dinámico con el icono y tamaño correctos", () => {
    setup();

    // 1. Verificar el ícono dinámico (`icono` prop)
    // Buscamos el mock del ícono por su clase y verificamos sus atributos de datos
    const dynamicIcon = screen.getByText(`Mock Icono ${mockProps.icono}`);

    expect(dynamicIcon).toBeInTheDocument();

    // El tamaño (fontSize) para el ícono de la opción debe ser 20
    expect(dynamicIcon).toHaveAttribute("data-icon", mockProps.icono);
    expect(dynamicIcon).toHaveAttribute("data-fontsize", "20");
  });

  test("3. Renderiza el SimpleIcon estático (flecha) con el icono y tamaño correctos", () => {
    setup();

    // 2. Verificar el ícono estático (LINK_EXTERNAL)
    // Usamos LINK_EXTERNAL para buscar el mock del ícono de la flecha
    const staticIcon = screen.getByText(`Mock Icono ${LINK_EXTERNAL}`);

    expect(staticIcon).toBeInTheDocument();

    // El tamaño (fontSize) para el ícono de la flecha debe ser 25
    expect(staticIcon).toHaveAttribute("data-icon", LINK_EXTERNAL);
    expect(staticIcon).toHaveAttribute("data-fontsize", "25");
  });

  test("4. Asegura que hay exactamente dos instancias de SimpleIcon renderizadas", () => {
    setup();

    // Verificamos que el mock se llamó exactamente dos veces
    const iconInstances = screen.getAllByTestId("mock-simple-icon");
    expect(iconInstances).toHaveLength(2);
  });
});
