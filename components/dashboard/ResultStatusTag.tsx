import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Space, Tag } from "antd";
import type { ResultStatus } from "../../domain/dashboard/status";

interface ResultStatusTagProps {
  status: ResultStatus;
}

const statusPresentation = {
  overdue: {
    color: "red",
    icon: <CloseCircleOutlined />,
    label: "Atrasado",
  },
  attention: {
    color: "gold",
    icon: <ExclamationCircleOutlined />,
    label: "Atenção",
  },
  "on-time": {
    color: "green",
    icon: <CheckCircleOutlined />,
    label: "No prazo",
  },
  unknown: {
    color: "default",
    icon: <QuestionCircleOutlined />,
    label: "Indisponível",
  },
} as const;

export default function ResultStatusTag({ status }: ResultStatusTagProps) {
  const presentation = statusPresentation[status];

  return (
    <Tag className="custom-tag" color={presentation.color}>
      <Space>
        {presentation.icon}
        {presentation.label}
      </Space>
    </Tag>
  );
}
