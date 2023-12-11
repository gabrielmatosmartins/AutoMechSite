import React from "react";
import { useState, useEffect } from 'react';
import "./style.css";
import { Table } from 'react-bootstrap';

import { Select } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
  } from '@chakra-ui/react'

  import { Spinner } from '@chakra-ui/react'

export const TableResultReparos = () => {

    const [alert, setAlert] = useState({active: false, type: '', msg: ''})
    const [spinner, setSpinner] = useState(false)
    retornarOrcamentos()

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
        let idOrcamento = document.getElementById("selectOrcamento").value;
        let url = `http://4.227.162.137:8080/Reparo/Pesquisar?idOrcamento=${idOrcamento}`
        const response = await fetch(url, { method: 'GET' })
        var data = await response.json();
        console.log(data)
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
        <>
            
            {
                alert.active == true ? <Alert status={alert.type} variant='left-accent' id="alert">
                                            <AlertIcon />
                                            {alert.msg}
                                        </Alert> :
                                        null

            }
            
        <div className="wrap-table">
            <div id="top-itens">
                <Select placeholder='Selecione um orçamento' id="selectOrcamento" variant='filled'>

                </Select>
                <Button color='#f7b925' backgroundColor='#575756' variant='ghost' onClick={getReparos}>Pesquisar</Button>
            </div>
            <Table id="tableReparos" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Prazo finalização</th>
                        <th>Descrição</th>
                        <th>Valor do reparo</th>
                    </tr>
                </thead>
                { spinner == true ? <Spinner /> : null }
                <tbody id="reparosTbody">
                    
                </tbody>
            </Table>

            <div className="btnGroup">
                    <Button color='#f7b925' backgroundColor='#575756'>Informar cliente</Button>
                    <Button color='#f7b925' backgroundColor='#575756' onClick={finalizarReparos}>Finalizar reparos</Button>
            </div>

        </div>
    </>
    );
};
