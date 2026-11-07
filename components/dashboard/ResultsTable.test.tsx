import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ResultsTable from "./ResultsTable";
import type { LaboratoryResult } from "../../domain/dashboard/types";

const now = new Date("2026-11-07T12:00:00.000Z");

function makeResult(
  id: number,
  minutesAgo: number,
  department: LaboratoryResult["department"] = "Bioquímica",
): LaboratoryResult {
  const executedAt = new Date(now.getTime() - minutesAgo * 60 * 1000);

  return {
    id,
    communicated: false,
    registration: `24-104-${id}`,
    executedAt: executedAt.toISOString(),
    collectedAt: executedAt.toISOString(),
    exam: "Sódio",
    value: "140.0",
    department,
    unit: "Paraíso",
  };
}

describe("ResultsTable", () => {
  it("filters results by department", async () => {
    const user = userEvent.setup();

    render(
      <ResultsTable
        results={[
          makeResult(1, 20, "Bioquímica"),
          makeResult(2, 20, "Hematologia"),
        ]}
        now={now}
        isReady
        onNotify={vi.fn()}
      />,
    );

    const departmentHeader = screen.getByRole("columnheader", {
      name: /Setor/,
    });
    await user.click(within(departmentHeader).getByRole("button"));
    await user.click(
      await screen.findByRole("menuitem", { name: "Hematologia" }),
    );
    await user.click(screen.getByRole("button", { name: "OK" }));

    const table = screen.getByRole("table");
    expect(within(table).getByText("Hematologia")).toBeInTheDocument();
    expect(within(table).queryByText("Bioquímica")).not.toBeInTheDocument();
  });

  it("renders overdue, attention, and on-time statuses from full durations", () => {
    render(
      <ResultsTable
        results={[makeResult(1, 65), makeResult(2, 45), makeResult(3, 20)]}
        now={now}
        isReady
        onNotify={vi.fn()}
      />,
    );

    expect(screen.getByText("Atrasado")).toBeInTheDocument();
    expect(screen.getByText("Atenção")).toBeInTheDocument();
    expect(screen.getByText("No prazo")).toBeInTheDocument();
    expect(screen.getByText("Atrasado há 00:05")).toBeInTheDocument();
  });

  it("connects each notification action to its result id", async () => {
    const onNotify = vi.fn();
    const user = userEvent.setup();

    render(
      <ResultsTable
        results={[makeResult(7, 20)]}
        now={now}
        isReady
        onNotify={onNotify}
      />,
    );

    await user.click(
      screen.getByRole("button", {
        name: "Notificar resultado do registro 7",
      }),
    );

    expect(onNotify).toHaveBeenCalledWith(7);
  });

  it("marks invalid timestamps as unavailable instead of on time", () => {
    const invalidResult = {
      ...makeResult(9, 20),
      executedAt: "not-a-date",
    };

    render(
      <ResultsTable
        results={[invalidResult]}
        now={now}
        isReady
        onNotify={vi.fn()}
      />,
    );

    expect(screen.getAllByText("Indisponível")).toHaveLength(3);
  });
});
