import React from "react";
import "../css/doubleInputs.css";

export class DoubleInput extends React.Component{
    constructor(){
        super();
        this.validar = this.validar.bind(this)
    }

    componentDidMount(){
        if(localStorage.getItem("id") === null ||
            localStorage.getItem("id") === undefined){
                alert("Você precisa estar logado para utilizar essa função")
                window.location.href = "/login"
        }
    }

    validar(){
        let id = localStorage.getItem("id")
        const marca = document.getElementById("data1").value
        const modelo = document.getElementById("data2").value
        const placa = document.getElementById("data3").value
        const ano = document.getElementById("data4").value


        if(marca === "" || modelo === "" || ano === "" || placa === ""){ alert("Preencha os dados corretamente") }
        else{
            const dataVeiculo = 
            {
                "marca": marca,
                "modelo": modelo,
                "placa": placa,
                "ano": ano,
                "status": 1
            }
            

            fetch("http://4.227.162.137:8080/Veiculo/"+id, {
                method: "POST",
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify(dataVeiculo)
            }).then(res => {
                if(res.status === 201){
                    alert("Veículo cadastrado com sucesso")
                    window.location.reload()
                }
            })
        }
    }

    render(){
        return(
            <div class="row div-search">
                <div className="col-md-3">
                    <input class="double-input" id="data1" type="text" placeholder="Marca" />
                </div>
                <div className="col-md-3">
                    <input class="double-input" id="data2" type="text" placeholder="Modelo" />
                </div>
                <div className="col-md-3">
                    <input class="double-input" id="data3" type="text" placeholder="Placa" />
                </div>
                <div className="col-md-3">
                    <input class="double-input" id="data4" type="number" placeholder="Ano" />
                </div>
                <div>
                    <button onClick={this.validar} className="addButton">+ Adicionar</button>
                </div>
        
            </div>)
    }
}
