import { Button, Flex } from "antd";

export default function MenuNav() {
  return (
    <Flex gap="small" wrap="wrap">
      <Button className="menu-button" type="primary" aria-current="page">
        Dashboard
      </Button>
      <Button type="text" className="menu-button-text">
        Relatórios
      </Button>
      <Button type="text" className="menu-button-text">
        Consultas
      </Button>
    </Flex>
  );
}
