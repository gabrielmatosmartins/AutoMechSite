import React from "react";
import { Box, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import {Link} from "react-router-dom";
// import { useRouter } from "next/router";

const SidebarNav = () => {
  // const { asPath } = useRouter();

  return (
    <Stack spacing="6"> 
      <Stack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400">
        </Text>
        <Stack>
          <ChakraLink
            _hover={{ bg: "gray.100" }}
            px="4"
            py="2"
            borderRadius={5}
            // bg={asPath === "/home" ? "gray.200" : ""}
          >
            <Link to="/home">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                HOME
              </Text>
            </Link>
          </ChakraLink>
        </Stack>
      </Stack>
      <Stack>
        <Text fontSize="xs" fontWeight="bold" color="gray.400">
          GESTÃO DE SERVIÇOS
        </Text>
        <Stack>
          <ChakraLink
            _hover={{ bg: "gray.100" }}
            px="4"
            py="2"
            borderRadius={5}
            // bg={asPath === "/balance" ? "gray.200" : ""}
          >
            <Link to="/balance">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                ORÇAMENTOS
              </Text>
            </Link>
          </ChakraLink>
          <ChakraLink
            _hover={{ bg: "gray.100" }}
            px="4"
            py="2"
            borderRadius={5}
            // bg={asPath === "/stockEntries" ? "gray.200" : ""}
          >
            <Link to="/stockEntries">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                PRODUTOS
              </Text>
            </Link>
          </ChakraLink>
          <ChakraLink
            _hover={{ bg: "gray.100" }}
            px="4"
            py="2"
            borderRadius={5}
            // bg={asPath === "/stockOutputs" ? "gray.200" : ""}
          >
            <Link to="/stockOutputs">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                ESTOQUE DE PEÇAS
              </Text>
            </Link>
          </ChakraLink>
          <ChakraLink
            _hover={{ bg: "gray.100" }}
            px="4"
            py="2"
            borderRadius={5}
            // bg={asPath === "/servicos" ? "gray.200" : ""}
          >
            <Link to="/servicos">
              <Text fontSize="md" fontWeight="medium" color="gray.500">
                SERVIÇOS
              </Text>
            </Link>
          </ChakraLink>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SidebarNav;
