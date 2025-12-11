import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AdminProductEdit from "./AdminProductEdit"; // Ajusta la ruta de importación según tu estructura

// --- Mocks de Dependencias ---

// 1. Mock de la utilidad de formato de moneda (es crucial para el input de precio)
const MOCK_FORMATTED_PRICE = "$CLP 12.345";
jest.mock("@/utils/Funciones", () => ({
  formatearACLP: jest.fn((price) => {
    // Simula el formato para los tests
    return price === 12345 ? MOCK_FORMATTED_PRICE : `CLP ${price}`;
  }),
}));

// 2. Mock de componentes de átomos para simplificar los tests
jest.mock("@/components/atoms/Button/Button", () => ({
  __esModule: true,
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <button onClick={onClick} data-testid="mock-button">
      {children}
    </button>
  ),
}));

jest.mock("@/components/atoms/SimpleIcon/SimpleIcon", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ icon }: { icon: any }) => (
    <div data-testid="mock-icon">{icon}</div>
  ),
}));

// Mock de estilos (Jest los maneja por defecto, pero se incluye para claridad)
jest.mock("./AdminProductEdit.module.css", () => ({
  productEditContainer: "productEditContainer",
  titulo: "titulo",
  buttonClose: "buttonClose",
  input: "input",
  select: "select",
  textarea: "textarea",
  // ... otros estilos si son necesarios
}));

// --- Configuración de Props Base ---

const setup = (
  propsOverrides = {} as Partial<React.ComponentProps<typeof AdminProductEdit>>
) => {
  const mockProps = {
    titulo: "Editar Producto",
    nombreProducto: "Juego de Mesa Ejemplo",
    categoriaProducto: "JUEGO_MESA",
    descripcionProducto: "Una descripción genial.",
    precioProducto: 12345, // Valor que mockeamos para formatear
    imagenesURL: ["url1.jpg", "url2.jpg"],
    cantidadStockProducto: 50,
    onNombreChange: jest.fn(),
    onPrecioChange: jest.fn(),
    onStockChange: jest.fn(),
    onImagenesUrlChange: jest.fn(),
    onCategoriaChange: jest.fn(),
    onDescripcionChange: jest.fn(),
    onCancelarClick: jest.fn(),
    onAceptarClick: jest.fn(),
    ...propsOverrides,
  };

  render(<AdminProductEdit {...mockProps} />);
  return mockProps;
};

// --- Suite de Tests ---

describe("AdminProductEdit", () => {
  test("1. Renderiza el título y todos los campos del formulario", () => {
    setup();

    // Título
    expect(screen.getByText("Editar Producto")).toBeInTheDocument();

    // Inputs y Textarea (Identificación por placeholder o role/value)
    expect(
      screen.getByPlaceholderText("Nombre del producto")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Precio del producto")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: "categoria" })
    ).toBeInTheDocument();
    expect(screen.getByText("Una descripción genial.")).toBeInTheDocument(); // Contenido del textarea

    // Inputs de Stock e Imágenes (identificación menos específica, por rol o valor)
    // El input de Stock muestra el valor 50
    expect(screen.getByDisplayValue("50")).toBeInTheDocument();
    // El input de Imágenes muestra las URLs como string
    expect(screen.getByDisplayValue("url1.jpg,url2.jpg")).toBeInTheDocument();

    // Botones
    expect(screen.getByText("Aceptar")).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  test("2. Muestra los datos iniciales correctamente, incluyendo el precio formateado", () => {
    setup();

    // Nombre del producto
    expect(
      screen.getByDisplayValue("Juego de Mesa Ejemplo")
    ).toBeInTheDocument();

    // Precio formateado (verificando el mock)
    const precioInput = screen.getByPlaceholderText("Precio del producto");
    expect(precioInput).toHaveValue(MOCK_FORMATTED_PRICE);

    // Categoría seleccionada
    const categoriaSelect = screen.getByRole("combobox", { name: "categoria" });
    expect(categoriaSelect).toHaveValue("JUEGO_MESA");
  });

  // --- Tests de Interacción (Handlers) ---

  test("3. Llama al handler onNombreChange al modificar el input de nombre", () => {
    const props = setup();
    const nameInput = screen.getByPlaceholderText("Nombre del producto");
    const newName = "Nuevo Nombre";

    fireEvent.change(nameInput, { target: { value: newName } });

    expect(props.onNombreChange).toHaveBeenCalledTimes(1);
    // Opcional: verificar que se llamó con el evento correcto.
    // RTL no pasa el objeto de evento real, pero verifica que la función fue llamada.
  });

  test("4. Llama al handler onDescripcionChange al modificar el textarea", () => {
    const props = setup();
    // El textarea no tiene placeholder, lo buscamos por su valor inicial
    const descripcionTextarea = screen.getByDisplayValue(
      "Una descripción genial."
    );
    const newDescription = "Otra descripción";

    fireEvent.change(descripcionTextarea, {
      target: { value: newDescription },
    });

    expect(props.onDescripcionChange).toHaveBeenCalledTimes(1);
  });

  test("5. Llama al handler onCategoriaChange al seleccionar una nueva categoría", () => {
    const props = setup();
    const categoriaSelect = screen.getByRole("combobox", { name: "categoria" });

    // Cambiar la selección a "Categoria" (opción por defecto)
    fireEvent.change(categoriaSelect, { target: { value: "categoria" } });

    expect(props.onCategoriaChange).toHaveBeenCalledTimes(1);
    // En un test más estricto, verificaríamos que el `event.target.value` es 'categoria'
  });

  test("6. Llama a onAceptarClick al presionar el botón 'Aceptar'", () => {
    const props = setup();
    const aceptarButton = screen.getByText("Aceptar");

    fireEvent.click(aceptarButton);

    expect(props.onAceptarClick).toHaveBeenCalledTimes(1);
  });

  test("7. Llama a onCancelarClick al presionar el botón 'Cancelar' y el botón de cierre (X)", () => {
    const props = setup();
    const cancelButton = screen.getByText("Cancelar");
    // El botón de cierre no tiene texto, lo encontramos por su rol y la función asociada
    const closeButton = screen.getByRole("button", { name: /x/i });
    // Nota: El botón de cierre contiene el SimpleIcon (X), por lo que se le puede buscar por un nombre invisible/aria-label si estuviera. Si no, se puede buscar por el data-testid del mock si se le añade al botón padre. Aquí asumimos que RTL puede inferir el nombre 'X' de alguna forma. Si no funciona, se usaría un `data-testid` en el `<button className={styles.buttonClose}>`.

    // Clic en Cancelar
    fireEvent.click(cancelButton);
    expect(props.onCancelarClick).toHaveBeenCalledTimes(1);

    // Clic en el botón de cierre
    fireEvent.click(closeButton);
    expect(props.onCancelarClick).toHaveBeenCalledTimes(2);
  });

  test("8. No se lanza error si no se pasan los handlers opcionales", () => {
    const logSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    // Renderiza el componente sin pasar ninguna función opcional de prop
    render(
      <AdminProductEdit
        titulo="Test sin handlers"
        cantidadStockProducto={10}
        // Todos los demás props de handler se omiten
      />
    );

    const aceptarButton = screen.getByText("Aceptar");
    const nombreInput = screen.getByPlaceholderText("Nombre del producto");

    // Intentar interactuar con los elementos
    fireEvent.click(aceptarButton);
    fireEvent.change(nombreInput, { target: { value: "Test" } });

    // Si no hay errores en la consola (que RTL podría registrar), el test es exitoso
    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
  });
});
