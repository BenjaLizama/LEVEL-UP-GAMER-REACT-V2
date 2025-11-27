import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, test, describe, beforeEach } from "@jest/globals";
import ChangeProfileImage from "./ChangeProfileImage";
import "@testing-library/jest-dom";

describe("Renderizado Mínimo Esencial", () => {
  beforeEach(() => {
    render(<ChangeProfileImage />);
  });

  test('1. Debe cargar y encontrar el botón de envío "Subír imagen"', () => {
    const submitButton = screen.getByRole("button", { name: /subír imagen/i });

    expect(submitButton).not.toBeNull();
  });
});
