import '../../App.css';
import { SearchBar } from '../search/search';
import { TableResult } from '../tableResult/tableResult';
import '../../css/search.css'
import '../../css/style.css'
import React, { useState } from 'react';

import { ClienteValidado } from "../EntidadesValidadas/clienteValidado"

export function SearchScreen() {

  const [busca, setBusca] = useState('');

  function handleInputChange(event) {
    setBusca(event.target.value);
  }

  return (
    
    <div>
      <ClienteValidado/>
      <SearchBar busca={busca} onInputChange={handleInputChange} class="search-input"></SearchBar>
      <TableResult busca={busca}></TableResult>
    </div>
  );
}

