"use client";

import { Empty, Table } from "antd";
import type { TableColumnsType } from "antd";
import type { LaboratoryResult } from "../../domain/dashboard/types";
import {
  calculateRemainingTime,
  formatRemainingTime,
} from "../../domain/dashboard/time";
import { getResultStatus } from "../../domain/dashboard/status";
import { laboratoryDepartments } from "../../domain/dashboard/types";
import NotifyButton from "./NotifyButton";
import ResultStatusTag from "./ResultStatusTag";
import type { DashboardRow } from "./types";

interface ResultsTableProps {
  results: LaboratoryResult[];
  now: Date;
  isReady: boolean;
  onNotify: (resultId: number) => void;
}

export default function ResultsTable({
  results,
  now,
  isReady,
  onNotify,
}: ResultsTableProps) {
  const columns: TableColumnsType<DashboardRow> = [
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (_, record) => <ResultStatusTag status={record.status} />,
    },
    { title: "Tempo restante", dataIndex: "remainingTime" },
    { title: "Nº do registro", dataIndex: "registration" },
    { title: "Interface", dataIndex: "executedAt" },
    { title: "Exame", dataIndex: "exam" },
    { title: "Resultado", dataIndex: "value" },
    {
      title: "Setor",
      dataIndex: "department",
      filters: laboratoryDepartments.map((department) => ({
        text: department,
        value: department,
      })),
      onFilter: (value, record) => record.department === String(value),
    },
    { title: "Unidade", dataIndex: "unit" },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <NotifyButton resultId={record.id} onNotify={onNotify} />
      ),
    },
  ];

  const rows: DashboardRow[] = results.map((result) => {
    const executedAt = new Date(result.executedAt);
    const remainingMilliseconds = calculateRemainingTime(executedAt, now);
    const formattedExecutedAt = Number.isNaN(executedAt.getTime())
      ? "Indisponível"
      : executedAt
          .toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "");

    return {
      key: String(result.id),
      id: result.id,
      registration: result.registration,
      exam: result.exam,
      value: result.value,
      department: result.department,
      unit: result.unit,
      status: getResultStatus(remainingMilliseconds),
      executedAt: formattedExecutedAt,
      remainingTime: formatRemainingTime(remainingMilliseconds),
    };
  });

  return (
    <section aria-label="Resultados de exames">
      <Table<DashboardRow>
        columns={columns}
        dataSource={rows}
        pagination={false}
        scroll={{ x: "max-content" }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                isReady
                  ? "Sem resultados para serem transmitidos"
                  : "Carregando resultados..."
              }
            />
          ),
        }}
      />
    </section>
  );
}
