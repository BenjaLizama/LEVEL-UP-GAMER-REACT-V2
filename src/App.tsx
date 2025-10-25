import "@/App.css";
import Home from "@/components/pages/Home";
import Marketplace from "@/components/pages/Marketplace";
import Cart from "@/components/pages/Cart";
import Profile from "@/components/pages/Profile";
import { Routes, Route } from "react-router-dom";
import Test from "./components/pages/Test";

export default function App() {
  return (
    <div>
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
