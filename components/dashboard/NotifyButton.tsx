"use client";

import { Button, message } from "antd";

interface NotifyButtonProps {
  resultId: number;
  onNotify: (resultId: number) => void;
}

export default function NotifyButton({
  resultId,
  onNotify,
}: NotifyButtonProps) {
  function handleNotify(): void {
    onNotify(resultId);
    message.success("Notificação simulada com sucesso");
  }

  return (
    <Button
      type="primary"
      className="notify-button"
      onClick={handleNotify}
      aria-label={`Notificar resultado do registro ${resultId}`}
    >
      Notificar
    </Button>
  );
}
