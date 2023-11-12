import React from "react";
import { 
Table,
Thead,
Tbody,
Tr,
Th,
TableCaption,
TableContainer, 
} from "@chakra-ui/react";
import { useEffect,useState } from "react";

function GetOrcamento(){
    const url='https://automech.up.railway.app/orcamento';
    const [orcamento, setOrcamento]=useState([]);
    
    useEffect(()=>{
        
        fetch(url)
        .then((response)=> response.json())
        .then((data)=> setOrcamento(data.orcamento))
    },[])
    
  return (
    <TableContainer ml={'-60'} margin maxWidth={''}width={'900px'}>
        <Table variant={'simple'} width={''}>
            <TableCaption>Orçamentos</TableCaption>
            <Thead>
                <Tr>
                    <Th>Id do orçamento orçamento</Th>
                    <Th>Valor do orçamento</Th>
                    <Th>Descriçao</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {orcamento && orcamento.map(orc=>(
                    <Tr key={orc.idOrcamento}>
                        <Th>{orc.idOrcamento}</Th>
                        <Th>{orc.valorOrcamento}</Th>
                        <Th>{orc.descricaoOrcamento}</Th>
                        <Th>{orc.isApprovedOrcamento}</Th>
                    </Tr>
                ))}
                
            </Tbody>
        </Table>
    </TableContainer>
  )

}

export default GetOrcamento;