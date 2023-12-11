import React from 'react'
import "../layout.css";
import { Link } from "react-router-dom";


export function DrawerMenu() {
    return (
        <>
        <ul className='dropdown-menu-body'>
            <li class="itenMenu">
                <a href='/cadastro'>
                    <span class="textMenu">Home</span>
                </a>
            </li>
            {
                localStorage.getItem("tipo") == 1 ? 
                <li class="itenMenu">
                    <a href='/indicadores'>
                        <span class="textMenu">Indicadores</span>
                    </a>
                </li>:null
            }
            
            <li class="itenMenu">
                <a href={`/alterarCadastro/`+localStorage.getItem("id")}>
                    <span class="textMenu">Editar Perfil</span>
                </a>
            </li>
            <li class="itenMenu">
                <Link id="nav-item" to="/Veiculos">
                    <span class="textMenu">Carros</span>
                </Link>
            </li>
            <li class="itenMenu">
                <a href="/login">
                    <span class="textMenu">Formas de Pagamento</span>
                </a>
            </li>
            <li class="itenMenu" id="caduser_logout">
                <a href="/Logout">
                    <span class="textMenu">Logout</span>
                </a>
            </li>
            <li class="itenMenu" id="caduser_excluir">
                <a href="/login">
                    <span class="iconMenu"><i class="fa-solid fa-trash"></i></span>
                    <span class="textMenu">Excluir Cadastro</span>
                </a>
            </li>
        </ul>
    </>
    )
  }