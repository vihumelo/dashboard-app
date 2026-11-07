import { Alert } from "antd";
import styles from "./Dashboard.module.css";
import ResultsTable from "./ResultsTable";
import type { LaboratoryResult } from "../../domain/dashboard/types";

interface DashboardProps {
  results: LaboratoryResult[];
  now: Date;
  isReady: boolean;
  onNotify: (resultId: number) => void;
}

export default function Dashboard({
  results,
  now,
  isReady,
  onNotify,
}: DashboardProps) {
  return (
    <main className={styles.container}>
      <Alert
        className={styles.demoNotice}
        type="info"
        showIcon
        title="Dados fictícios para demonstração. Não representam pacientes reais."
      />
      <ResultsTable
        results={results}
        now={now}
        isReady={isReady}
        onNotify={onNotify}
      />
    </main>
  );
}
