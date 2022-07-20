import React from 'react';
import {Flex, useColorModeValue, Image, Text, Heading} from '@chakra-ui/react';

export default function IconCard(props) {
    return (
        <Flex
        bg={useColorModeValue(props.color, "gray.800")}
        border={"1px solid"}
        borderColor={useColorModeValue("teal.300", "teal.100")}
        boxShadow={"xl"}
        rounded={"2xl"}
        width={"100%"}
        height={"100%"}
        p={"10"}
        flexDirection={"column"}
        justify={"start"}
        gap={"15px"}>
            <Image 
            boxShadow={"md"}
            src={props.src}
            boxSize={"70px"}
            borderRadius={props.rounded === "true" ? "full" : "none"}
            pos={"relative"}>
            </Image>
            <Heading size={"md"}>
                {props.heading}
            </Heading>
            <Text fontSize={{ base: "md", sm: "lg", md: "xl" }} width={"80%"}>
                {props.text}
            </Text>
        </Flex>
    );
}