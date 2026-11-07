import { describe, expect, it } from "vitest";
import { generateMockResults } from "./mockResults";

describe("generateMockResults", () => {
  const now = new Date("2026-11-07T12:00:00.000Z");

  it("generates repeatable results for the same seed and clock", () => {
    const first = generateMockResults({ seed: 1234, now });
    const second = generateMockResults({ seed: 1234, now });

    expect(first).toEqual(second);
  });

  it("changes generated values when the seed changes", () => {
    const first = generateMockResults({ seed: 1234, now });
    const second = generateMockResults({ seed: 5678, now });

    expect(first).not.toEqual(second);
  });

  it("supports empty and custom-sized result sets", () => {
    expect(generateMockResults({ count: 0, now })).toEqual([]);
    expect(generateMockResults({ count: 4, now })).toHaveLength(4);
  });

  it("keeps result ids unique and assigns known units and departments", () => {
    const results = generateMockResults({ count: 30, seed: 92, now });

    expect(new Set(results.map((result) => result.id)).size).toBe(30);
    expect(
      results.every((result) =>
        ["Paraíso", "Aclimação", "Ana Rosa"].includes(result.unit),
      ),
    ).toBe(true);
    expect(
      results.every((result) =>
        ["Hematologia", "Bioquímica", "Coagulação"].includes(result.department),
      ),
    ).toBe(true);
  });
});
