import React, { useEffect, useState } from "react";
import styles from "./PaymentSuccess.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { usuarioService } from "@/services/UsuarioService";
import Button from "@/components/atoms/Button/Button";
import SimpleIcon from "@/components/atoms/SimpleIcon/SimpleIcon";
import { ERROR, SUCCESS, REFRESH } from "@/utils/Icons";

const STATUS_LOADING = "Verificando pago...";
const STATUS_ERROR_ID = "Error: No se encontró el ID de la sesión de pago.";
const STATUS_FAILED = "Pago fallido o no verificado.";
const MIN_DELAY_MS = 4000;

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [estadoPago, setEstadoPago] = useState<boolean | null>(null);
  const [estado, setEstado] = useState(STATUS_LOADING);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setEstado(STATUS_ERROR_ID);
      setEstadoPago(false);
      return;
    }

    const verificarPago = async () => {
      const apiPromise = new Promise((resolve, reject) => {
        usuarioService
          .confirmarPago(sessionId)
          .then((mensaje) => {
            resolve(mensaje);
          })
          .catch(() => {
            reject("Pago fallido o no verificado.");
          });
      });

      const delayPromise = new Promise((resolve) =>
        setTimeout(resolve, MIN_DELAY_MS)
      );

      try {
        const [mensaje] = await Promise.all([apiPromise, delayPromise]);

        setEstado(mensaje as string);
        setEstadoPago(true);
      } catch (error) {
        await delayPromise;

        setEstado((error as string) || STATUS_FAILED);
        setEstadoPago(false);
      }
    };

    verificarPago();
  }, [searchParams, navigate]);

  const renderContent = () => {
    if (estadoPago === null) {
      return (
        <>
          <SimpleIcon
            icon={REFRESH}
            fontSize={100}
            color="#10b981"
            className={styles.spinner}
          />
          <h2 className={styles.paymentSuccesTitle}>Verificando pago...</h2>
          <p className={styles.paymentSuccesState}>
            Estamos confirmando los detalles de su transacción. Por favor,
            espere.
          </p>
        </>
      );
    }

    if (estadoPago === true) {
      return (
        <>
          <SimpleIcon icon={SUCCESS} fontSize={100} color="#059669" />
          <h2 className={styles.paymentSuccesTitle}>Compra exitosa!</h2>
          <p className={styles.paymentSuccesState}>{estado}</p>
          <Button onClick={() => navigate("/")}>Ir a Inicio</Button>
        </>
      );
    }

    if (estadoPago === false) {
      return (
        <>
          <SimpleIcon icon={ERROR} fontSize={100} color="#dc2626" />
          <h2 className={styles.paymentSuccesTitle}>
            Error al procesar el pago
          </h2>
          <p className={styles.paymentSuccesState}>
            {estado === STATUS_ERROR_ID
              ? estado
              : "Lo sentimos, ocurrió un error durante su compra."}
          </p>
          <Button onClick={() => navigate("/cart")}>Volver al Carrito</Button>
        </>
      );
    }
  };

  return <div className={styles.paymentSuccesContainer}>{renderContent()}</div>;
}
