import {
    Box,
    Button,
    Divider,
    Flex,
    Input,
    SimpleGrid,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Textarea,
    Thead,
    Tr,
    FormControl,
    FormLabel,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {Header} from "../components/Header";
import {Sidebar} from "../components/Sidebar";

export const Servicos = () => {
    const [valorServico, setValorServico] = useState(0);
    const [dataServico, setDataServico] = useState([2024, 1, 15]);
    const [descricaoServico, setDescricaoServico] = useState('');
    const [obsServico, setObsServico] = useState('');
    const [prazoServico, setPrazoServico] = useState([2024, 1, 20]);
    const [id, setId] = useState(1);
    const [listProducts, setListProducts] = useState([])
    const handleSubmit = () => {
        const servico = {
            valorServico,
            dataServico,
            descricaoServico,
            obsServico,
            prazoServico,
            id
        }
        fetch('http://4.227.162.137:8080/Servicos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(servico),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then(data => {
            console.log('Serviço criado com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    };
    

    const removeProduct = (id) => {
        fetch(`http://4.227.162.137:8080/Servicos/${id}`, {
            method: 'DELETE',
        })
        .then(data => {
            console.log('Produto removido com sucesso:', data);
        })
        .catch(error => {
            console.error('Erro:', error);
        });
    

        const newArray = listProducts.filter((prod) => prod.id !== id);

        localStorage.setItem("db_products", JSON.stringify(newArray));

        setListProducts(newArray);
    };
    const [servicos, setServicos] = useState([]);

    useEffect(() => {
        fetch('http://4.227.162.137:8080/Servicos/all')
            .then(response => response.json())
            .then(data => setServicos(data))
            .catch(error => console.error('Erro:', error));
    }, []);

    return (
        <Flex h="100vh" flexDirection="column">
        <Header />

        <Flex w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
            <Sidebar />

            <Box w="100%">
                <SimpleGrid minChildWidth={400} h="fit-content" spacing="6">

                <FormControl isRequired>
                        <FormLabel>Dara do serviço</FormLabel>
                        <Input
                            placeholder="Selecione data e hora"
                            size="md"
                            type="datetime-local"
                            value={new Date(dataServico[0], dataServico[1] - 1, dataServico[2]).toISOString().substring(0, 16)}
                            onChange={(e) => setDataServico([e.target.value.getFullYear(), e.target.value.getMonth() + 1, e.target.value.getDate()])}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Prazo para realização</FormLabel>
                        <Input
                            placeholder="Selecione data e hora"
                            size="md"
                            type="datetime-local"
                            value={new Date(prazoServico[0], prazoServico[1] - 1, prazoServico[2]).toISOString().substring(0, 16)}
                            onChange={(e) => setPrazoServico([e.target.value.getFullYear(), e.target.value.getMonth() + 1, e.target.value.getDate()])}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Valor do serviço</FormLabel>
                        <Input placeholder='Preço em R$' value={valorServico} onChange={(e) => setValorServico(e.target.value)} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Obs Serviço</FormLabel>
                        <Textarea placeholder='Digite a descrição do serviço' value={obsServico} onChange={(e) => setObsServico(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Descrição do serviço</FormLabel>
                        <Textarea placeholder='Digite a descrição do serviço' value={descricaoServico} onChange={(e) => setDescricaoServico(e.target.value)} />
                    </FormControl>
                    <Button width={'100px'} marginTop={'30px'}onClick={handleSubmit}>Enviar</Button>

                    </SimpleGrid>

                     <Box overflowY="auto" height="80vh">
            <Table mt="6">
                <Thead>
                    <Tr>
                        <Th fontWeight="bold" fontSize="14px">Nome</Th>
                        <Th fontWeight="bold" fontSize="14px">Prazo do serviço</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {servicos.map((servico, i) => (
                        <Tr key={i}>
                            <Td color="gray.500">{servico.descricaoServico}</Td>
                            <Td>{new Date(servico.prazoServico).toLocaleDateString()}</Td>
                            <Td textAlign="end">
                                <Button
                                    p="2"
                                    h="auto"
                                    fontSize={11}
                                    color="red.500"
                                    fontWeight="bold"
                                    onClick={() => removeProduct(servico.id)}
                                >
                                    EXCLUIR
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>

                </Box>
            </Flex>
        </Flex>
    );
}
