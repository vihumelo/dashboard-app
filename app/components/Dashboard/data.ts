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

const getRandomRegistro = () => {
  const randomPart = Math.floor(Math.random() * 9000) + 1000;
  return `24-104-${randomPart}`;
};

function getFormattedDateTimeAgo(minutesAgo: number): string {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() - minutesAgo);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function randomInRange(min: number, max: number, step: number): number {
  const range = (max - min) / step;
  return min + Math.floor(Math.random() * range) * step;
}

function getRandomResults(exame: String) {
  switch (exame) {
    case "Sódio":
      return (Math.random() * (129.9 - 115.0) + 115.0).toFixed(1);
    case "Potássio":
      return (Math.random() * (8.3 - 5.5) + 5.5).toFixed(1);
    case "Troponina":
      return (Math.random() * (20.0 - 0.6) + 0.6).toFixed(1);
    case "Ácido Lático":
      return (Math.random() * (200.5 - 50.5) + 50.5).toFixed(1);
    case "pH":
      return (Math.random() * (6.9 - 6.0) + 6.0).toFixed(1);
    case "Hemoglobina":
      return (Math.random() * (6.9 - 4.0) + 4.0).toFixed(1);
    case "Leucócitos":
      return (Math.random() * (0.99 - 0.01) + 0.01).toFixed(2);
    case "Neutrófilos":
      return (
        Math.round((Math.random() * (500 - 50 + 1) + 50) / 10) * 10
      ).toString();
    case "Plaquetas":
      return randomInRange(1000, 9000, 1000).toString();
    case "Dímero-D":
      return Math.floor(Math.random() * (15000 - 1000) + 1000).toString();
    default:
      return "Resultado não disponível";
  }
}

function getRandomExame() {
  const randomIndex = Math.floor(Math.random() * exames.length);
  return exames[randomIndex];
}

// Lista de exames
const exames = [
  "Sódio",
  "Potássio",
  "Troponina",
  "Ácido Lático",
  "pH",
  "Hemoglobina",
  "Leucócitos",
  "Neutrófilos",
  "Plaquetas",
  "Dímero-D",
];

function getSetor(exame: string) {
  const index = exames.indexOf(exame);

  if (index === 9) {
    return "Coagulação";
  }

  if (index <= 4) {
    return "Bioquímica";
  } else {
    return "Hematologia";
  }
}

function getIntValue(indice: number): number {
  if (indice === 1) {
    return 65;
  } else if (indice === 2) {
    return 34;
  } else {
    // Para os índices restantes, diminua progressivamente até 1
    return 30 - indice;
  }
}

// Array para armazenar os dados dos exames
const jsonData: DataItem[] = [];

const numExames: number = 15;

// Loop para criar e preencher os dados dos exames
for (let i = 1; i <= numExames; i++) {
  const int = getIntValue(i);
  const exame = getRandomExame();
  const registro = getRandomRegistro();
  const hora_execucao = getFormattedDateTimeAgo(int);
  const hora_coleta = getFormattedDateTimeAgo(int);
  const resultado = getRandomResults(exame);
  const setor = getSetor(exame);

  // Adicione os dados do exame atual ao array jsonData
  jsonData.push({
    comunicacao: 0,
    registro,
    hora_execucao,
    hora_coleta,
    exame,
    resultado,
    setor,
    id: i,
  });
}

export default jsonData;
