import React from "react";
import "./style.css";
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";

import { Spinner } from '@chakra-ui/react'

export const TableResult = ( { busca }) => {

    busca = busca == null || busca == undefined ? "" : busca;

    const [spinner, setSpinner] = useState(true)

    let navigate = useNavigate();
   
    async function getOficinas(url){
        const response = await fetch(url, { method: 'GET' })
        var data = await response.json();
        showOficinas(data)
    }

    async function showOficinas(data){

        var tabela = document.getElementById('oficinasTbody');
        setSpinner(true);

        if(tabela !== null && tabela !== undefined){
            
            document.getElementById('oficinasTbody').innerHTML = '';
            let table = "";

            for(let resultado of data){
                let tdEspecialidade = "";
                let especialidades = await returnEspecialidades(resultado.id)
                
                for(let i = 0; i < especialidades.length; i++){
                    tdEspecialidade += `<p id="tagsOficinas">${especialidades[i]}</p>`
                }

                table += `<tr class="trOficina" id=${resultado.id}>
                            <td>${resultado.id}</td>
                            <td>${resultado.nome}</td>
                            <td>${resultado.endereco}</td>
                            <td>${resultado.telefone}</td>
                            <td style="width: 600px">${tdEspecialidade}</td>
                        </tr>`
            }

            if(document.getElementById('oficinasTbody') !== null && document.getElementById('oficinasTbody') !== undefined){
                document.getElementById('oficinasTbody').innerHTML = table
                for (let res of data) {
                    document.getElementById(res.id).addEventListener('click', clickTR(res.id));
                }
            }
        
            setSpinner(false)

        } else{
            document.getElementById('oficinasTbody').innerHTML = "";
        }
    }

    function clickTR(idOficina){
        return function () {
            let path = `Detalhes/${idOficina}`;
            navigate(path, { state: { idOficina } });
        };
    }

    async function returnEspecialidades(id){
        var url = `http://4.227.162.137:8080/Oficina/RetornarEspecialidades?idOficina=${id}`
        const result = fetch(url)
        const response = await fetch(url, { method: 'GET' })
        var data = await response.json();
        console.log(data)
        return data;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (busca.length > 1 || busca == "") {
                let url = `http://4.227.162.137:8080/Oficina/Pesquisar?textoPesquisa=${busca}`
                getOficinas(url)
            }
          }, 500)
        return () => clearTimeout(timer)
    }, [busca]) 
        
        

    return (
        
        <div class="wrap-table">
            
            <Table id="tableOficinas" striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Oficina</th>
                        <th>Endereço</th>
                        <th>Telefone</th>
                        <th>Especialidades</th>
                    </tr>
                </thead>

                { spinner == true ? <Spinner /> : null }

                <tbody id="oficinasTbody">
                    
                </tbody>
            </Table>
        </div>
    );
};


