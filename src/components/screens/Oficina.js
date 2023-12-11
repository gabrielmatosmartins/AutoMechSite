import '../../App.css';
import '../../css/style.css'
import '../../css/detalhes.css'
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";

//Imports Chakra
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'

import { ClienteValidado } from "../EntidadesValidadas/clienteValidado"

export function OficinaScreen() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)

    const location = useLocation();
    const dadosOficinas = location.state.idOficina;
    console.log(parseInt(dadosOficinas))
    const id = localStorage.getItem("id")
    
    getDadosOficina(parseInt(dadosOficinas))
    
    async function getDadosOficina(id){

      let url = `http://4.227.162.137:8080/Oficina/Detalhes/${id}`
      const response = await fetch(url, { method: 'GET' })
      var data = await response.json();

      console.log(data)

      document.getElementById('nomeOficina').innerHTML = data.nome
      document.getElementById('descricaoOficina').innerHTML = data.descricao
      document.getElementById('horarioFuncionamento').innerHTML = data.horarioFuncionamento
      document.getElementById('enderecoOficina').innerHTML = data.endereco
    }

    async function retornarVeiculos(id){
      const response = await fetch(`http://4.227.162.137:8080/Cliente/${id}/Veiculo`, { method: 'GET' })
      var data = await response.json();
      var campo = document.getElementById('selectVeiculo');
      var options = '';

      for(var i =0; i< data.length; i++){

        options = '<option value="'+ data[i].id +'">'+ data[i].marca + " " + data[i].modelo +'</option>'
        campo.innerHTML += options;

      }
    }

    async function retornarUmVeiculo(){
      let idVeiculo = document.getElementById('selectVeiculo').value
      const response = await fetch(`http://4.227.162.137:8080/Veiculo/${idVeiculo}`, { method: 'GET' })
      var data = await response.json();
      return data;
    }

    async function fazerOrcamento(id){
      let url = `http://4.227.162.137:8080/Orcamentos/Create`
      let idVeiculo = await retornarUmVeiculo()
      if (idVeiculo.length < 0){
        alert("Você não possui nenhum veículo cadastrado!")
        return false;
      }

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          statusorcamento: 1,
          descricaoorcamento: "Teste",
          valororcamento: 0,
          dataorcamento: '01/01/1900',
          veiculo: idVeiculo
         })
    };
  
    const response = await fetch(url, requestOptions);
    const data = await response.json();
    onClose()
    }

    return (
      <>
        <ClienteValidado/>
        <div className='normalBackground'  id='wrapDados'>
            <Grid id='containerDadosOficina'
              templateAreas={`"header header"
                              "nav main"
                              "nav footer"`}
              gridTemplateRows={'50px 1fr 30px'}
              gridTemplateColumns={'30% 1fr'}
              gap='1'
              color='blackAlpha.700'
              fontWeight='bold'
              >
              <GridItem pl='2' area={'header'}>
                <h3 id='nomeOficina'></h3>
              </GridItem>

              <GridItem pl='2' area={'nav'}>
                <div id='infoOficina'>
                  <h4>Funcionamento:</h4>
                  <p id='horarioFuncionamento'></p>

                  <h4>Endereço:</h4>
                  <p id='enderecoOficina'></p>
                </div>
              </GridItem>

              <GridItem pl='2' area={'main'}>
                <p id='descricaoOficina'></p>
              </GridItem>
              
              <GridItem pl='2' area={'footer'}>
                <Button color='#f7b925' backgroundColor='#575756' variant='ghost' id='fazerOrcamento' onClick={() => {
                onOpen();
                retornarVeiculos(id);
              }}>Realize seu orçamento</Button>
              </GridItem>
            </Grid>

            <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Orçamento</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Selecione o veículo</FormLabel>
              <Select id="selectVeiculo">

              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={fazerOrcamento} color='#f7b925' backgroundColor='#575756' variant='ghost' mr={3}>
              Fazer Orçamento
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

        </div>
      </>
    );
  }