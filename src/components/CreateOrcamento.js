import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, TableCaption, TableContainer } from '@chakra-ui/react';
function createOrcamento(){
const [orcamento, setOrcamento] = useState([]);
const [selectedOrcamento, setSelectedOrcamento] = useState(null);
const [newData, setNewData] = useState('');
const [newValor, setNewValor] = useState('');

useEffect(() => {
    fetch('http://4.227.162.137:8080/Orcamentos/all')
        .then(response => response.json())
        .then(data => setOrcamento(data));
}, []);

const handleUpdateData = async () => {
    if (selectedOrcamento && newData) {
        const orcamentoToUpdate = orcamento.find(orc => orc.idorcamento === Number(selectedOrcamento));
        if (orcamentoToUpdate) {
            const updatedOrcamento = {
                ...orcamentoToUpdate,
                dataorcamento: newData.toString()
            };

            const response = await fetch(`http://4.227.162.137:8080/Orcamentos/${selectedOrcamento}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedOrcamento),
            });

            if (response.ok) {
                console.log(`Data do orçamento ${selectedOrcamento} alterada para ${newData}`);
            } else {
                console.log('Erro ao alterar a data do orçamento.');
            }
        }
    }
};

const handleUpdateValor = async () => {
    if (selectedOrcamento && newValor) {
        const orcamentoToUpdate = orcamento.find(orc => orc.idorcamento === Number(selectedOrcamento));
        if (orcamentoToUpdate) {
            const updatedOrcamento = {
                ...orcamentoToUpdate,
                valororcamento: newValor,
            };

            const response = await fetch(`http://4.227.162.137:8080/Orcamentos/${selectedOrcamento}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedOrcamento),
            });

            if (response.ok) {
                console.log(`Valor do orçamento ${selectedOrcamento} alterado para ${newValor}`);
            } else {
                console.log('Erro ao alterar o valor do orçamento.');
            }
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
        <FormControl id="data" mb={3}>
            <FormLabel>Insira a nova data</FormLabel>
            <Input placeholder="Insira a nova data" onChange={e => setNewData(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdateData}>Alterar Data</Button>
        <FormControl id="valor" mb={3}>
            <FormLabel>Insira o novo valor</FormLabel>
            <Input placeholder="Insira o novo valor" onChange={e => setNewValor(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdateValor}>Alterar Valor</Button>
        <TableContainer ml={'50'} margin maxWidth={'800px'} width={'900px'} height={"full"}>
            <Table variant={'simple'} width={''}>
                <TableCaption>Orçamentos</TableCaption>
                <Thead>
                    <Tr>
                        <Th>Id do orçamento</Th>
                        <Th>Valor do orçamento</Th>
                        <Th>Descrição</Th>
                        <Th>Status</Th>
                        <Th>Data</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orcamento.map(orc => (
                        <Tr key={orc.idorcamento}>
                            <Th>{orc.idorcamento}</Th>
                            <Th>{orc.valororcamento}</Th>
                            <Th>{orc.probelmasorcamento}</Th>
                            <Th>{orc.statusorcamento === 1 ? 'Em análise' : 'Aprovado'}</Th>
                            <Th>{orc.dataorcamento}</Th>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
);

                    }
                    
export default createOrcamento