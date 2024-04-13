export const calculateDiff = (interfaceDate) => {
  const currentDate = new Date();
  const diffMilliseconds =
    interfaceDate.getTime() + 60 * 60 * 1000 - currentDate.getTime();
  const diffMinutes = Math.max(0, Math.floor(diffMilliseconds / (1000 * 60)));
  const diffHours = Math.floor(diffMinutes / 60);
  const remainingMinutes = diffMinutes % 60;

  return { diffHours, remainingMinutes };
};

export const updateTimer = (interfaceDate) => {
  const { diffHours, remainingMinutes } = calculateDiff(interfaceDate);
  return `${diffHours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}`;
};

export const capturarMinutos = (tempoString) => {
  const partes = tempoString.split(":");
  const minutos = parseInt(partes[1], 10);

  return minutos;
};
