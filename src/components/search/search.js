import React from "react";
import "./style.css";

export function SearchBar({ busca, onInputChange }){
    return(
    <div class="div-search">

        <input class="search-input" value={busca} onChange={onInputChange} type="search" placeholder="Pesquise uma oficina" />

    </div>)

}