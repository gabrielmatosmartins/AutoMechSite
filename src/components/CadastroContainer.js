import React from 'react';
import '../css/cadastro.css'
import '../css/generalStyle.css'
import { LoginType } from "./LoginType";
import { 
    Container,
    Input,
    Button
 } from '@chakra-ui/react'

 import {
    Alert,
    AlertIcon
  } from '@chakra-ui/react'

import { Fade } from '@chakra-ui/react'
import { UsuarioDeslogado } from './EntidadesValidadas/usuarioDeslogado';

export class CadastroContainer extends React.Component{
    
    constructor(){
        super()
        this.validarCadastro = this.validarCadastro.bind(this)
        this.state = {showAlert: false,
            AlertMessage: "",
            status: ["info", "warning", "success", "error", "loading"]}
    }

    validarCadastro(){
        const nome = document.getElementById("caduser_nome").value
        const cpf = document.getElementById("caduser_cpf").value
        const email = document.getElementById("caduser_email").value
        const endereco = document.getElementById("caduser_endereco").value
        const numero = document.getElementById("caduser_numero").value
        const senha = document.getElementById("caduser_senha").value
        const repetesenha = document.getElementById("caduser_repetesenha").value
        const telefone = document.getElementById("caduser_telefone").value

        if(nome === "" || cpf === ""|| email === "" ||endereco === "" || numero === "" || telefone === "" ){
            if(senha === "" || repetesenha === "" || senha !== repetesenha){
                this.setState({showAlert:true, AlertMessage: "Preencha os dados corretamente", status:["error"]}) 
                setTimeout(() => {
                    this.setState({showAlert:false}) 
                }, 3500)
            }
        }
        else{
            this.cadastrarCliente();
        }
    }

    cadastrarCliente(){
        const dataUsuario = {
            "nome": document.getElementById("caduser_nome").value,
            "cpf": document.getElementById("caduser_cpf").value
        }

        const dataCliente = {
            "email": document.getElementById("caduser_email").value,
            "senha": document.getElementById("caduser_repetesenha").value,
            "endereco": document.getElementById("caduser_endereco").value,
            "telefone": document.getElementById("caduser_telefone").value
        }

        fetch("http://4.227.162.137:8080/Usuario", {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(dataUsuario)
          }).then(res => {
            return res.json();
        }).then(data => {
            debugger
            console.log(data)
            fetch(`http://4.227.162.137:8080/Cliente/`+data.id, {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(dataCliente)
              }).then(res => {
                if(res.status === 201){
                    window.location.href = "/login"
                }
            })
        });
    }

    render (){
        return(
            <>
                <UsuarioDeslogado/>
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
                <Container className="container">
                <div id='login' className="row">
                    <h1>CADASTRO</h1>
                    <div className="col-md-12 col-xs-6">
                        <div className="col-md-12 col-xs-6 mb-3 mt-5 text-center">
                            <img alt="" width="100px"/>
                        </div>
                        <div className="col-md-12 col-xs-6 mb-3 text-center">
                            <Input backgroundColor={'white'} h={12} className="infoFields" type="text" name="" id="caduser_nome" placeholder="Nome Completo" required/>
                        </div>
                        <div className="col-md-12 col-xs-6 mb-3 text-center">
                            <Input backgroundColor={'white'} h={12} className="infoFields" type="number" id="caduser_cpf" placeholder="CPF" required/>
                        </div>
                        <div className="col-md-12 col-xs-6 mb-3 text-center">
                            <Input backgroundColor={'white'} h={12} className="infoFields" type="email" name="" id="caduser_email" placeholder="E-mail" required/>
                        </div>
                        <div className="col-md-12 col-xs-6 mb-3 text-center">
                            <Input backgroundColor={'white'} h={12} className="infoFields" type="number" name="" id="caduser_telefone" placeholder="Celular" required/>
                        </div>

                        <div>
                            <h3>Endereço</h3>
                            <div className="col-md-12 col-xs-6 mb-3 text-center">
                                <Input backgroundColor={'white'} h={12} className="infoFields" type="text" name="" id="caduser_endereco" placeholder="Endereço" required/>
                            </div>
                            <div className="col-md-12 col-xs-6 mb-3 text-center">
                                <Input backgroundColor={'white'} h={12} className="infoFields" type="number" name="" id="caduser_numero" placeholder="Numero" required/>
                            </div>
                        </div>

                        <div>
                            <h3>Confirmação</h3>
                            <div className="col-md-12 col-xs-6 mb-3 text-center">
                                <Input backgroundColor={'white'} h={12} minLength={8} className="infoFields" type="password" name="" id="caduser_senha" placeholder="Senha" required/>
                            </div>
                            <div className="col-md-12 col-xs-6 mb-3 text-center">
                                <Input backgroundColor={'white'} h={12} minLength={8} className="infoFields" type="password" name="" id="caduser_repetesenha" placeholder="Confirmar Senha" required/>
                            </div>
                        </div>

                        <Input type="" id="id_logado" hidden/>

                        <div className="col-md-12 col-xs-6 mb-3 text-center">
                            <button className='btn-login' onClick={this.validarCadastro} marginTop={10} p={8} backgroundColor='Accent.1000' color={'white'} w={200}>Salvar</button>
                        </div>

                        <div id='jaTemConta' className="col-md-12 col-xs-6 text-center">
                                <a href="/login">Ja tenho uma conta cadastrada!</a>
                        </div>
                    </div>
                </div>
            </Container>
            </>
        
    )};
}

