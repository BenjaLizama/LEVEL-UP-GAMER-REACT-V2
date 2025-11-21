import "@/styles/global.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/components/pages/Home/Home";
import Store from "@/components/pages/Store/Store";
import Cart from "@/components/pages/Cart/Cart";
import Profile from "@/components/pages/Profile/Profile";

import NavBar from "@/components/organisms/NavBar/NavBar";
import FullScreenMenu, {
  NavItem,
} from "@/components/organisms/FullScreenMenu/FullScreenMenu";
import Test from "./components/pages/Test";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/SignUp/Signup";

export default function App() {
  const [modoClaro, setModoClaro] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks: NavItem[] = [
    { label: "INICIO", to: "/" },
    { label: "TIENDA", to: "/marketplace" },
    { label: "CARRITO", to: "/cart" },
    { label: "PERFIL", to: "/profile" },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("modoClaro", modoClaro);
  }, [modoClaro]);

  return (
    <div>
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

      <main style={{ minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          {/* Esto debe ser eliminado en la version final */}
          <Route path="/test" element={<Test />} />
        </Routes>
      </main>
    </div>
  );
}
