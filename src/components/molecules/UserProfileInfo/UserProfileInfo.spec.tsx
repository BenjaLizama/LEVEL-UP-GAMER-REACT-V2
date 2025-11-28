const MOCK_DEFAULT_IMAGE =
  "/assets/images/defaultImages/no-profile-picture.webp";

jest.mock(
  "../../assets/images/defaultImages/no-profile-picture.webp",
  () => MOCK_DEFAULT_IMAGE
);

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserProfileInfo from "./UserProfileInfo";

const mockProps = {
  nombre: "Benjamín",
  apellido: "Rojas",
  correo: "benjamin.rojas@mail.com",
  imagenURL: "http://example.com/profile.jpg",
  onClick: jest.fn(),
};

test("1. Debería renderizar la información del usuario (nombre, apellido y correo) correctamente", () => {
  render(<UserProfileInfo {...mockProps} />);
  expect(
    screen.getByText(`${mockProps.nombre} ${mockProps.apellido}`)
  ).toBeInTheDocument();
  expect(screen.getByText(mockProps.correo)).toBeInTheDocument();
});

test("2. Debería usar la imagen de perfil proporcionada (imagenURL)", () => {
  render(<UserProfileInfo {...mockProps} />);
  const profileImage = screen.getByAltText(
    `Imagen de ${mockProps.nombre} ${mockProps.apellido}`
  );
  expect(profileImage).toBeInTheDocument();
  expect(profileImage).toHaveAttribute("src", mockProps.imagenURL);
});

test("3. Debería usar la imagen por defecto cuando imagenURL es indefinida o nula", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { imagenURL, ...propsWithoutImage } = mockProps;

  render(<UserProfileInfo {...propsWithoutImage} imagenURL={undefined} />);
  const defaultImage = screen.getByAltText(
    `Imagen de ${mockProps.nombre} ${mockProps.apellido}`
  );
  expect(defaultImage).toBeInTheDocument();
  expect(defaultImage).toHaveAttribute("src", MOCK_DEFAULT_IMAGE);
});

test("4. Debería llamar a la función onClick al hacer clic en la imagen", () => {
  render(<UserProfileInfo {...mockProps} />);
  const profileImage = screen.getByAltText(
    `Imagen de ${mockProps.nombre} ${mockProps.apellido}`
  );
  fireEvent.click(profileImage);
  expect(mockProps.onClick).toHaveBeenCalledTimes(1);
});

test("5. No debería lanzar errores si la prop onClick es opcional y no se proporciona", () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onClick, ...propsWithoutClick } = mockProps;

  expect(() => {
    render(<UserProfileInfo {...propsWithoutClick} onClick={undefined} />);
    const profileImage = screen.getByAltText(
      `Imagen de ${mockProps.nombre} ${mockProps.apellido}`
    );
    fireEvent.click(profileImage);
  }).not.toThrow();
});

test("6. Debería cambiar a la imagen por defecto si la imagenURL original falla (onError)", () => {
  render(<UserProfileInfo {...mockProps} />);

  const profileImage = screen.getByAltText(
    `Imagen de ${mockProps.nombre} ${mockProps.apellido}`
  ) as HTMLImageElement;

  expect(profileImage).toHaveAttribute("src", mockProps.imagenURL);

  fireEvent.error(profileImage);

  expect(profileImage).toHaveAttribute("src", MOCK_DEFAULT_IMAGE);

  fireEvent.error(profileImage);

  expect(profileImage).toHaveAttribute("src", MOCK_DEFAULT_IMAGE);
});
