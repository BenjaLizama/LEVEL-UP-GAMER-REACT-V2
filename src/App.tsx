import "@/styles/global.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/components/pages/Home";
import Marketplace from "@/components/pages/Marketplace";
import Cart from "@/components/pages/Cart";
import Profile from "@/components/pages/Profile";

import NavBar from "@/components/organisms/NavBar/NavBar";
import FullScreenMenu, {
  NavItem,
} from "@/components/organisms/FullScreenMenu/FullScreenMenu";

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
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
