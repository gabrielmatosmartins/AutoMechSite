import {
  Avatar,
  Flex,
  HStack,
  Icon,
  IconButton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import Logo from "../images/Logo.png"
import { useSidebarContext } from "../contexts/SidebarContext";
import { FiMenu } from "react-icons/fi";
import Image from 'next/image'
import Hora from "./Hora"

const Header = () => {
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  const { onOpen } = useSidebarContext();

  return (
    <Flex
      as="header"
      w="100%"
      maxW={"auto"}
      h="20"
      mx="auto"
      px="2"
      py="2"
      align="center"
      boxShadow="0 1px 0 #ccc"
      color="gray.500"
      fontWeight="bold"
    >
      {isMobile && (
        <IconButton
          icon={<Icon as={FiMenu} />}
          onClick={onOpen}
          variant="unstyled"
          fontSize="20"
          mr="2"
        ></IconButton>
      )}
      
      <Image
      src={Logo}
      alt="Logo"
      width={114}
      height={86}
    />
   
      <Flex ml="auto">
        <HStack>
        <Text><Hora /></Text>
        <Text>AutoVrum</Text>
          <Avatar size="md" name="AutoVrum" />
        </HStack>
      </Flex>
      
    </Flex>
  );
};

export default Header;
