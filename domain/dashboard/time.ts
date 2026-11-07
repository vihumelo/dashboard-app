const TURNAROUND_TIME_MS = 60 * 60 * 1000;
const MILLISECONDS_PER_MINUTE = 60 * 1000;

export function calculateRemainingTime(
  executedAt: Date,
  now: Date = new Date(),
): number {
  return executedAt.getTime() + TURNAROUND_TIME_MS - now.getTime();
}

export function formatRemainingTime(remainingMilliseconds: number): string {
  if (!Number.isFinite(remainingMilliseconds)) {
    return "Indisponível";
  }

  const totalMinutes = Math.ceil(
    Math.abs(remainingMilliseconds) / MILLISECONDS_PER_MINUTE,
  );
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  const time = `${hours}:${minutes}`;

  return remainingMilliseconds < 0 ? `Atrasado há ${time}` : time;
}
