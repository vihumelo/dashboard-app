import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDashboardResults } from "./useDashboardResults";
import { laboratoryUnits } from "../domain/dashboard/types";

describe("useDashboardResults", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("loads a stable initial result set and selects all units", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-07T12:00:00.000Z"));

    const { result } = renderHook(() => useDashboardResults());

    expect(result.current.isReady).toBe(true);
    expect(result.current.results).toHaveLength(15);
    expect(result.current.selectedUnits).toEqual([...laboratoryUnits]);
    expect(result.current.visibleResults).toHaveLength(15);
  });

  it("filters results when the selected units change", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-07T12:00:00.000Z"));

    const { result } = renderHook(() => useDashboardResults());

    act(() => result.current.selectUnits(["Paraíso"]));

    expect(result.current.visibleResults.length).toBeGreaterThan(0);
    expect(
      result.current.visibleResults.every((item) => item.unit === "Paraíso"),
    ).toBe(true);
  });

  it("shows no results when every unit is deselected", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-07T12:00:00.000Z"));

    const { result } = renderHook(() => useDashboardResults());

    act(() => result.current.selectUnits([]));

    expect(result.current.visibleResults).toEqual([]);
  });

  it("marks a notified result immutably and removes it from the visible list", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-07T12:00:00.000Z"));

    const { result } = renderHook(() => useDashboardResults());
    const previousResults = result.current.results;
    const notifiedResult = result.current.visibleResults[0];

    if (!notifiedResult) {
      throw new Error("Expected the generated list to contain a result");
    }

    act(() => result.current.notifyResult(notifiedResult.id));

    expect(result.current.results).not.toBe(previousResults);
    expect(
      previousResults.find((item) => item.id === notifiedResult.id)
        ?.communicated,
    ).toBe(false);
    expect(
      result.current.results.find((item) => item.id === notifiedResult.id)
        ?.communicated,
    ).toBe(true);
    expect(
      result.current.visibleResults.some(
        (item) => item.id === notifiedResult.id,
      ),
    ).toBe(false);
  });

  it("updates the clock used for status calculations", () => {
    const initialTime = new Date("2026-11-07T12:00:00.000Z");
    vi.useFakeTimers();
    vi.setSystemTime(initialTime);

    const { result } = renderHook(() => useDashboardResults());

    act(() => vi.advanceTimersByTime(10_000));

    expect(result.current.now.getTime()).toBe(initialTime.getTime() + 10_000);
  });
});
