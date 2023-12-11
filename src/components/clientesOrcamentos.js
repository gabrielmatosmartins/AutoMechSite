import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";

function clientesOrcamentos(){

    const [showTable, setShowTable] = useState(false);
    const [orcCli,setOrcamen]=useState([]);

    useEffect(() => {
        fetch('http://4.227.162.137:8080/Orcamentos/cliente/3')
            .then(response => response.json())
            .then(data => setOrcamen(data));
            
            const toggleTable = () => {
                setShowTable(!showTable);
            };
    }, []);

   

    useEffect(() => {
        fetch('http://4.227.162.137:8080/Orcamentos/cliente/3')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const toggleTable = () => {
        setShowTable(!showTable);
    };

    return (
        <div>
            <Button onClick={toggleTable}>Mostrar/Ocultar Tabela</Button>
            {showTable && (
                <Box overflowX="auto">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Id Orçamento</Th>
                                <Th>Problemas Orçamento</Th>
                                <Th>Id Veículo</Th>
                                <Th>Marca</Th>
                                <Th>Modelo</Th>
                                <Th>Placa</Th>
                                <Th>Ano</Th>
                                <Th>Status Orçamento</Th>
                                <Th>Valor Orçamento</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {orcCli.map(orcCli => (
                                <Tr key={orcCli.idorcamento}>
                                    <Th>{orcCli.idorcamento}</Th>
                                    <Th>{orcCli.probelmasorcamento}</Th>
                                    <Th>{orcCli.veiculo.id}</Th>
                                    <Th>{orcCli.veiculo.marca}</Th>
                                    <Th>{orcCli.veiculo.placa}</Th>
                                    <Th>{orcCli.veiculo.ano}</Th>
                                    <Th>{orcCli.statusorcamento}</Th>
                                    <Th>{orcCli.valororcamento}</Th>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            )}
        </div>
    );
}
    
    export default clientesOrcamentos;