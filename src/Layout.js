import { Outlet, Link } from "react-router-dom";
import "./layout.css";
import React from "react";

import "./css/nav.css";
import { DrawerMenu } from "./components/DrawerMenu"
import { Avatar } from '@chakra-ui/react'

//Bootstrap Imports
import {
  Container,
  Nav,
  Navbar,
  NavDropdown
} from 'react-bootstrap';

export class Layout extends React.Component {

  constructor() {
    super();
    this.state = { active: false, showAvatar: false, cliente: null }
    this.validarLogin = this.validarLogin.bind(this)
    this.validarLogin()
  }

  onClickLink(e) {
    let itens = document.querySelectorAll("[id='nav-item']");
    for (var i = 0; i < itens.length; i++) {
      itens[i].classList.remove("active");
    }
    e.target.classList.add("active");
  }

  validarLogin() {
    const id = localStorage.getItem("id")
    if (id !== null || id !== undefined) {
      fetch("http://4.227.162.137:8080/Usuario/" + id, {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
      }).then(res => {
        return res.json()
      }).then(data => {
        if (data.status !== 400) {
          this.setState({ showAvatar: true, cliente: data })
        }

      })
    } else {
      this.setState({ showAvatar: false })
      window.location.href = "/login"
    }
  }


  render() {
    return (
      <>
        <Navbar id="top-navbar" expand="lg" className="bg-body-tertiary">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse className="top-navbar-collapse" id="basic-navbar-nav">
            <div className="navbar-brand logo">
              <div className="overlap-group">
                <img
                  className="img"
                  alt="Img"
                  src="https://c.animaapp.com/yFUKwoyF/img/eszacrc99cevlnkuctzwc3zlkiushvdjdts5chlwmynsaoctowlvsbnanig5vmzg@2x.png"
                />
              </div>
            </div>

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" onClick={this.onClickLink} id="nav-item" to="/cadastro">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={this.onClickLink} id="nav-item" to="/servicos">Serviços</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={this.onClickLink} id="nav-item" to="/Orcamento">Orçamentos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={this.onClickLink} id="nav-item" to="/repair">Feedback</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={this.onClickLink} id="nav-item" to="/Oficina">Pesquisar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={this.onClickLink} id="nav-item" to="/Reparo">Reparos</Link>
              </li>

              <NavDropdown className="dropdown-menu-collapse" title="Ações do cliente" id="basic-nav-dropdown">
                <DrawerMenu />
              </NavDropdown>

              <div className="btnGroup">
                {this.state.showAvatar ? <Avatar size={"md"} name={this.state.cliente.nome} /> :
                  <>
                    <button className="cadastroCliente">
                      <Link to="/cadastro">
                        <div className="div">Cadastre-se</div>
                      </Link>
                    </button>

                    <button className="loginCliente">
                      <Link to="/login">
                        <div className="div">Login</div>
                      </Link>
                    </button>
                  </>
                }
              </div>
            </ul>
          </Navbar.Collapse>
        </Navbar>

        
        <Outlet />
      </>
    )
  }
};

