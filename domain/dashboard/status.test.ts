import { describe, expect, it } from "vitest";
import { getResultStatus } from "./status";

describe("result status thresholds", () => {
  it("marks results more than 30 minutes from deadline as on time", () => {
    expect(getResultStatus(30 * 60 * 1000 + 1)).toBe("on-time");
  });

  it("marks results at or under 30 minutes as needing attention", () => {
    expect(getResultStatus(30 * 60 * 1000)).toBe("attention");
    expect(getResultStatus(1)).toBe("attention");
  });

  it("marks a result overdue at and after its deadline", () => {
    expect(getResultStatus(0)).toBe("overdue");
    expect(getResultStatus(-1)).toBe("overdue");
  });

  it("returns an unknown status for invalid durations", () => {
    expect(getResultStatus(Number.NaN)).toBe("unknown");
    expect(getResultStatus(Number.POSITIVE_INFINITY)).toBe("unknown");
  });
});
