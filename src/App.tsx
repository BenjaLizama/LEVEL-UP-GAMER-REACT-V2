import "@/styles/global.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import NavBar from "@/components/organisms/NavBar/NavBar";
import FullScreenMenu, {
  NavItem,
} from "@/components/organisms/FullScreenMenu/FullScreenMenu";
// import Test from "./pages/Test";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import PaymentSuccessPage from "./pages/PaymentSucces/PaymentSucces";

export default function App() {
  // 💡 CAMBIO CLAVE: Inicialización del estado leyendo localStorage de forma síncrona
  const [modoClaro, setModoClaro] = useState(() => {
    // Esta función se ejecuta solo una vez para establecer el valor inicial.
    const savedTheme = localStorage.getItem("theme");

    // Si el tema guardado es la cadena "true", devolvemos true (modo claro).
    // Si es null, "false", o cualquier otra cosa, devolvemos false (modo oscuro por defecto).
    return savedTheme === "true";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const rutaActual = useLocation();
  const ocultarNavBarRutas = ["/login", "/register"];

  const isNavBarOculta = ocultarNavBarRutas.includes(rutaActual.pathname);

  const navLinks: NavItem[] = [
    { label: "INICIO", to: "/" },
    { label: "TIENDA", to: "/marketplace" },
    { label: "CARRITO", to: "/cart" },
    { label: "PERFIL", to: "/profile" },
  ];

  // 1. Este useEffect (anteriormente el segundo) ahora es el único.
  // Se encarga de aplicar la clase al <html> y guardar el valor en localStorage
  // CADA VEZ que el estado 'modoClaro' CAMBIA (ya sea por el toggle o la inicialización).
  useEffect(() => {
    document.documentElement.classList.toggle("modoClaro", modoClaro);
    localStorage.setItem("theme", `${modoClaro}`);
  }, [modoClaro]);

  // 💡 NOTA: El primer useEffect que tenías con dependencias [] ya no es necesario
  // porque la inicialización se maneja directamente en useState().

  return (
    <div>
      {!isNavBarOculta && (
        <>
          <NavBar
            isMenuOpen={isMenuOpen}
            onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
            isLightMode={modoClaro}
            onThemeToggle={() => setModoClaro(!modoClaro)}
            links={navLinks}
          />

          <FullScreenMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            links={navLinks}
          />
        </>
      )}

      <main style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/pago-exitoso" element={<PaymentSuccessPage />} />

          {/* Esto debe ser eliminado en la version final */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>
    </div>
  );
}
