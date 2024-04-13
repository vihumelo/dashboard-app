import React from "react";
import { Tag, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const TagAtencao: React.FC = () => (
  <>
    <Tag className="custom-tag" color="gold">
      <Space>
        <ExclamationCircleOutlined />
        Atenção
      </Space>
    </Tag>
  </>
);

export default TagAtencao;
