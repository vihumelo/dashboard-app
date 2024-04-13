"use client";
import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, Checkbox, Menu } from "antd";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    label: (
      <Checkbox defaultChecked onClick={(e) => e.stopPropagation()}>
        Todas unidades
      </Checkbox>
    ),
    key: "1",
  },
  {
    label: <Checkbox onClick={(e) => e.stopPropagation()}>Paraíso</Checkbox>,
    key: "2",
  },
  {
    label: <Checkbox onClick={(e) => e.stopPropagation()}>Aclimação</Checkbox>,
    key: "3",
  },
  {
    label: <Checkbox onClick={(e) => e.stopPropagation()}>Ana Rosa</Checkbox>,
    key: "4",
  },
];

const DropDownFilter: React.FC = () => {
  return (
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Button className="dropfilter">
          <Space>
            Unidades
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};

export default DropDownFilter;
