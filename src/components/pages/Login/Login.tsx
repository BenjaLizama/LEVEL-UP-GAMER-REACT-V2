import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { EMAIL, KEY } from "@/utils/Icons";
import axios from "axios";
import { LoginDTO } from "@/models/dto/LoginDTO";
import { usuarioService } from "@/services/UsuarioService";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
    if (emailError) setEmailError("");
  };

  const handlePassChange = (newValue: string) => {
    setPass(newValue);
    if (passError) setPassError("");
  };

  const validateForm = (): boolean => {
    let isValid = true;

    setEmailError("");
    setPassError("");

    if (!email) {
      setEmailError("El correo es obligatorio");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Por favor, introduce un correo válido");
      isValid = false;
    }

    if (!pass) {
      setPassError("La contraseña es obligatoria");
      isValid = false;
    } else if (pass.length < 6) {
      setPassError("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const credenciales: LoginDTO = {
      correo: email,
      contrasena: pass,
    };

    try {
      const usuarioLogeado = await usuarioService.login(credenciales);

      console.log("Usuario logeado con exito ✅: ", usuarioLogeado);

      if (usuarioLogeado.token) {
        localStorage.setItem("authToken", usuarioLogeado.token);
      }

      if (usuarioLogeado.idUsuario) {
        localStorage.setItem("idUsuario", String(usuarioLogeado.idUsuario));
      }

      navigate("/");
    } catch (error: unknown) {
      console.error("Error en la API durante el login: ", error);

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          setApiError(
            "Correo o contraseña incorrectos. Por favor, inténtalo de nuevo."
          );
        } else {
          setApiError(
            "Ocurrió un error inesperado al intentar iniciar sesión."
          );
        }
      } else {
        setApiError(
          "No se pudo conectar con el servidor. Verifica tu conexión."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Acceder</h2>
        <Input
          id="login-email"
          label="Correo electrónico"
          value={email}
          onValueChange={handleEmailChange}
          placeholder="tucorreo@ejemplo.com"
          icon={EMAIL}
          errorMessage={emailError}
          className={emailError ? styles.error : ""}
        />

        <Input
          id="login-pass"
          label="Contraseña"
          value={pass}
          onValueChange={handlePassChange}
          placeholder="Contraseña"
          icon={KEY}
          type="password"
          errorMessage={passError}
          className={passError ? styles.error : ""}
        />

        <p>
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
        </p>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Cargando..." : "Acceder"}
        </Button>

        <p>{apiError}</p>
      </form>
    </div>
  );
}
