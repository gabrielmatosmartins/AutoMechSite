import {
  Box,
  Button,
  Flex,
  Table,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Home = () => {
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

          <Box overflowY="auto" height="80vh">
            <StatGroup>
              <Stat>
                <StatLabel>Serviços pendentes</StatLabel>
                <StatNumber>45 serviços</StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  +15.36%
                </StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Orçamentos pendentes</StatLabel>
                <StatNumber>10 orçamentos</StatNumber>
                <StatHelpText>
                  <StatArrow type='increase' />
                  10.05%
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Home;
