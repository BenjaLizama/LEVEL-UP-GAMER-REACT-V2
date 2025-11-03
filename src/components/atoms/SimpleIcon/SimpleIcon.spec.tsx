import React from "react";
import { render, screen } from "@testing-library/react";
import SimpleIcon from "./SimpleIcon";
import { Icon } from "@iconify/react";

jest.mock("@iconify/react", () => ({
  Icon: jest.fn(({ icon, fontSize, color }) => (
    <div
      data-testid="mock-icon"
      data-icon={icon}
      data-fontsize={fontSize}
      data-color={color || "undefined"}
      style={{ fontSize: `${fontSize}px`, color: color }}
    >
      {icon}
    </div>
  )),
}));

describe("SimpleIcon", () => {
  test("renderiza el componente con las props requeridas", () => {
    const testIcon = "mdi:home";
    const testSize = 24;

    render(<SimpleIcon icon={testIcon} fontSize={testSize} />);

    expect(Icon).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: testIcon,
        fontSize: testSize,
      }),
      {}
    );

    const renderedIcon = screen.getByTestId("mock-icon");
    expect(renderedIcon).toHaveAttribute("data-icon", testIcon);
    expect(renderedIcon).toHaveAttribute("data-fontsize", String(testSize));
    expect(renderedIcon).toHaveAttribute("data-color", "undefined");
  });

  test("se renderiza con la prop color cuando se proporciona", () => {
    const testIcon = "mdi:alert";
    const testSize = 32;
    const testColor = "red";

    render(
      <SimpleIcon icon={testIcon} fontSize={testSize} color={testColor} />
    );

    expect(Icon).toHaveBeenCalledWith(
      expect.objectContaining({
        icon: testIcon,
        fontSize: testSize,
        color: testColor,
      }),
      {}
    );

    const renderedIcon = screen.getByTestId("mock-icon");
    expect(renderedIcon).toHaveAttribute("data-color", testColor);
    expect(renderedIcon).toHaveStyle(`color: ${testColor}`);
  });

  test("renderiza correctamente cuando la prop color no se proporciona", () => {
    const testIcon = "mdi:settings";
    const testSize = 16;

    render(<SimpleIcon icon={testIcon} fontSize={testSize} />);

    expect(Icon).toHaveBeenCalledWith(
      expect.not.objectContaining({
        color: expect.anything(),
      }),
      {}
    );

    const renderedIcon = screen.getByTestId("mock-icon");
    expect(renderedIcon).toHaveAttribute("data-color", "undefined");
  });
});
