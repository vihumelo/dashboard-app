export type ResultStatus = "overdue" | "attention" | "on-time" | "unknown";

const ATTENTION_THRESHOLD_MS = 30 * 60 * 1000;

export function getResultStatus(remainingMilliseconds: number): ResultStatus {
  if (!Number.isFinite(remainingMilliseconds)) {
    return "unknown";
  }

  if (remainingMilliseconds <= 0) {
    return "overdue";
  }

  if (remainingMilliseconds <= ATTENTION_THRESHOLD_MS) {
    return "attention";
  }

  return "on-time";
}
