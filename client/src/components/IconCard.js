import React from 'react';
import {Flex, useColorModeValue, Image, Text} from '@chakra-ui/react';

export default function IconCard(props) {
    return (
        <Flex
        bg={useColorModeValue(props.color, "gray.800")}
        boxShadow={"xl"}
        rounded={"lg"}
        width={"100%"}
        height={"100%"}
        p={"6"}
        align={"center"}
        flexDirection={"column"}
        justify={"space-evenly"}>
            <Image 
            boxShadow={"md"}
            src={props.src}
            boxSize={"100px"}
            borderRadius={props.rounded === "true" ? "full" : "none"}
            pos={"relative"}
            mb={"6"}>
            </Image>
            <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} width={"80%"}>
                {props.text}
            </Text>
        </Flex>
    );
}