import type {
  ExamName,
  LaboratoryDepartment,
  LaboratoryResult,
  LaboratoryUnit,
} from "../domain/dashboard/types";
import { examNames, laboratoryUnits } from "../domain/dashboard/types";

export const DEFAULT_MOCK_SEED = 20261107;

export interface GenerateMockResultsOptions {
  count?: number;
  now?: Date;
  seed?: number;
}

type RandomSource = () => number;

function createRandomSource(seed: number): RandomSource {
  let state = seed;

  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function randomInteger(min: number, max: number, random: RandomSource): number {
  return Math.floor(random() * (max - min)) + min;
}

function randomRegistration(random: RandomSource): string {
  return `24-104-${randomInteger(1000, 10000, random)}`;
}

function localDateTimeMinutesAgo(minutesAgo: number, now: Date): string {
  const date = new Date(now);
  date.setMinutes(date.getMinutes() - minutesAgo);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function randomExam(random: RandomSource): ExamName {
  const index = randomInteger(0, examNames.length, random);
  return examNames[index] ?? examNames[0];
}

function randomDepartment(exam: ExamName): LaboratoryDepartment {
  if (exam === "Dímero-D") {
    return "Coagulação";
  }

  if (
    exam === "Sódio" ||
    exam === "Potássio" ||
    exam === "Troponina" ||
    exam === "Ácido Lático" ||
    exam === "pH"
  ) {
    return "Bioquímica";
  }

  return "Hematologia";
}

function randomUnit(random: RandomSource): LaboratoryUnit {
  const index = randomInteger(0, laboratoryUnits.length, random);
  return laboratoryUnits[index] ?? laboratoryUnits[0];
}

function resultValue(exam: ExamName, random: RandomSource): string {
  switch (exam) {
    case "Sódio":
      return (random() * (129.9 - 115) + 115).toFixed(1);
    case "Potássio":
      return (random() * (8.3 - 5.5) + 5.5).toFixed(1);
    case "Troponina":
      return (random() * (20 - 0.6) + 0.6).toFixed(1);
    case "Ácido Lático":
      return (random() * (200.5 - 50.5) + 50.5).toFixed(1);
    case "pH":
      return (random() * (6.9 - 6) + 6).toFixed(1);
    case "Hemoglobina":
      return (random() * (6.9 - 4) + 4).toFixed(1);
    case "Leucócitos":
      return (random() * (0.99 - 0.01) + 0.01).toFixed(2);
    case "Neutrófilos":
      return (Math.round((random() * 451 + 50) / 10) * 10).toString();
    case "Plaquetas":
      return (randomInteger(1, 9, random) * 1000).toString();
    case "Dímero-D":
      return randomInteger(1000, 15000, random).toString();
  }
}

function minutesAgoForResult(id: number): number {
  if (id === 1) {
    return 65;
  }

  if (id === 2) {
    return 34;
  }

  return Math.max(0, 30 - id);
}

export function generateMockResults({
  count = 15,
  now = new Date(),
  seed = DEFAULT_MOCK_SEED,
}: GenerateMockResultsOptions = {}): LaboratoryResult[] {
  const random = createRandomSource(seed);

  return Array.from({ length: count }, (_, index) => {
    const id = index + 1;
    const exam = randomExam(random);
    const executedAt = localDateTimeMinutesAgo(minutesAgoForResult(id), now);

    return {
      id,
      communicated: false,
      registration: randomRegistration(random),
      executedAt,
      collectedAt: executedAt,
      exam,
      value: resultValue(exam, random),
      department: randomDepartment(exam),
      unit: randomUnit(random),
    };
  });
}
