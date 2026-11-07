import { describe, expect, it } from "vitest";
import { calculateRemainingTime, formatRemainingTime } from "./time";

const executedAt = new Date("2026-01-01T12:00:00.000Z");

describe("turnaround time", () => {
  it("calculates the time until the 60-minute deadline", () => {
    const now = new Date("2026-01-01T12:30:00.000Z");

    expect(calculateRemainingTime(executedAt, now)).toBe(30 * 60 * 1000);
  });

  it("returns a negative duration after the deadline", () => {
    const now = new Date("2026-01-01T13:02:00.000Z");

    expect(calculateRemainingTime(executedAt, now)).toBe(-2 * 60 * 1000);
  });

  it("formats hours and rounds partial minutes up", () => {
    expect(formatRemainingTime(60 * 60 * 1000)).toBe("01:00");
    expect(formatRemainingTime(1)).toBe("00:01");
  });

  it("shows elapsed time once the result is overdue", () => {
    expect(formatRemainingTime(-60 * 1000)).toBe("Atrasado há 00:01");
  });

  it("returns an unavailable label for invalid durations", () => {
    expect(formatRemainingTime(Number.NaN)).toBe("Indisponível");
  });
});
