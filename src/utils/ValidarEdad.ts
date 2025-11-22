export function validarEdad(dateString: string): {
  valid: boolean;
  message: string;
} {
  if (!dateString) {
    return { valid: false, message: "La fecha de nacimiento es requerida." };
  }

  const birthDate = new Date(dateString);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < 18) {
    return { valid: false, message: "Debes ser mayor de 18 años." };
  }

  if (age > 150) {
    return {
      valid: false,
      message: "La edad ingresada no es válida (máximo 150 años).",
    };
  }

  if (birthDate > today) {
    return { valid: false, message: "La fecha no puede ser en el futuro." };
  }

  return { valid: true, message: "" };
}
