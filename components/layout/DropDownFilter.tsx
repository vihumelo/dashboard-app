"use client";

import { DownOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { laboratoryUnits } from "../../domain/dashboard/types";
import type { LaboratoryUnit } from "../../domain/dashboard/types";

interface DropDownFilterProps {
  selectedUnits: LaboratoryUnit[];
  onSelectedUnitsChange: (units: LaboratoryUnit[]) => void;
}

export default function DropDownFilter({
  selectedUnits,
  onSelectedUnitsChange,
}: DropDownFilterProps) {
  const allUnitsSelected = selectedUnits.length === laboratoryUnits.length;

  const items: MenuProps["items"] = [
    {
      key: "all-units",
      label: (
        <Checkbox
          checked={allUnitsSelected}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) =>
            onSelectedUnitsChange(
              event.target.checked ? [...laboratoryUnits] : [],
            )
          }
        >
          Todas unidades
        </Checkbox>
      ),
    },
    ...laboratoryUnits.map((unit) => ({
      key: unit,
      label: (
        <Checkbox
          checked={selectedUnits.includes(unit)}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            const nextSelection = event.target.checked
              ? [...selectedUnits, unit]
              : selectedUnits.filter((selectedUnit) => selectedUnit !== unit);
            onSelectedUnitsChange([...new Set(nextSelection)]);
          }}
        >
          {unit}
        </Checkbox>
      ),
    })),
  ];

  return (
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button className="dropfilter" aria-label="Filtrar por unidade">
          <Space>
            Unidades
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
}
