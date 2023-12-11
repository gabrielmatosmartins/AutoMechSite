import {
    Box,
    Button,
    Flex,
    Input,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Th,
    Textarea,
    Thead,
    Tr,
    FormControl,
    FormLabel
} from "@chakra-ui/react";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import { useEffect, useState } from "react";

const CadastrarReparo = () => {
    const [valorServico, setValorServico] = useState(0);
    const [descricaoServico, setDescricaoServico] = useState('');
    const [prazoServico, setPrazoServico] = useState([2024, 1, 20]);
    const [id, setId] = useState(1);

    const handleSubmit = () => {
        const reparo = {
            "valorreparo": valorServico,
            "descricaoreparo": descricaoServico,
            "prazoreparo": `${prazoServico[0]}-${prazoServico[1]}-${prazoServico[2]}`,
            "statusreparo": 1
        }

        fetch('http://4.227.162.137:8080/Reparo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reparo),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            console.log('Reparo criado com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };

    return (
        <Flex h="100vh" flexDirection="column">
            <Header />

            <Flex w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
                <Sidebar />

                <Box w="100%">
                    <SimpleGrid minChildWidth={400} h="fit-content" spacing="6">

                        <FormControl isRequired>
                            <FormLabel>Prazo para realização</FormLabel>
                            <Input
                                id="prazoReparo"
                                placeholder="Selecione data e hora"
                                size="md"
                                type="date"
                                onChange={(e) => setPrazoServico([e.target.value.split("-")[0], e.target.value.split("-")[1], e.target.value.split("-")[2]])}
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Valor do reparo</FormLabel>
                            <Input placeholder='Preço em R$' value={valorServico} onChange={(e) => setValorServico(e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Descrição do serviço</FormLabel>
                            <Textarea placeholder='Digite a descrição do serviço' value={descricaoServico} onChange={(e) => setDescricaoServico(e.target.value)} />
                        </FormControl>
                        <Button width={'100px'} marginTop={'30px'} onClick={handleSubmit}>Enviar</Button>

                    </SimpleGrid>

                </Box>
            </Flex>
        </Flex>
    )
}

export default CadastrarReparo
