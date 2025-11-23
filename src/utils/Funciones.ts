export function formatearACLP(precio: number) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  }).format(precio);
}

export function cerrarSesion() {
  localStorage.clear();
}
