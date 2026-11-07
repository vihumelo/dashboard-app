import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import DropDownFilter from "./DropDownFilter";
import { laboratoryUnits } from "../../domain/dashboard/types";

describe("DropDownFilter", () => {
  it("reports the remaining unit selection when a unit is unchecked", async () => {
    const user = userEvent.setup();
    const onSelectedUnitsChange = vi.fn();

    render(
      <DropDownFilter
        selectedUnits={[...laboratoryUnits]}
        onSelectedUnitsChange={onSelectedUnitsChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Filtrar por unidade" }),
    );
    await user.click(await screen.findByRole("checkbox", { name: "Ana Rosa" }));

    expect(onSelectedUnitsChange).toHaveBeenCalledWith([
      "Paraíso",
      "Aclimação",
    ]);
  });

  it("selects every unit from the all-units checkbox", async () => {
    const user = userEvent.setup();
    const onSelectedUnitsChange = vi.fn();

    render(
      <DropDownFilter
        selectedUnits={[]}
        onSelectedUnitsChange={onSelectedUnitsChange}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: "Filtrar por unidade" }),
    );
    await user.click(
      await screen.findByRole("checkbox", { name: "Todas unidades" }),
    );

    expect(onSelectedUnitsChange).toHaveBeenCalledWith([...laboratoryUnits]);
  });
});
