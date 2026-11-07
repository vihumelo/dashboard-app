"use client";

import Dashboard from "./Dashboard";
import Topbar from "../layout/Topbar";
import { useDashboardResults } from "../../hooks/useDashboardResults";

export default function DashboardApp() {
  const dashboard = useDashboardResults();

  return (
    <>
      <Topbar
        selectedUnits={dashboard.selectedUnits}
        onSelectedUnitsChange={dashboard.selectUnits}
      />
      <Dashboard
        results={dashboard.visibleResults}
        now={dashboard.now}
        isReady={dashboard.isReady}
        onNotify={dashboard.notifyResult}
      />
    </>
  );
}
