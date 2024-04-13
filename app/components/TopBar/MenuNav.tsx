import React from "react";
import { Button, Flex } from "antd";

const App: React.FC = () => (
  <Flex gap="small" wrap="wrap">
    <Button className="menu-button" type="primary">
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

export default App;
