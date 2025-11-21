import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import axios from "axios";
import { EMAIL, KEY, USER } from "@/utils/Icons";
// ⚠️ Nota: Asegúrate de importar tu DTO de registro correcto, que en el backend era AgregarUsuarioDTO
// Usaremos un tipo temporal aquí, pero tú lo reemplazarás.

// ❌ Quitamos la importación de LoginDTO, ya que estamos registrando.

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [nombreUsuario, setNombreUsuario] = useState<string>(""); // Nuevo campo
  const [nombre, setNombre] = useState<string>(""); // Nuevo campo // --- 2. ESTADOS DE ERROR DE FORMULARIO ---
  const [apellido, setApellido] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passError, setPassError] = useState<string>("");
  const [nombreUsuarioError, setNombreUsuarioError] = useState<string>("");
  const [nombreError, setNombreError] = useState<string>(""); // --- 3. ESTADOS DE UI/API ---
  const [apellidoError, setApellidoError] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(""); // --- 4. HANDLERS DE CAMBIO ---

  const handleEmailChange = (newValue: string) => {
    setEmail(newValue);
    if (emailError) setEmailError("");
  };

  const handlePassChange = (newValue: string) => {
    setPass(newValue);
    if (passError) setPassError("");
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

  const validateForm = (): boolean => {
    let isValid = true;

    setEmailError("");
    setPassError("");
    setNombreUsuarioError("");
    setNombreError("");
    setApellidoError("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Introduce un correo válido");
      isValid = false;
    } // Validación de Contraseña

    if (!pass || pass.length < 6) {
      setPassError("La contraseña debe tener al menos 6 caracteres");
      isValid = false;
    } // Validación de Nombre de Usuario

    if (!nombreUsuario || nombreUsuario.length < 3) {
      setNombreUsuarioError(
        "El nombre de usuario es obligatorio (min. 3 caracteres)"
      );
      isValid = false;
    } // Validación de Nombre

    if (!nombre) {
      setNombreError("El nombre es obligatorio");
      isValid = false;
    }

    if (!apellido) {
      setApellidoError("El apellido es obligatorio");
      isValid = false;
    }

    return isValid;
  }; // --- 6. HANDLER DE ENVÍO ---

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // 🔑 ESTRUCTURA DE DATOS PARA ENVIAR AL BACKEND // ⚠️ TÚ DEBES COMPLETAR ESTO CON TU DTO COMPLETO (AgregarUsuarioDTO)

    // const nuevoUsuario: AgregarUsuarioDTO = {
    //   correo: email,
    //   contrasena: pass,
    //   nombreUsuario: nombreUsuario,
    //   nombre: nombre, // ⚠️ Añade aquí todos los demás campos (ej: apellido, fechaNacimiento) // apellido: '...', // fechaNacimiento: '...'
    // };

    try {
      // 🚨 PUNTO DE IMPLEMENTACIÓN: Llama al nuevo método de registro
      // Este método debe estar en UsuarioService y enviar el DTO.
      // const usuarioRegistrado = await usuarioService.register(nuevoUsuario);
      // console.log("Usuario registrado con éxito ✅: ", usuarioRegistrado);
      // Si el registro es exitoso, redirigimos al login
      // navigate('/login');
    } catch (error: unknown) {
      console.error("Error en la API durante el registro: ", error); // 5. Manejo de errores de Axios

      if (axios.isAxiosError(error) && error.response) {
        // 409 Conflict: Típico para "Correo o Nombre de Usuario ya registrado"
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
        {/* Nombre */}
        <Input
          id="signup-name"
          label="Apellido"
          value={apellido}
          onValueChange={handleApellidoChange}
          placeholder="Tu Apellido"
          icon={EMAIL}
          errorMessage={apellidoError}
          className={apellidoError ? styles.error : ""}
        />
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
          id="signup-pass"
          label="Confirmar contraseña"
          value={pass}
          onValueChange={handlePassChange}
          placeholder="Contraseña segura"
          icon={KEY}
          type="password"
          errorMessage={passError}
          className={passError ? styles.error : ""}
        />
        <p>
          ¿Ya tienes una cuenta? <Link to="/login">Acceder</Link>
        </p>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarme"}
        </Button>
        {apiError && <p className={styles.apiError}>{apiError}</p>}
      </form>
    </div>
  );
}
