import {
  Container,
  Image,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Flex,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, 
  Input, 
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import GetOrcamento from "../components/GetOrcamento";
import CreateOrcamento from "../components/CreateOrcamento";

const Balance = () => {
  const [listProducts, setListProducts] = useState([]);
  const [productFiltered, setProductFiltered] = useState("");
  const [cmbProducts, setCmbProducts] = useState([]);

  const BuildBalanceArray = () => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    const db_stock_entries = localStorage.getItem("db_stock_entries")
      ? JSON.parse(localStorage.getItem("db_stock_entries"))
      : [];

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    const newArray = [];

    db_products.map((prod) => {
      const entries = db_stock_entries
        .filter((item) => item.product_id === prod.id)
        .map((entry) => Number(entry.amount))
        .reduce((acc, cur) => acc + cur, 0);

      const outputs = db_stock_outputs
        .filter((item) => item.product_id === prod.id)
        .map((entry) => Number(entry.amount))
        .reduce((acc, cur) => acc + cur, 0);

      const total = Number(entries) - Number(outputs);

      newArray.push({
        product_id: prod.id,
        product_name: prod.name,
        amount: total,
      });

      setListProducts(newArray);
      setCmbProducts(newArray);
    });
  };

  useEffect(() => {
    BuildBalanceArray();
  }, []);

  const handleFilterProducts = () => {
    if (!productFiltered) {
      setListProducts(cmbProducts);
      return;
    }

    const newArray = cmbProducts.filter(
      (item) => item.product_id === productFiltered
    );

    setListProducts(newArray);
  };

  const [showOrcamento, setShowOrcamento] = useState(false);
  const [showCreateOrc,setCreateOrc]=useState(false);

  return (
    



<Flex h="100vh" flexDirection="column">
<Header />

<Flex w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
  <Sidebar />

  <Box w="100%">

    <Box overflowY="auto" height="80vh">
       <GetOrcamento/>
                    
                    <Button left={'3'} top={'500'} onClick={() => {
                    setShowOrcamento(!showOrcamento);
                    setCreateOrc(false);
                }}>
                   Orçamento
                </Button>
      
                {showOrcamento && !showCreateOrc && (
                <Flex>
                    <GetOrcamento/>
                    <Button left={'3'} top={'460'} onClick={()=> setCreateOrc(!showCreateOrc)}>
                          Fazer Orçamento
                       </Button>
                </Flex>
            )}
            {showCreateOrc &&
                <Container>
                    <CreateOrcamento/>
                </Container>
            }


    </Box>
  </Box>
</Flex>
</Flex>

  )
}

export default Balance;
