import { Box, Button, Table, Tbody, Td, Th, Thead, Tr, Text } from "@chakra-ui/react";
import React from "react";

const MeusOrcamentos = () => {
  const data = [
    {
      status: "Aguardando aprovação",
      dateTime: new Date().toLocaleString(),
      service: "Troca de pneu",
      value: "R$ 15000,00",
    },
    {
      status: "Aguardando aprovação",
      dateTime: "10/11/2023, 12:28:17 ",
      service: "Troca de óleo",
      value: "R$ 200,00",
    },
  ];

  return (
    <Box overflowX="auto">


<Text noOfLines={1}  as='b' color={"black"}  padding={5}>
              Olá, Usuário!
            </Text>
            <Text noOfLines={1}  color={"black"} padding={5}>
            Seus orçamentos foram realizados. Selecione para aprovar os orçamentos desejados!
            </Text>

      <Table>
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Data e Hora</Th>
            <Th>Serviço</Th>
            <Th>Valor</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={index}>
              <Td>{row.status}</Td>
              <Td>{row.dateTime}</Td>
              <Td>{row.service}</Td>
              <Td>{row.value}</Td>
              <Td>
                <Button colorScheme="green" mr="4">
                  Aprovar
                </Button>
                <Button colorScheme="red">Reprovar</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default MeusOrcamentos;