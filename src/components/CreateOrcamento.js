
import React from "react";
import { 
Container,
Button,
Input 
} from "@chakra-ui/react";
import { useEffect,useState } from "react";


function CreateOrcamento(){
    const [idOrcamento,setIdOrcamento]=useState(0);
    const [valorOrcamento,setValorOrcamento]=useState(0);
    const [descricaoOrcamento,setDescricaoOrcamento]=useState('')
    const [status,setStatus]=useState(0);
    const [idVeiculo,setIdVeiculo]=useState(0)

    const hadnleSubmit=async (event)=>{
        event.preventDefault();

        const url='https://automech.up.railway.app/orcamento';
        const response= await fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idOrcamento: idOrcamento,
                valorOrcamento:valorOrcamento,
                descricaoOrcamento:descricaoOrcamento,
                isApprovedOrcamento:status,
                veiculo_idVeiculo:idVeiculo
            }),
        });
         const data=await response.json();
         console.log(data);
    };
    return (
        <form onSubmit={hadnleSubmit}>
            <Container display={''} width={'800px'}>
            <label>
                Digite o Id do Orçamento:
                <Input  marginRight={'15'} placeholder="Digite o id do usuario" isRequired value={idOrcamento} onChange={(e)=> setIdOrcamento(e.target.value)}>
                </Input>
            </label>
            soma do valor dos serviços:
             <Input placeholder="Valor dos serviços" isRequired value={valorOrcamento} onChange={(e)=> setValorOrcamento(e.target.value)}>
             </Input>
             <label>
                Descriçao do serviço
             <Input  isRequired value={descricaoOrcamento} onChange={(e)=> setDescricaoOrcamento(e.target.value)}></Input>
            </label>
            <label>
                 Serviços
             <Input  isRequired value={''} onChange={(e)=> setStatus(e.target.value)}></Input>
             </label>
             <label>
                Status
             <Input  isRequired value={status} onChange={(e)=> setStatus(e.target.value)}></Input>
             </label>
             <Button marginRight={'5px'} top ='10' colorScheme="green">Enviar orçamento</Button>
             <Button colorScheme="yellow" top ='10'>Alterar</Button>
            </Container>

        </form>
    )
    
}

export default CreateOrcamento;