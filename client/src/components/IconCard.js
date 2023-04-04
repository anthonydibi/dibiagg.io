import React from 'react';
import {Flex, useColorModeValue, Heading, Text} from '@chakra-ui/react';
import { ChakraNextImage } from './ChakraNextImage';
//
export default function IconCard(props) {
    return (
        <Flex
        bg={useColorModeValue(props.color, "black")}
        border={"1px solid"}
        borderColor={useColorModeValue("black", "white")}
        width={"100%"}
        maxW={"450px"}
        height={"100%"}
        p={"5"}
        flexDirection={"column"}
        justify={"start"}
        align={"start"}
        gap={"15px"}>
        <ChakraNextImage 
        boxShadow={"sm"}
        zIndex={1}
        src={props.src}
        boxSize={"70px"}
        borderRadius={props.rounded === "true" ? "full" : "none"}
        pos={"relative"}>
        </ChakraNextImage>
        <Heading size={"md"} align="start">
            {props.heading}
        </Heading>
        <Text w="80%" fontSize={{ base: "md", sm: "lg", md: "xl" }} align="start">{props.text}</Text>
        </Flex>
    );
}