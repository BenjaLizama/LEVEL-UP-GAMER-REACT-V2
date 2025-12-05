import { useState, useEffect, useCallback } from "react";

type AlertType = "success" | "error" | "warning";

interface AlertData {
  message: string;
  type: AlertType;
  id: number;
}

interface AlertQueueControls {
  currentAlert: AlertData | null;
  handleShowAlert: (message: string, type: AlertType) => void;
  handleCloseAlert: () => void;
}

export function useAlertQueue(): AlertQueueControls {
  const [alertsQueue, setAlertsQueue] = useState<AlertData[]>([]);

  const [currentAlert, setCurrentAlert] = useState<AlertData | null>(null);

  const handleCloseAlert = useCallback(() => {
    setAlertsQueue((prevQueue) => prevQueue.slice(1));

    setCurrentAlert(null);
  }, []);

  const handleShowAlert = useCallback((message: string, type: AlertType) => {
    const newAlert: AlertData = {
      message,
      type,
      id: Date.now() + Math.random(),
    };

    setAlertsQueue((prevQueue) => [...prevQueue, newAlert]);
  }, []);

  useEffect(() => {
    if (currentAlert === null && alertsQueue.length > 0) {
      setCurrentAlert(alertsQueue[0]);
    }
  }, [currentAlert, alertsQueue]);

  return {
    currentAlert,
    handleShowAlert,
    handleCloseAlert,
  };
}
