import React from 'react';
import {Flex, useColorModeValue, Image, Heading} from '@chakra-ui/react';

export default function IconCard(props) {
    return (
        <Flex
        bg={useColorModeValue(props.color, "black")}
        border={"1px solid"}
        borderColor={useColorModeValue("black", "white")}
        width={"100%"}
        height={"100%"}
        p={"10"}
        flexDirection={"column"}
        justify={"start"}
        gap={"15px"}>
            <Image 
            boxShadow={"sm"}
            src={props.src}
            boxSize={"70px"}
            borderRadius={props.rounded === "true" ? "full" : "none"}
            pos={"relative"}>
            </Image>
            <Heading size={"md"}>
                {props.heading}
            </Heading>
            {props.text}
        </Flex>
    );
}