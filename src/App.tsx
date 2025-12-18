import "@/styles/global.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import NavBar from "@/components/organisms/NavBar/NavBar";
import FullScreenMenu, {
  NavItem,
} from "@/components/organisms/FullScreenMenu/FullScreenMenu";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/Signup";
import PaymentSuccessPage from "./pages/PaymentSuccess/PaymentSuccess";
// import Test from "./pages/Test";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminGuard from "./utils/AdminGuard";
import { isAdmin } from "@/utils/RoleHelper";

export default function App() {
  const [modoClaro, setModoClaro] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "true";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const rutaActual = useLocation();
  const ocultarNavBarRutas = ["/login", "/register"];

  const isNavBarOculta = ocultarNavBarRutas.includes(rutaActual.pathname);
  const admin = isAdmin();

  const navLinks: NavItem[] = [
    { label: "INICIO", to: "/" },
    { label: "TIENDA", to: "/marketplace" },
    ...(admin ? [{ label: "INVENTARIO", to: "/admin/inventario" }] : []),
    { label: "CARRITO", to: "/cart" },
    { label: "PERFIL", to: "/profile" },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("modoClaro", modoClaro);
    localStorage.setItem("theme", `${modoClaro}`);
  }, [modoClaro]);

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
          <Route
            path="/admin/inventario"
            element={
              <AdminGuard>
                <AdminDashboard />
              </AdminGuard>
            }
          />
          {/* Esto debe ser eliminado en la version final */}
          {/* <Route path="/test" element={<Test />} /> */}
        </Routes>
      </main>
    </div>
  );
}
