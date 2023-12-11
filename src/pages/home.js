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

  setTimeout(() => {
    indicadorTrimestralClientes()
    getIndicadores()
    getIndicadoresAvaliacao()
  }, 3000)

  async function getIndicadoresAvaliacao(){
    let url = `http://4.227.162.137:8080/Avaliacao/indicadores`
    const response = await fetch(url, { method: 'GET' })
    var data = await response.json();
    console.log(data.valor)

    document.getElementById('mediaAvaliacoes').innerHTML = data.valor + " estrelas"
  }

  async function getIndicadores(){
    let url = `http://4.227.162.137:8080/Reparo/Indicadores`
    const response = await fetch(url, { method: 'GET' })
    var data = await response.json();
    console.log(data)

    document.getElementById('reparosDentroPrazo').innerHTML = data.valor + "%"
  }

  async function indicadorTrimestralClientes(){
    let url = `http://4.227.162.137:8080/Cliente/indicador`
    const response = await fetch(url, { method: 'GET' })

    let data = (await response.text()).replace("[","").replace("]", "").split(",");

    let trimestre = 1
    data.forEach(e => {
      let string = Number(data[trimestre-1]).toFixed(0) + "%"
      document.getElementById(`crescimentoClientes-trimestre-${trimestre}`).innerHTML = `${trimestre}º Trimestre: ${string}`
      trimestre++
    })
  }

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
                <StatLabel>Média das avaliações</StatLabel>
                <StatNumber id='mediaAvaliacoes'></StatNumber>
                <StatHelpText>Indicador da media de todas as avaliações</StatHelpText>
              </Stat>

              <Stat>
                  <StatLabel>Crescimento de clientes em relação ao último trimestre</StatLabel>
                  <StatNumber id='crescimentoClientes-trimestre-1'></StatNumber>
                  <StatNumber id='crescimentoClientes-trimestre-2'></StatNumber>
                  <StatNumber id='crescimentoClientes-trimestre-3'></StatNumber>
                  <StatNumber id='crescimentoClientes-trimestre-4'></StatNumber>
                  <StatHelpText>Indicador de período anual</StatHelpText>
              </Stat>

              <Stat>
                <StatLabel>Reparos finalizados dentro do prazo</StatLabel>
                <StatNumber id='reparosDentroPrazo'></StatNumber>
                <StatHelpText>Indicador de todo o período</StatHelpText>
              </Stat>

            </StatGroup>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
export default Home;
