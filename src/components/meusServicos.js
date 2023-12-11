import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Text,Divider  } from "@chakra-ui/react";
import React from "react";

const MeusServicos = () => {
  const data = [
    {
      status: "Concluído",
      dateTime: "25/10/2023, 12:28:17 ",
      service: "Troca de pneu",
      value: "R$ 15000,00",
    },

    {
        status: "Concluído",
        dateTime: "25/10/2023, 12:28:17 ",
        service: "Troca de pneu",
        value: "R$ 15000,00",
      },
  ];

  return (
    <Box overflowX="auto">


<Text noOfLines={1}  as='b' color={"black"}  padding={1}>
              Olá, Usuário!
            </Text>
            <Text noOfLines={1}  color={"black"} padding={1} fontSize='xl'>
            Seus Serviços
            </Text>
            <Divider />

      <Table Table variant="striped">
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Data e Hora</Th>
            <Th>Serviço</Th>
            <Th>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.status}</Td>
              <Td>{row.dateTime}</Td>
              <Td>{row.service}</Td>
              <Td>{row.value}</Td>
             
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MeusServicos;