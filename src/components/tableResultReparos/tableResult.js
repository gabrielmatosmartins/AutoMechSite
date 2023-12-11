import React from "react";
import { useState } from 'react';

import { Table, Tbody, Td, Th, Thead, Tr  } from "@chakra-ui/react";

import { Box, Select } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Alert, AlertIcon } from '@chakra-ui/react'

import { Spinner } from '@chakra-ui/react'

export const TableResultReparos = () => {

    const [alert, setAlert] = useState({active: false, type: '', msg: ''})
    const [spinner, setSpinner] = useState(false)
    // retornarOrcamentos()

    async function retornarOrcamentos(){
        const response = await fetch(`http://4.227.162.137:8080/Orcamentos/all`, { method: 'GET' })
        var data = await response.json();
        var campo = document.getElementById('selectOrcamento');
        var options = '';
  
        for(var i =0; i< data.length; i++){
          options = '<option value="'+ data[i].idorcamento +'">Orçamento '+ data[i].idorcamento +'</option>'
          campo.innerHTML += options;
        }
    }

    async function getReparos(){
        let idOrcamento = 2 //document.getElementById("selectOrcamento").value;
        let url = `http://4.227.162.137:8080/Reparo/Pesquisar?idOrcamento=${idOrcamento}`
        const response = await fetch(url, { method: 'GET' })
        var data = await response.json();
        showReparos(data)
    }

    async function showReparos(data){
        document.getElementById('reparosTbody').innerHTML = '';
        document.getElementById('selectOrcamento').innerHTML = '';
        setSpinner(true);
        let table = "";
        if(data.length == 0){

            table += `<tr class="trReparo">
                            <td colspan="4">
                                <div><h3>Nenhum resultado encontrado!</h3></div>
                            </td>
                        </tr>`
        } else{

            for(let resultado of data){

                table += `<tr class="trReparo" id=${resultado.idreparo}>
                            <td>
                                <input type="checkbox" class="custom-control-input" id="checkBoxReparo" value="${resultado.idreparo}">
                                <label class="custom-control-label" for="customCheck1"></label>
                            </td>
                            <td>${resultado.prazoreparo[2]}/${resultado.prazoreparo[1]}/${resultado.prazoreparo[0]}</td>
                            <td>${resultado.descricaoreparo}</td>
                            <td>R$ ${resultado.valorreparo}</td>
                        </tr>`
            }
    
            document.getElementById('reparosTbody').innerHTML = table
        }

        setSpinner(false);
    }

    async function finalizarReparos(){
        var inputsPost = []
        var inputsElements = document.querySelectorAll("input[type=checkbox]")
        for(var i =0; i < inputsElements.length; i++){
            if(inputsElements[i].checked == true)
            inputsPost.push(parseInt(inputsElements[i].value))
        }

        let url = `http://4.227.162.137:8080/Reparo/FinalizarReparo?idReparo=${inputsPost}`
        const response = await fetch(url, { method: 'POST' })
        var data = await response.json();

        if(data){
           setAlert({active: true, type: 'success', msg: 'Reparos finalizados com sucesso!'})
           const timer = setTimeout(() => {
            setAlert(false)
          }, 5000)
        return () => clearTimeout(timer)

        } else{
            setAlert({active: true, type: 'error', msg: 'Erro ao finalizar reparo!'})

            const timer = setTimeout(() => {
                setAlert(false)
              }, 5000)
            return () => clearTimeout(timer)
        }
    }
    
    return (
        <Box padding="6" overflowX="auto">
             {
                alert.active == true ? <Alert status={alert.type} variant='left-accent' id="alert">
                                            <AlertIcon />
                                            {alert.msg}
                                        </Alert> :
                                        null

            }
            <Box id="top-itens">
                <Select hidden placeholder='Selecione um orçamento' id="selectOrcamento" variant='filled'>

                </Select>
                <Button mt="6" color='#f7b925' backgroundColor='#575756' variant='ghost' onClick={getReparos}>Pesquisar</Button>
            </Box>
            <Table id="tableReparos" Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Prazo finalização</Th>
                        <Th>Descrição</Th>
                        <Th>Valor do reparo</Th>
                    </Tr>
                </Thead>
                { spinner == true ? <Spinner /> : null }
                <Tbody id="reparosTbody">
                    
                </Tbody>
            </Table>

            <Box mt="2" className="btnGroup">
                <Button color='#f7b925' backgroundColor='#575756' onClick={finalizarReparos}>Finalizar reparos</Button>
            </Box>

        </Box>
    );
};
