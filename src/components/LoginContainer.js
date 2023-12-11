import React from 'react'
import '../css/generalStyle.css'
import '../css/login.css'

import {
    Alert,
    AlertIcon,
    Input,
    Portal
} from '@chakra-ui/react'

import { Fade } from '@chakra-ui/react'
import { UsuarioDeslogado } from './EntidadesValidadas/usuarioDeslogado'

export class LoginContainer extends React.Component{
    constructor(){
        super()
        this.logar = this.logar.bind(this)
        this.fetchUser = this.fetchUser.bind(this)
        this.state = {showAlert: false,
            AlertMessage: "",
            status: ["info", "warning", "success", "error", "loading"]}
    }


    logar(){
        const tipo = document.querySelector('input[name="loginType"]:checked').value

        if(tipo == 0){
            this.fetchUser("Cliente", tipo)
        }else if(tipo == 1){
            this.fetchUser("Funcionario", tipo)
        }
    }

    fetchUser(controller, tipo){
        const email = document.getElementById("caduser_email").value
        fetch(`http://4.227.162.137:8080/${controller}/logar/${email}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            return res.json()
        }).then(data => {
            const senha = document.getElementById("caduser_senha").value
            if(senha === data.senha){
                localStorage.setItem("id", data.userId)
                localStorage.setItem("tipo", tipo)

                let hrefOficina = window.location.protocol + `//localhost:3000/home?id=${data.userId}&tipo=${tipo}` 
                let hrefCliente = `/oficina`

                window.location.href = (tipo == 0 ? hrefCliente : hrefOficina)
            }else{
                this.setState({showAlert:true, AlertMessage: "Email ou senha incorretos", status:["error"]}) 
                setTimeout(() => {
                    this.setState({showAlert:false}) 
                }, 60000)
            } 
        })
    }


    render(){
        return(
            <>
                <UsuarioDeslogado/>
                {
                    this.state.showAlert ? 
                    <>
                        <Fade in={this.state.showAlert}>
                            <Alert className='alertDialog' roundedBottomLeft={6} roundedTopLeft={6} id='alert' w={800} float={'right'} status={this.state.status}>
                                <AlertIcon />
                                {this.state.AlertMessage}
                            </Alert>
                        </Fade>
                    </>:
                    null
                }
                <div class="container">
                    <div class="row round-container-small">
                        <h1>LOGIN</h1>
                        <div class="col-md-12 col-xs-1">
                            <div class="col-md-12 col-xs-6 mb-3 text-center">
                                <Input backgroundColor={'white'} h={12} className="infoFields" type="email" name="" id="caduser_email" placeholder="email" required/>
                            </div>

                            <div class="col-md-12 col-xs-6 mb-3 text-center">
                                <Input backgroundColor={'white'} h={12} className="infoFields" type="password" name="" id="caduser_senha" placeholder="Senha" required/>
                            </div>

                            <div className='col-md-12 col-xs-6 mb-3 text-center'>
                                <input checked type='radio' name="loginType" value={0}/>Cliente
                                <br/>
                                <input type='radio' name="loginType" value={1}/>Oficina
                            </div>
            
                            <div class="col-md-12 col-xs-6 mb-3 text-center">
                                <button onClick={this.logar} type="button" class="btn-login">Login</button>
                            </div>

                            <div class="col-md-12 col-xs-6 mb-3 text-center">
                                <a href="/cadastro"> Não tenho uma conta. Cadastrar agora!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}