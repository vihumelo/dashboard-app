import React from "react";
import { Tag, Space } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const TagNoprazo: React.FC = () => (
  <>
    <Tag className="custom-tag" color="green">
      <Space>
        <CheckCircleOutlined />
        No prazo
      </Space>
    </Tag>
  </>
);

export default TagNoprazo;
