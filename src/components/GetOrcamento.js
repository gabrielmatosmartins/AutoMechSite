import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer } from '@chakra-ui/react';


export function GetOrcamento() {
    const [orcamento, setOrcamento] = useState([]);
    const [selectedOrcamento, setSelectedOrcamento] = useState(null);

     

    useEffect(() => {
        fetch('http://4.227.162.137:8080/Orcamentos/all')
            .then(response => response.json())
            .then(data => setOrcamento(data));
    }, []);

    const handleStatusChange = async () => {
        if (selectedOrcamento) {
            const orcamentoToUpdate = orcamento.find(orc => orc.idorcamento === Number(selectedOrcamento));
            if (orcamentoToUpdate) {
                const updatedOrcamento = {
                    ...orcamentoToUpdate,
                    statusorcamento: 2,
                };

                const response = await fetch(`http://4.227.162.137:8080/Orcamentos/${selectedOrcamento}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrcamento),
                });

                if (response.ok) {
                    console.log(`Status do orçamento ${selectedOrcamento} alterado para 2`);
                } else {
                    console.log('Erro ao alterar o status do orçamento.');
                }
            }
        }
    };

    const handleDelete = async () => {
        if (selectedOrcamento) {
            const response = await fetch(`http://4.227.162.137:8080/Orcamentos/${selectedOrcamento}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Orçamento ${selectedOrcamento} deletado com sucesso`);
                // Atualiza a lista de orçamentos após a deleção
                setOrcamento(orcamento.filter(orc => orc.idorcamento !== Number(selectedOrcamento)));
            } else {
                console.log('Erro ao deletar o orçamento.');
            }
        }
    };

    return (
        
        <Box p={5}>
            <FormControl id="orcamento" mb={3}>
                <FormLabel>Selecione o orçamento</FormLabel>
                <Select placeholder="Selecione o orçamento" onChange={e => setSelectedOrcamento(e.target.value)}>
                    {orcamento.map(orc => (
                        <option key={orc.idorcamento} value={orc.idorcamento}>{orc.idorcamento}</option>
                    ))}
                </Select>
            </FormControl>
            <Button colorScheme="blue" onClick={handleStatusChange}>Alterar Status</Button>
            <Button colorScheme="red" marginLeft={'5px'} onClick={handleDelete}>Deletar Orçamento</Button>
            <TableContainer ml={'50'} margin maxWidth={'800px'} width={'900px'} height={"full"}>
                <Table variant={'simple'} width={''}>
                    <TableCaption>Orçamentos</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Id do orçamento</Th>
                            <Th>Valor do orçamento</Th>
                            <Th>Descrição</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {orcamento.map(orc => (
                            <Tr key={orc.idorcamento}>
                                <Th>{orc.idorcamento}</Th>
                                <Th>{orc.valororcamento}</Th>
                                <Th>{orc.probelmasorcamento}</Th>
                                <Th>{orc.statusorcamento === 1 ? 'Em análise' : 'Aprovado'}</Th>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
    </Box>
    );
}

