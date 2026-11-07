export const laboratoryDepartments = [
  "Hematologia",
  "Bioquímica",
  "Coagulação",
] as const;

export type LaboratoryDepartment = (typeof laboratoryDepartments)[number];

export const laboratoryUnits = ["Paraíso", "Aclimação", "Ana Rosa"] as const;

export type LaboratoryUnit = (typeof laboratoryUnits)[number];

export const examNames = [
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
] as const;

export type ExamName = (typeof examNames)[number];

export interface LaboratoryResult {
  id: number;
  communicated: boolean;
  registration: string;
  executedAt: string;
  collectedAt: string;
  exam: ExamName;
  value: string;
  department: LaboratoryDepartment;
  unit: LaboratoryUnit;
}
