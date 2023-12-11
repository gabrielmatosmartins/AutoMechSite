import '../../App.css';
import '../../css/search.css'
import '../../css/style.css'

import { FuncionarioValidado } from '../EntidadesValidadas/funcionarioValidado';

import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from '@chakra-ui/react'

export function IndicadoresScreen() {
    getIndicadores()
    indicadorTrimestralClientes()

    async function getIndicadores(){
        let url = `http://4.227.162.137:8080/Reparo/Indicadores`
        const response = await fetch(url, { method: 'GET' })
        var data = await response.json();
  
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

  return (
    
    <div>
        <FuncionarioValidado/>
        <Stat id='wrapIndicadores'>
            <StatLabel>Reparos finalizados dentro do prazo</StatLabel>
            <StatNumber id='reparosDentroPrazo'></StatNumber>
            <StatHelpText>Indicador de todo o período</StatHelpText>
        </Stat>

        <Stat id='wrapIndicadores'>
            <StatLabel>Crescimento de clientes em relação ao último trimestre</StatLabel>
            <StatNumber id='crescimentoClientes-trimestre-1'></StatNumber>
            <StatNumber id='crescimentoClientes-trimestre-2'></StatNumber>
            <StatNumber id='crescimentoClientes-trimestre-3'></StatNumber>
            <StatNumber id='crescimentoClientes-trimestre-4'></StatNumber>
            <StatHelpText>Indicador de período anual</StatHelpText>
        </Stat>
    </div>
  );
}