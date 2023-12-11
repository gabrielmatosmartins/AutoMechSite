import { 
    Container,
    Input,
    HStack,
    Button
 } from '@chakra-ui/react'

 import {
    Alert,
    AlertIcon
  } from '@chakra-ui/react'

import { Fade } from '@chakra-ui/react'

import React from 'react';
import { ClienteValidado } from './EntidadesValidadas/clienteValidado';

export class AlterarCadastro extends React.Component{
    
    constructor(){
        super();
        this.state = {showAlert: false,
                      AlertMessage: "",
                      status: ["info", "warning", "success", "error", "loading"]}
        this.getData = this.getData.bind(this)
        this.updateData = this.updateData.bind(this)
        this.getData()
    }

    updateData(){
        const nome = document.getElementById("caduser_nome").value
        const cpf = document.getElementById("caduser_cpf").value
        const email = document.getElementById("caduser_email").value
        const endereco = document.getElementById("cadend_endereco").value
        const senha = document.getElementById("caduser_senha").value
        const repetesenha = document.getElementById("caduser_conSenha").value
        const telefone = document.getElementById("caduser_telefone").value

        if(nome === "" || cpf === ""|| email === "" ||endereco === "" || telefone === ""){
            alert("Preencha os dados corretamente");
        }
        else{
            if(senha === "" || repetesenha === "" || senha !== repetesenha){
                this.setState({showAlert:true, AlertMessage: "Senhas não conferem", status:["error"]}) 
                setTimeout(() => {
                    this.setState({showAlert:false}) 
                }, 3500)
                return
            }

            const id = localStorage.getItem("id")

            const clienteData = {
                "email": document.getElementById("caduser_email").value,
                "senha": document.getElementById("caduser_conSenha").value,
                "endereco": document.getElementById("cadend_endereco").value,
                "telefone": document.getElementById("caduser_telefone").value
            }

            const dataUsuario = {
                "nome": document.getElementById("caduser_nome").value,
                "cpf": document.getElementById("caduser_cpf").value
            }

            fetch("http://4.227.162.137:8080/Cliente/"+id, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(clienteData)
            })

            fetch(`http://4.227.162.137:8080/Usuario/`+id, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(dataUsuario)
              }).then(res => {
                if(res.status === 204){
                    if(res.status === 204){ 
                        this.setState({showAlert:true, AlertMessage: "Dados atualizados no servidor com sucesso", status:["success"]}) 
                        setTimeout(() => {
                            this.setState({showAlert:false}) 
                        }, 3500)
                        
                    }
                }
            })
        }
    }

    getData(){
        const id = localStorage.getItem("id")
        if(id === null || id === undefined){
            alert("Você precisa estar logado para executar essa ação")
            window.location.href = "/login"
        }else{
            fetch("http://4.227.162.137:8080/Cliente/"+id, {
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                return res.json()
            }).then(data => {
                document.getElementById("caduser_cpf").value = data.usuario.cpf
                document.getElementById("caduser_nome").value = data.usuario.nome
                document.getElementById("caduser_email").value = data.email
                document.getElementById("caduser_senha").value = data.senha
                document.getElementById("caduser_telefone").value = data.telefone
                document.getElementById("cadend_endereco").value = data.endereco
            })
        }
    }
    
    render(){
        return(
            <>
                <ClienteValidado/>
                {this.state.showAlert ? 
                    <>
                        <Fade in={this.state.showAlert}>
                            <Alert roundedBottomLeft={6} roundedTopLeft={6} id='alert' w={800} float={'right'} status={this.state.status}>
                                <AlertIcon />
                                {this.state.AlertMessage}
                            </Alert>
                        </Fade>
                        
                    </>:
                    null
                }
                <Container color={'black'} className='container' backgroundImage={"../img/wallpaper.pmg"} maxW='container.sm'>
                    <h2>Dados Pessoais</h2>
    
                    <HStack spacing={12}>
                        <Input disabled backgroundColor={'white'} h={12} w={200} class="editFields" type="text" name="" id="caduser_cpf" placeholder="CPF" required/>
                        <Input backgroundColor={'white'} h={12} class="editFields" type="text" name="" id="caduser_nome" placeholder="Nome Completo" required/>
                    </HStack>
    
                    <HStack spacing={12} marginTop={10}>
                        <Input backgroundColor={'white'} h={12} w={1400} class="editFields" type="email" name="" id="caduser_email" placeholder="E-mail" required/>
                        <Input backgroundColor={'white'} h={12} w={800} class="editFields" type="number" name="" id="caduser_telefone" placeholder="Celular" required/>
                        <Input backgroundColor={'white'} h={12} class="editFields" type="password" name="" id="caduser_senha" placeholder="Senha" required/>
                        <Input backgroundColor={'white'} h={12} class="editFields" type="password" name="" id="caduser_conSenha" placeholder="Confirmar senha" required/>
                    </HStack>
    
                    <h2>Endereço</h2>
                    <HStack spacing={12} marginTop={10}>
                        <Input backgroundColor={'white'} h={12} w={2000} class="editFields" type="text" name="" id="cadend_endereco" placeholder="Logradouro" required/>
                    </HStack>
                           
                    <button className='btn-login' onClick={this.updateData} marginTop={10} p={8} backgroundColor='Accent.1000' color={'white'} w={200}>Salvar</button>
                </Container>
              
            </>
        );
    }
}