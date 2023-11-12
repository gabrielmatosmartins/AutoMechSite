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
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Servicos = () => {
    const [name, setName] = useState("");
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        const db_products = localStorage.getItem("db_products")
            ? JSON.parse(localStorage.getItem("db_products"))
            : [];

        setListProducts(db_products);
    }, []);

    const handleNewProduct = () => {
        if (!name) return;
        if (verifyProductName()) {
            alert("Produto já cadastrado!");
            return;
        }

        const id = Math.random().toString(36).substring(2);

        if (listProducts && listProducts.length) {
            localStorage.setItem(
                "db_products",
                JSON.stringify([...listProducts, { id, name }])
            );

            setListProducts([...listProducts, { id, name }]);
        } else {
            localStorage.setItem("db_products", JSON.stringify([{ id, name }]));

            setListProducts([{ id, name }]);
        }

        setName("");
    };

    const verifyProductName = () => {
        return !!listProducts.find((prod) => prod.name === name);
    };

    const removeProduct = (id) => {
        const db_stock_outputs = localStorage.getItem("db_stock_outputs")
            ? JSON.parse(localStorage.getItem("db_stock_outputs"))
            : [];

        const db_stock_entries = localStorage.getItem("db_stock_entries")
            ? JSON.parse(localStorage.getItem("db_stock_entries"))
            : [];

        const hasOutputs = db_stock_outputs.filter(
            (item) => item.product_id === id
        ).length;
        const hasEntries = db_stock_entries.filter(
            (item) => item.product_id === id
        ).length;

        if (hasEntries || hasOutputs) {
            alert("Esse produto possuí movimentações!");
            return;
        }

        const newArray = listProducts.filter((prod) => prod.id !== id);

        localStorage.setItem("db_products", JSON.stringify(newArray));

        setListProducts(newArray);
    };

    return (
        <Flex h="100vh" flexDirection="column">
            <Header />

            <Flex w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
                <Sidebar />

                <Box w="100%">
                    <SimpleGrid minChildWidth={400} h="fit-content" spacing="6">

                        <FormControl isRequired>
                            <FormLabel>Nome do cliente</FormLabel>
                            <Input placeholder='Nome do cliente' value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Prazo para realização</FormLabel>
                            <Select placeholder='Selelecione o prazo do serviço'>
                                <option>1 dia</option>
                                <option>1 dia a 2 dias</option>
                                <option>3 dias</option>
                                <option>4 dias</option>
                                <option>6 dias</option>
                                <option>7 dias</option>
                                <option>2 semanas</option>
                            </Select>
                        </FormControl>

                        <FormControl isnotRequired>
                            <FormLabel>Data e Hora</FormLabel>
                            <Input
                                placeholder="Selecione data e hora"
                                size="md"
                                type="datetime-local"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Quantidade de peças</FormLabel>
                            <NumberInput defaultValue={0} min={0} max={50}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>

                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Tipo de serviço</FormLabel>
                            <Select placeholder='Selelecione o tipo de serviço'>
                                <option>Pneu, rodas e afins</option>
                                <option>Retificação de motor</option>
                                <option>Troca de óleo</option>
                                <option>Caixa de embreagem</option>
                                <option>Armotecedores</option>
                                <option>Sistemas de arrefecimento</option>
                                <option>Filtros</option>
                            </Select>
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Valor do seviço</FormLabel>
                            <Input placeholder='Preço em R$' value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl>


                        <FormControl isRequired>
                            <FormLabel>Descrição do serviço</FormLabel>
                            <Textarea placeholder='Digite a descrição do serviço' />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Status do Serviço</FormLabel>
                            <Select placeholder='Selelecione o status do seriço'>
                                <option>Pendente</option>
                                <option>Iniciado</option>
                                <option>Concluído</option>
                                <option>Entregue</option>
                            </Select>
                        </FormControl>

                    </SimpleGrid>

                    <Button w="40" top='250' onClick={handleNewProduct}>
                        SALVAR
                    </Button>


                    <Box overflowY="auto" height="80vh">
                        <Table mt="6">
                            <Thead>
                                <Tr>
                                    <Th fontWeight="bold" fontSize="14px">
                                        Nome
                                    </Th>
                                    <Th fontWeight="bold" fontSize="14px">
                                        Prazo do serviço
                                    </Th>
                                    <Th></Th>
                                </Tr>

                            </Thead>
                            <Tbody>
                                {listProducts.map((item, i) => (
                                    <Tr key={i}>
                                        <Td color="gray.500">{item.name}</Td>
                                        <Td textAlign="end">
                                            <Button
                                                p="2"
                                                h="auto"
                                                fontSize={11}
                                                color="red.500"
                                                fontWeight="bold"
                                                onClick={() => removeProduct(item.id)}
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
export default Servicos;