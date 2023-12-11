import { Container, Table } from "react-bootstrap";
import { DoubleInput } from "./DoubleInput"
import { ClienteValidado } from "./EntidadesValidadas/clienteValidado";
import React, { useState } from "react";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button
  } from '@chakra-ui/react'

export function CadastroVeiculo(){
    const [showModal, setShowModal] = useState(false);

    const id = localStorage.getItem("id")

    fetch(`http://4.227.162.137:8080/Cliente/${id}/Veiculo`, {
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }).then(res => {
        return res.json()
    }).then(data => {
        let tbody = document.getElementById("tabela")
        let html = ""
        if(data != null){
            data.forEach(element => {
                html += `<tr>
                            <td>${element.id}</td>
                            <td>${element.marca}</td>
                            <td>${element.modelo}</td>
                            <td>${element.placa}</td>
                            <td>${element.ano}</td>
                            <td>
                                <button id=${element.id}>Apagar</button>
                            </td>
                        </tr>`
            });
        }
        tbody.innerHTML = html;

        for(let res of data){
            let element = document.getElementById(res.id)
            element.addEventListener('click', clickTR)
        }
    })

    function clickTR(e){
        localStorage.setItem("ToDelete", e.target.id)
        setShowModal(true)
    }

    function deletarRegistro(){
        let id = localStorage.getItem("ToDelete")
        if(id != null){
            fetch(`http://4.227.162.137:8080/Veiculo/${id}`, {
                method: "DELETE",
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                debugger
                return res.json()
            }).then(data => {
                if(data.status === 500){
                    alert(data.error)
                }
            })
        }
        localStorage.setItem("ToDelete", null)
        setShowModal(false)
    }

    function sumir(){
        setShowModal(false)
    }

    return(
        <>
        <ClienteValidado/>
        <div className='normalBackground'>

            { showModal ? 
                <AlertDialog
                    isOpen={showModal}
                    onClose={sumir}
                    >
                    <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Customer
                        </AlertDialogHeader>
            
                        <AlertDialogBody>Você tem certeza que deseja apagar este veiculo</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={sumir}>Cancel</Button>
                            <Button colorScheme='red' onClick={deletarRegistro} ml={3}>Delete</Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog> : null  
            }

            <Container>
                <DoubleInput
                    placeholder1 = "Modelo"
                    placeholder2 = "Placa"
                />

                <Table bordered hover>
                    <thead>
                    <tr >
                        <th>#</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Placa</th>
                        <th>Ano</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody id="tabela">
                    </tbody>
                </Table>
            </Container>
        </div>
        </>
    );
}