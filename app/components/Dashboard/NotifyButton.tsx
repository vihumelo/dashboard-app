import { Button } from "antd";
import React, { useState } from "react";
import jsonData from "./data";

interface DataItem {
  comunicacao: number;
  registro: string;
  hora_execucao: string;
  hora_coleta: string;
  exame: string;
  resultado: string;
  setor: string;
  id: number;
}

interface NotifyButtonProps {
  itemId: number;
  onSuccess: () => void;
}

const NotifyButton: React.FC<NotifyButtonProps> = ({ itemId, onSuccess }) => {
  const [isNotifying, setIsNotifying] = useState(false);

  const handleNotify = () => {
    try {
      setIsNotifying(true);

      const itemIndex = jsonData.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        const updatedItem = { ...jsonData[itemIndex], comunicacao: 1 };
        const updatedData = [
          ...jsonData.slice(0, itemIndex),
          updatedItem,
          ...jsonData.slice(itemIndex + 1),
        ];
        jsonData.splice(0, jsonData.length, ...updatedData);

        onSuccess();
      } else {
        console.error("Item não encontrado");
        window.alert("Item não encontrado");
      }
    } catch (error) {
      console.error("Erro ao notificar:", error);
      window.alert("Erro ao notificar");
    } finally {
      setIsNotifying(false);
    }
  };

  return (
    <Button
      type="primary"
      className="notify-button"
      onClick={handleNotify}
      loading={isNotifying}
    >
      Notificar
    </Button>
  );
};

export default NotifyButton;
