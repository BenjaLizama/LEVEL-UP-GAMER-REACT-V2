import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import axios from "axios";
import { EMAIL, KEY, USER } from "@/utils/Icons";
import LogoButton from "@/components/atoms/LogoButton/LogoButton";
import { SignupDTO } from "@/models/dto/SignupDTO";
import { usuarioService } from "@/services/UsuarioService";
import DateSelector from "@/components/atoms/DateSelector/DateSelector";
import { validarEdad } from "@/utils/ValidarEdad";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [nombreUsuario, setNombreUsuario] = useState<string>("");
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [edad, setEdad] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");
  const [confirmPassError, setConfirmPassError] = useState<string>("");
  const [nombreUsuarioError, setNombreUsuarioError] = useState<string>("");
  const [nombreError, setNombreError] = useState<string>("");
  const [apellidoError, setApellidoError] = useState<string>("");
  const [edadError, setEdadError] = useState<string>("");

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

  const handleConfirmPassChange = (newValue: string) => {
    setConfirmPass(newValue);
    if (passError) setConfirmPassError("");
  };

  const handleNombreUsuarioChange = (newValue: string) => {
    setNombreUsuario(newValue);
    if (nombreUsuarioError) setNombreUsuarioError("");
  };

  const handleNombreChange = (newValue: string) => {
    setNombre(newValue);
    if (nombreError) setNombreError("");
  };

  const handleApellidoChange = (newValue: string) => {
    setApellido(newValue);
    if (apellidoError) setApellidoError("");
  };

  const handleEdadChange = (newValue: string) => {
    setEdad(newValue);
    if (edadError) setEdadError("");

    const validationResult = validarEdad(newValue);
    if (!validationResult.valid) {
      setEdadError(validationResult.message);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    setEmailError("");
    setPassError("");
    setConfirmPassError("");
    setNombreUsuarioError("");
    setNombreError("");
    setApellidoError("");
    setEdadError("");

    if (!nombreUsuario || nombreUsuario.length <= 2) {
      setNombreUsuarioError(
        "El nombre de usuario debe contener al menos 3 caracteres"
      );
      isValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Introduce un correo válido");
      isValid = false;
    }

    if (!pass || pass.length < 6) {
      setPassError("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    }

    if (confirmPass !== pass) {
      setConfirmPassError("Las contraseñas no coinciden");
      isValid = false;
    }

    if (confirmPass.length <= 0) {
      setConfirmPassError("La contraseña no puede estar vacía");
      isValid = false;
    }

    if (!nombre) {
      setNombreError("El nombre es obligatorio");
      isValid = false;
    }

    if (!apellido) {
      setApellidoError("El apellido es obligatorio");
      isValid = false;
    }

    if (!edad) {
      setEdadError("Debes ingresar una edad");
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

    const nuevoUsuario: SignupDTO = {
      nombreUsuario: nombreUsuario,
      nombre: nombre,
      apellido: apellido,
      correo: email,
      fechaNacimiento: edad,
      contrasena: pass,
    };

    try {
      const usuarioGuardado = await usuarioService.signup(nuevoUsuario);

      if (usuarioGuardado.token) {
        localStorage.setItem("authToken", usuarioGuardado.token);
      }

      if (usuarioGuardado.idUsuario) {
        localStorage.setItem("idUsuario", String(usuarioGuardado.idUsuario));
      }

      if (usuarioGuardado.nombre) {
        localStorage.setItem("nombre", String(usuarioGuardado.nombre));
      }

      if (usuarioGuardado.apellido) {
        localStorage.setItem("apellido", String(usuarioGuardado.apellido));
      }

      if (usuarioGuardado.correo) {
        localStorage.setItem("correo", String(usuarioGuardado.correo));
      }

      if (usuarioGuardado.imagenPerfilURL) {
        localStorage.setItem(
          "imagenPerfil",
          String(usuarioGuardado.imagenPerfilURL)
        );
      }

      alert(`¡Registro exitoso! Usuario: ${usuarioGuardado.nombre}`);
      navigate("/");
    } catch (error: unknown) {
      console.error("Error en la API durante el registro: ", error);

      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          setApiError(
            "El correo o nombre de usuario ya se encuentra registrado."
          );
        } else {
          setApiError("Ocurrió un error inesperado al intentar registrarse.");
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
        <div className={styles.logoContainer}>
          <LogoButton />
        </div>
        <h2>Crear Cuenta</h2>
        {/* Nombre de Usuario */}
        <Input
          id="signup-username"
          label="Nombre de Usuario"
          value={nombreUsuario}
          onValueChange={handleNombreUsuarioChange}
          placeholder="Tag"
          icon={USER}
          errorMessage={nombreUsuarioError}
          className={nombreUsuarioError ? styles.error : ""}
        />
        <div className={styles.infoUsuario}>
          {/* Nombre */}
          <Input
            id="signup-name"
            label="Nombre"
            value={nombre}
            onValueChange={handleNombreChange}
            placeholder="Tu Nombre"
            icon={EMAIL}
            errorMessage={nombreError}
            className={nombreError ? styles.error : ""}
          />
          {/* Apellido */}
          <Input
            id="signup-lastname"
            label="Apellido"
            value={apellido}
            onValueChange={handleApellidoChange}
            placeholder="Tu Apellido"
            icon={EMAIL}
            errorMessage={apellidoError}
            className={apellidoError ? styles.error : ""}
          />
        </div>
        <div className={styles.infoUsuario}>
          {/* Correo Electrónico */}
          <Input
            id="signup-email"
            label="Correo electrónico"
            value={email}
            onValueChange={handleEmailChange}
            placeholder="tucorreo@ejemplo.com"
            icon={EMAIL}
            errorMessage={emailError}
            className={emailError ? styles.error : ""}
          />
          {/* Edad */}
          <DateSelector
            value={edad}
            onValueChange={handleEdadChange}
            errorMessage={edadError}
            placeholder="texto"
            label="Edad"
            className={edadError ? styles.error : ""}
          />
        </div>
        {/* Contraseña */}
        <Input
          id="signup-pass"
          label="Contraseña"
          value={pass}
          onValueChange={handlePassChange}
          placeholder="Contraseña segura"
          icon={KEY}
          type="password"
          errorMessage={passError}
          className={passError ? styles.error : ""}
        />
        {/* TODO: Confirmar Contraseña */}
        <Input
          id="signup-confirm-pass"
          label="Confirmar contraseña"
          value={confirmPass}
          onValueChange={handleConfirmPassChange}
          placeholder="Confirmar contraseña"
          icon={KEY}
          type="password"
          errorMessage={confirmPassError}
          className={passError ? styles.error : ""}
        />
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Acceder</Link>
        </p>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarme"}
        </Button>
        {apiError && <p className={styles.mensajeError}>{apiError}</p>}
      </form>
    </div>
  );
}
