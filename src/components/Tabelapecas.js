
import { Box, Table, Tbody, Td, Th, Thead, Tr,Divider  } from "@chakra-ui/react";
import React from "react";
import { useEffect,useState } from "react";


const TabelaPecas = () => {


    const [pecas, setpesas] = useState([]);

    useEffect(() => {
        fetch('http://4.227.162.137:8080/Pecas/todos')
            .then(response => response.json())
            .then(data => setpesas(data));
    }, []);


  return (
    <Box overflowX="auto">
            <Divider />

      <Table Table variant="striped">
        <Thead>
          <Tr>
            <Th>ID da Peça</Th>
            <Th>Tipo de peça</Th>
            <Th>Descrição da Peça</Th>
            <Th>Valor da peça</Th>
            <Th>Quantidade de Peças</Th>
          </Tr>
        </Thead>
        <Tbody>
                {pecas && pecas.map(pec=>(
                    <Tr key={pec.idpeca}>
                        <Th>{pec.idpeca}</Th>  
                        <Th>{pec.tipopeca}</Th>
                        <Th>{pec.descricaopeca}</Th>
                        <Th>{pec.valorpeca}</Th>
                        <Th>{pec.quantidadepecas}</Th>
                    </Tr>
                ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TabelaPecas;