import React from "react";
import { Tag, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const TagAtrasado: React.FC = () => (
  <>
    <Tag className="custom-tag" color="red">
      <Space>
        <CloseCircleOutlined />
        Atrasado
      </Space>
    </Tag>
  </>
);

export default TagAtrasado;
