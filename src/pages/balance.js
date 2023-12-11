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

function Balance() {

  useEffect(() => {

  }, []);


  const [showOrcamento, setShowOrcamento] = useState(false);
  const [showCreateOrc, setCreateOrc] = useState(false);

  return (

    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">

          <Box overflowY="auto" height="80vh">
            
            
            <Button left={'3'} top={'500'} onClick={() => {
              setShowOrcamento(!showOrcamento);
              setCreateOrc(false);
            }}>
              Orçamento
            </Button>

            {showOrcamento && !showCreateOrc && (
              <Flex>
                <GetOrcamento />
                <Button left={'3'} top={'460'} onClick={() => setCreateOrc(!showCreateOrc)}>
                  Fazer Orçamento
                </Button>
              </Flex>
            )}
            {showCreateOrc &&
              <Container>
                <CreateOrcamento />
              </Container>
            }


          </Box>
        </Box>
      </Flex>
    </Flex>

  )
}

export default Balance;
