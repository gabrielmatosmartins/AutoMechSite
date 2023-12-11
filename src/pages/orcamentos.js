import { useEffect,useState } from "react";
import {Header} from "../components/Header";
import {Sidebar} from "../components/Sidebar";
import {GetOrcamento} from "../components/GetOrcamento";
import {CreateOrcamento} from "../components/CreateOrcamento";

import { 
Container,
Image,
Button,
Table,
Thead,
Tbody,
Tfoot,
Flex,
Tr,
Th,
Td,
TableCaption,
TableContainer, 
Input 
} from "@chakra-ui/react";

export const Orcamento = () => {
    const [showOrcamento, setShowOrcamento] = useState(false);
    const [showCreateOrc,setCreateOrc]=useState(false);

    return (
        <Flex h="100vh" flexDirection="column">
            <Header />
            <Flex w="100%" my="6" maxW={1400} mx="auto" px="6" h="100vh">
            <Sidebar />
                <Button position={"absolute"} left={'3'} onClick={() => {
                    setShowOrcamento(!showOrcamento);
                    setCreateOrc(false);
                }}>
                   Orçamento
                </Button>
            </Flex>
            {showOrcamento && !showCreateOrc && (
                <Flex>
                    <GetOrcamento/>
                    <Button w="40" onClick={()=> setCreateOrc(!showCreateOrc)}>
                          Fazer Orçamento
                       </Button>
                </Flex>
                
            )}
            {showCreateOrc &&
                <Container>
                    <CreateOrcamento/>
                </Container>
            }
        
        </Flex>
    )
}
