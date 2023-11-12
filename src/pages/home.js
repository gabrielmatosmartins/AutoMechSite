import {
  Box,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
}
  from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MeusOrcamentos from "../components/meusOrcamentos";
import MeusServicos from "../components/meusServicos";
import Avaliacao from "../components/avaliacao";



const Home = () => {
  useEffect(() => {
  }, []);

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
           

            <MeusServicos />
            <Avaliacao />

          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Home;
