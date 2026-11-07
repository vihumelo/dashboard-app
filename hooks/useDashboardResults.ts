"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { generateMockResults } from "../data/mockResults";
import type {
  LaboratoryResult,
  LaboratoryUnit,
} from "../domain/dashboard/types";
import { laboratoryUnits } from "../domain/dashboard/types";

export interface DashboardResultsState {
  isReady: boolean;
  now: Date;
  results: LaboratoryResult[];
  selectedUnits: LaboratoryUnit[];
  visibleResults: LaboratoryResult[];
  notifyResult: (resultId: number) => void;
  selectUnits: (units: LaboratoryUnit[]) => void;
}

export function useDashboardResults(): DashboardResultsState {
  const [results, setResults] = useState<LaboratoryResult[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<LaboratoryUnit[]>([
    ...laboratoryUnits,
  ]);
  const [now, setNow] = useState<Date>(() => new Date(0));
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initialTime = new Date();
    setNow(initialTime);
    setResults(generateMockResults({ now: initialTime }));
    setIsReady(true);

    const intervalId = window.setInterval(() => setNow(new Date()), 10_000);
    return () => window.clearInterval(intervalId);
  }, []);

  const visibleResults = useMemo(
    () =>
      results.filter(
        (result) => !result.communicated && selectedUnits.includes(result.unit),
      ),
    [results, selectedUnits],
  );

  const notifyResult = useCallback((resultId: number): void => {
    setResults((currentResults) =>
      currentResults.map((result) =>
        result.id === resultId ? { ...result, communicated: true } : result,
      ),
    );
  }, []);

  const selectUnits = useCallback((units: LaboratoryUnit[]): void => {
    setSelectedUnits([...units]);
  }, []);

  return {
    isReady,
    now,
    results,
    selectedUnits,
    visibleResults,
    notifyResult,
    selectUnits,
  };
}
