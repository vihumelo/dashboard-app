"use client";

import React, { useState, useEffect, JSXElementConstructor } from "react";
import { Table, Empty, TableProps } from "antd";
import { updateTimer } from "./timer";
import { capturarMinutos } from "./timer";
import TagAtrasado from "./TagAtrasado";
import NotifyButton from "./NotifyButton";
import TagAtencao from "./TagAtencao";
import TagNoprazo from "./TagNoprazo";
import jsonData from "./data";

type AlignType = "left" | "right" | "center";

interface DataType {
  key: React.Key;
  tag: JSX.Element;
  registro: string;
  interface: string; // Renomeado de hora_execucao para interface
  exame: string;
  resultado: string;
  action: JSX.Element;
  timer: string;
  setor: string;
}

const columns = [
  {
    title: "Status",
    dataIndex: "tag",
    align: "center" as AlignType,
  },
  {
    title: "Tempo restante",
    dataIndex: "timer",
  },
  {
    title: "Nº do registro",
    dataIndex: "registro",
  },
  {
    title: "Interface",
    dataIndex: "interface",
  },

  {
    title: "Exame",
    dataIndex: "exame",
  },
  {
    title: "Resultado",
    dataIndex: "resultado",
  },
  {
    title: "Setor",
    dataIndex: "setor",
    filters: [
      {
        text: "Hematologia",
        value: "Hematologia",
      },
      {
        text: "Bioquímica",
        value: "Bioquímica",
      },

      {
        text: "Coagulação",
        value: "Coagulação",
      },
    ],
    onFilter: (value: string | boolean | React.Key, record: DataType) => {
      if (typeof value === "string") {
        return record.setor.indexOf(value) === 0;
      }
      return false;
    },
  },

  {
    title: "",
    dataIndex: "action",
    key: "action",
  },
];

const TableComponent: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const customLocale = {
    emptyText: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="Sem resultados para serem transmitidos"
      />
    ),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(jsonData);
        const formattedData: DataType[] = jsonData
          .filter((item: any) => item.comunicacao !== 1) // Filtrando os itens com item.comunicacao !== 1
          .map((item: any, index: number) => {
            const interfaceDate = new Date(item.hora_execucao);
            const formattedInterface = interfaceDate
              .toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })
              .replace(",", "");

            // Função para calcular a diferença em minutos e segundos
            const timerValue = updateTimer(interfaceDate);
            const timerNumber = capturarMinutos(timerValue);

            return {
              key: index.toString(),
              registro: item.registro,
              interface: formattedInterface,
              exame: item.exame,
              resultado: item.resultado,
              timer: timerValue,
              tag:
                timerNumber <= 30 ? (
                  timerNumber <= 10 ? (
                    <TagAtrasado />
                  ) : (
                    <TagAtencao />
                  )
                ) : (
                  <TagNoprazo />
                ),
              action: <NotifyButton itemId={item.id} onSuccess={fetchData} />,
              setor: item.setor,
            };
          });
        setData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar os dados da API:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onChange: TableProps<DataType>["onChange"] = (filters) => {};

  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      locale={customLocale}
      onChange={onChange}
    />
  );
};

export default TableComponent;
