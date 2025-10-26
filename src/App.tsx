import "@/styles/global.css";
import Home from "@/components/pages/Home";
import Marketplace from "@/components/pages/Marketplace";
import Cart from "@/components/pages/Cart";
import Profile from "@/components/pages/Profile";
import { Routes, Route } from "react-router-dom";
import Test from "./components/pages/Test";
import { useEffect, useState } from "react";
import Button from "./components/atoms/Button/Button";

export default function App() {
  const [modoClaro, setModoClaro] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("modoClaro", modoClaro);
  }, [modoClaro]);

  return (
    <div>
      <Button onClick={() => setModoClaro(!modoClaro)}>
        Cambiar a {modoClaro ? "modo oscuro" : "modo claro"}
      </Button>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/marketplace" Component={Marketplace} />
        <Route path="/cart" Component={Cart} />
        <Route path="/profile" Component={Profile} />

        {/* Este archivo es solo de prueba, no debe incluirse en la version final */}
        <Route path="/test" Component={Test} />
      </Routes>
    </div>
  );
}
