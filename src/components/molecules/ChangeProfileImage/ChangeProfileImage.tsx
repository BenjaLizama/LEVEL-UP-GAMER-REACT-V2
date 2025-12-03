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
    processSelectedFile(e.target.files?.[0] || null);
    e.target.value = "";
  };

  const handleLinkChange = (newValue: string) => {
    setLink(newValue);
    setLinkError(false);
    setSubmissionError(null);

    if (newValue.length > 0) {
      setFile(null);
      setPreviewURL(newValue);
    } else {
      setPreviewURL(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUserId || isNaN(currentUserId)) {
      setSubmissionError("Error: No se encontró la sesión del usuario.");
      return;
    }

    if ((!file && !link) || (link && linkError)) {
      setSubmissionError("Debes proporcionar una imagen válida.");
      return;
    }

    setIsLoading(true);
    setSubmissionError(null);

    try {
      let usuarioActualizado: Usuario;

      if (file) {
        usuarioActualizado = await usuarioService.actualizarImagenPerfilArchivo(
          currentUserId,
          file
        );
      } else {
        usuarioActualizado = await usuarioService.actualizarImagenPerfil(
          currentUserId,
          link
        );
      }

      if (usuarioActualizado.imagenPerfilURL) {
        localStorage.setItem(
          "imagenPerfil",
          usuarioActualizado.imagenPerfilURL
        );

        console.log("Estado global actualizado:", usuarioActualizado);
      } else {
        throw new Error("El servidor no devolvió la URL de la imagen.");
      }

      setLink("");
      setFile(null);
      setPreviewURL(null);
      onSuccess();
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      const msg =
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar.";
      setSubmissionError(msg);
      onError(msg);
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
    if (dragCounter.current === 1) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;
    processSelectedFile(e.dataTransfer.files[0] || null);
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
              if (!file)
                setSubmissionError(
                  "No se pudo cargar la imagen desde el link."
                );
            }}
          />
        </div>
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
            disabled={isLoading || !!file}
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
          {isLoading ? "Subiendo..." : "Actualizar Imagen"}
        </Button>
      </form>
    </div>
  );
}
