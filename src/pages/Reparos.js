import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import React from "react";
import { 
  	Flex,
    Box
} from "@chakra-ui/react";

import { TableResultReparos } from '../components/tableResultReparos/tableResult';

function RepairScreen() {
  return (
    <Flex h="100vh" flexDirection="column">
      <Header />
      <Flex  w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
        <Sidebar />
        <Box padding={2} w="100%">
          <TableResultReparos></TableResultReparos>
        </Box>
      </Flex>
    </Flex>
    
  );
}

export default RepairScreen