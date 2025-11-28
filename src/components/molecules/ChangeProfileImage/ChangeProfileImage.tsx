import React, { useState, useRef } from "react";
import styles from "./ChangeProfileImage.module.css";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { LINK } from "@/utils/Icons";
import { usuarioService } from "@/services/UsuarioService";
import { Usuario } from "@/models/Usuario";

interface ChangeProfileProps {
  onSuccess: () => void;
  onError: (message: string) => void;
}

export default function ChangeProfileImage({
  onSuccess,
  onError,
}: ChangeProfileProps) {
  const rawUserId = localStorage.getItem("idUsuario");
  const currentUserId = rawUserId ? Number(rawUserId) : null;

  const setUser = (updatedUser: Usuario) => {
    console.log(
      "Usuario actualizado. Esto debería llamar a tu store global.",
      updatedUser
    );
  };

  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const dragCounter = useRef(0);

  const processSelectedFile = (selectedFile: File | null) => {
    setLinkError(false);
    setLink("");
    setSubmissionError(null);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewURL(null);
    }

    setFile(selectedFile);
  };

  const handleNativeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    processSelectedFile(selectedFile);
    e.target.value = "";
  };

  const handleLinkChange = (newValue: string) => {
    setLink(newValue);
    setLinkError(false);
    setSubmissionError(null);

    if (newValue.length > 0) {
      if (file) setFile(null);
      setPreviewURL(newValue);
    } else {
      setFile(null);
      setPreviewURL(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUserId || isNaN(currentUserId)) {
      setSubmissionError(
        "Error de autenticación: El ID de usuario no es válido o no se encontró."
      );
      return;
    }

    if (!file && !link) {
      setSubmissionError("Debes seleccionar una imagen o proporcionar un link");
      return;
    }

    if (link && linkError) {
      setSubmissionError(
        "El link proporcionado es inválido o no se pudo cargar la imagen. Por favor, corrígelo."
      );
      return;
    }

    setIsLoading(true);
    setSubmissionError(null);

    try {
      let usuarioActualizado: Usuario;
      let finalImageUrl: string;
      const timestamp = new Date().getTime();

      if (file) {
        usuarioActualizado = await usuarioService.actualizarImagenPerfilArchivo(
          currentUserId,
          file
        );

        if (usuarioActualizado.imagenPerfilURL) {
          finalImageUrl = `http://localhost:8083${usuarioActualizado.imagenPerfilURL}`;
        } else {
          throw new Error("El servidor no devolvió una URL de imagen válida.");
        }
      } else if (link) {
        usuarioActualizado = await usuarioService.actualizarImagenPerfil(
          currentUserId,
          link
        );
        finalImageUrl = `${link}?v=${timestamp}`;
      } else {
        return;
      }

      localStorage.setItem("imagenPerfil", finalImageUrl);

      setUser(usuarioActualizado);

      onSuccess();
      setLink("");
      setFile(null);
      setPreviewURL(null);
    } catch (error) {
      console.error("Error al actualizar la imagen de perfil:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Fallo la actualización de la imagen.";

      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) =>
    e.preventDefault();

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current++;

    if (dragCounter.current === 1) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    dragCounter.current--;

    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files || [];
    const droppedFile = files[0] || null;

    processSelectedFile(droppedFile);
  };

  const isDisabled = !(file || link.length > 0) || linkError || isLoading;

  const labelClassName = `${styles.inputFileLabel} ${
    isDragging ? styles.isDragging : ""
  }`;

  return (
    <div className={styles.changeProfileImageContainer}>
      {previewURL && (
        <div className={styles.imagePreview}>
          <img
            draggable={false}
            src={previewURL}
            alt="Vista previa"
            className={styles.previewImage}
            onError={() => {
              setLinkError(true);
              setPreviewURL(null);
              setSubmissionError("No se pudo cargar la imagen desde el link.");
            }}
          />
        </div>
      )}

      {linkError && (
        <p className={styles.errorMessage}>El link no es una imagen válida.</p>
      )}
      {submissionError && (
        <p className={styles.errorMessage}>{submissionError}</p>
      )}

      <form className={styles.changeProfileImageForm} onSubmit={handleSubmit}>
        <div className={styles.fileInputContainer}>
          <Input
            value={link}
            onValueChange={handleLinkChange}
            icon={LINK}
            label="Link de tu imagen"
            disabled={isLoading}
          />

          <input
            id="input-file"
            className={styles.inputFile}
            type="file"
            onChange={handleNativeInputChange}
            accept="image/*"
            disabled={isLoading}
          />

          <label
            className={labelClassName}
            htmlFor="input-file"
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span>
              {file
                ? `Archivo seleccionado: ${file.name}`
                : "Seleccionar o arrastrar imagen"}
            </span>
          </label>
        </div>

        <Button type="submit" disabled={isDisabled}>
          {isLoading ? "Subiendo..." : "Subir imagen"}
        </Button>
      </form>
    </div>
  );
}
