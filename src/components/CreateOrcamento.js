import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

export const CreateOrcamento = () => {
    const [idorcamento, setIdorcamento] = useState('');
    const [probelmasorcamento, setProbelmasorcamento] = useState('');
    const [statusorcamento, setStatusorcamento] = useState(1);
    const [valororcamento, setValororcamento] = useState('');
    const [idveiculo, setIdveiculo] = useState('');

    const handleSubmit = () => {
        const orcamento = {
            idorcamento,
            probelmasorcamento,
            statusorcamento,
            valororcamento,
            veiculo: {
                id: idveiculo,
            },
        };

        fetch('http://4.227.162.137:8080/Orcamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orcamento),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Sucesso:', data);
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
    };

    return (
        <Box p={5}>
            <FormControl id="idorcamento" mb={3}>
                <FormLabel>Id do orçamento</FormLabel>
                <Input type="text" value={idorcamento} onChange={e => setIdorcamento(e.target.value)} />
            </FormControl>
            <FormControl id="probelmasorcamento" mb={3}>
                <FormLabel>Descrição do problema</FormLabel>
                <Input type="text" value={probelmasorcamento} onChange={e => setProbelmasorcamento(e.target.value)} />
            </FormControl>
            <FormControl id="statusorcamento" mb={3}>
                <FormLabel>Status do orçamento</FormLabel>
                <Input type="text" value={statusorcamento} readOnly />
            </FormControl>
            <FormControl id="idveiculo" mb={3}>
                <FormLabel>ID do Veículo</FormLabel>
                <Input type="text" value={idveiculo} onChange={e => setIdveiculo(e.target.value)} />
            </FormControl>
            <FormControl id="valororcamento" mb={3}>
                <FormLabel>Valor do orçamento</FormLabel>
                <Input type="text" value={valororcamento} onChange={e => setValororcamento(e.target.value)} />
            </FormControl>
            <Button colorScheme="blue" onClick={handleSubmit}>Enviar</Button>
        </Box>
    );
}
