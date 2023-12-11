import React, { useState } from 'react';
import { Box, FormControl, FormLabel, Input, NumberInput, NumberInputField, Button } from "@chakra-ui/react";

const Pecas = () => {


    const [tipopeca, setTipo] = useState("");
    const [valorpeca, setValor] = useState(0);
    const [descricaopeca, setDescricao] = useState("");
    const [quantidadepecas, setQuantidade] = useState(1);


    const hadnleSubmit=async (event)=>{
        event.preventDefault();

        const url='http://4.227.162.137:8080/Pecas';
        const response= await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idpeca: 1,
                tipopeca:tipopeca,
                valorpeca:valorpeca,
                descricaopeca:descricaopeca,
                quantidadepecas:quantidadepecas
            }),
        });
         const data=await response.json();
         console.log(data);
         window.location.reload();
    };


    return (
        <Box as="form" onSubmit={hadnleSubmit} p={5} shadow="md" borderWidth="1px">
            <FormControl isRequired>
                <FormLabel>Tipo de Peça</FormLabel>
                <Input placeholder="Tipo de Peça" value={tipopeca} onChange={(e) => setTipo(e.target.value)} />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>Valor da Peça</FormLabel>
                <NumberInput min={0} value={valorpeca} onChange={(valueString) => setValor(parseFloat(valueString))}>
                    <NumberInputField />
                </NumberInput>
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>Descrição da Peça</FormLabel>
                <Input placeholder="Descrição da peça" value={descricaopeca} onChange={(e) => setDescricao(e.target.value)} />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel>Quantidade de peças</FormLabel>
                <NumberInput min={1} value={quantidadepecas} onChange={(valueString) => setQuantidade(parseInt(valueString))}>
                    <NumberInputField />
                </NumberInput>
            </FormControl>

            <Button colorScheme="blue" type="submit" mt={4}>
                Adicionar Peça
            </Button>
        </Box>
    );
};

export default Pecas;
