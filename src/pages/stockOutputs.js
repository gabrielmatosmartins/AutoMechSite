import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Pecas from "../components/pecas"
import TabelaPecas from "../components/Tabelapecas"

const StockOutputs = () => {
  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">
          <Pecas/>
          <TabelaPecas/>
        </Box>
      </Flex>
    </Flex>
  );
};

export default StockOutputs;
