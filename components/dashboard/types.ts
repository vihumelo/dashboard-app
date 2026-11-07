import type { LaboratoryResult } from "../../domain/dashboard/types";
import type { ResultStatus } from "../../domain/dashboard/status";

export interface DashboardRow extends Pick<
  LaboratoryResult,
  "id" | "registration" | "exam" | "value" | "department" | "unit"
> {
  key: string;
  status: ResultStatus;
  executedAt: string;
  remainingTime: string;
}
