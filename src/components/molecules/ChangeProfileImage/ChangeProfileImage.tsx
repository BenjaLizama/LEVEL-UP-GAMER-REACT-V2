import React, { useState, useRef } from "react";
import styles from "./ChangeProfileImage.module.css";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import { LINK } from "@/utils/Icons";

export default function ChangeProfileImage() {
  const [file, setFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>("");
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const dragCounter = useRef(0);

  const processSelectedFile = (selectedFile: File | null) => {
    setLinkError(false);
    setLink("");

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

    if (newValue.length > 0) {
      if (file) setFile(null);
      setPreviewURL(newValue);
    } else {
      setFile(null);
      setPreviewURL(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file && !link) {
      alert("Debes seleccionar una imagen o proporcionar un link");
      return;
    }

    if (link && linkError) {
      alert(
        "⚠️ El link proporcionado es inválido o no se pudo cargar la imagen. Por favor, corrígelo."
      );
      return;
    }

    console.log("Datos listos para enviar:", file || link);
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

  const isDisabled = !(file || link.length > 0) || linkError;

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
            }}
          />
        </div>
      )}

      {linkError && (
        <p className={styles.errorMessage}>El link no es una imagen válida.</p>
      )}

      <form className={styles.changeProfileImageForm} onSubmit={handleSubmit}>
        <div className={styles.fileInputContainer}>
          <Input
            value={link}
            onValueChange={handleLinkChange}
            icon={LINK}
            label="Link de tu imagen"
          />

          <input
            id="input-file"
            className={styles.inputFile}
            type="file"
            onChange={handleNativeInputChange}
            accept="image/*"
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
          Subír imagen
        </Button>
      </form>
    </div>
  );
}
