import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { SearchScreen } from './components/screens/Search';
import { RepairScreen } from './components/screens/Reparos';
import { OficinaScreen } from './components/screens/Oficina';
import { IndicadoresScreen } from './components/screens/Indicadores';
import { ClientesOrcamentos } from './components/screens/clientesOrcamentos';
import { MyApp } from './pages/_app'
import { Layout } from './Layout';
import './css/search.css'
import './css/style.css'
import * as React from 'react'

import { CadastroContainer } from "./components/CadastroContainer";
import { LoginContainer } from './components/LoginContainer';
import { AlterarCadastro } from "./components/AlterarCadastro";
import { Historico } from "./components/Historico";

import './css/nav.css'
import { CadastroVeiculo } from "./components/CadastroVeiculos";
import { Logout } from "./components/logout";

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

import { Balance } from './pages/balance'
import { Home } from './pages/home'
import { Produtos } from './pages/index'
import { Orcamento } from './pages/orcamentos'
import { Servicos } from './pages/servicos'
import { StockEntries } from './pages/stockEntries'


function App() {
  return (
    <ChakraProvider>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="Oficina" element={<SearchScreen />} />
              <Route path="Orcamento" element={<ClientesOrcamentos />} />
              <Route path="Reparo" element={<RepairScreen />} />
              <Route path="Oficina/Detalhes/:id" element={<OficinaScreen />} />
              <Route path="Login" element={<LoginContainer />} />
              <Route path="Cadastro" element={<CadastroContainer />} />
              <Route path="Veiculos" element={<CadastroVeiculo />} />
              <Route path="AlterarCadastro/:id" element={<AlterarCadastro />} />
              <Route path="Indicadores" element={<IndicadoresScreen />} />
              <Route path="HistoricoVeiculo" element={<Historico />} />
              <Route path="Logout" element={<Logout />} />
              <Route path="teste" element={<MyApp Component={ [Balance, Home, Produtos, Orcamento, Servicos, StockEntries] } />} />
            </Route>
          </Routes>
        </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
