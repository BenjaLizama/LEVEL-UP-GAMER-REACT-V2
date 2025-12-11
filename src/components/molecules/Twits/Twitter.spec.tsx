import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TwitterEmbed from "./Twitter";

describe("TwitterEmbed Component", () => {
  const testUrl = "https://twitter.com/SpaceX/status/12345";
  const scriptUrl = "https://platform.twitter.com/widgets.js";

  beforeEach(() => {
    document.body.innerHTML = "";

    (window as any).twttr = undefined;
  });

  test("renderiza el enlace con la URL correcta y el texto de carga", () => {
    render(<TwitterEmbed twitUrl={testUrl} />);

    const link = screen.getByRole("link", { name: /..Cargando post/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", testUrl);
  });

  test("inyecta el script de Twitter si NO existe en el documento", async () => {
    expect(document.querySelector(`script[src="${scriptUrl}"]`)).toBeNull();

    render(<TwitterEmbed twitUrl={testUrl} />);
    await waitFor(() => {
      const scriptElement = document.querySelector(
        `script[src="${scriptUrl}"]`
      );
      expect(scriptElement).toBeInTheDocument();
    });

    const scriptElement = document.querySelector(`script[src="${scriptUrl}"]`);
    expect(scriptElement).toBeInTheDocument();
  });

  test("NO inyecta el script si YA existe, pero llama a twttr.widgets.load", () => {
    const fakeScript = document.createElement("script");
    fakeScript.src = scriptUrl;
    document.body.appendChild(fakeScript);

    const loadMock = jest.fn();
    (window as any).twttr = {
      widgets: {
        load: loadMock,
      },
    };

    render(<TwitterEmbed twitUrl={testUrl} />);

    const scripts = document.querySelectorAll(`script[src="${scriptUrl}"]`);
    expect(scripts.length).toBe(1);

    expect(loadMock).toHaveBeenCalledTimes(1);
  });
});
