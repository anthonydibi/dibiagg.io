import React from 'react';
import {Flex, Center, useColorModeValue, Image, Text} from '@chakra-ui/react';

export default function IconCard(props) {
    return (
        <Center py={6}>
            <Flex
            flex={"1"}
            gridAutoRows={"1fr"}
            gridAutoColumns={"1fr"}
            maxW={"500px"}
            bg={useColorModeValue(props.color, "gray.800")}
            boxShadow={"xl"}
            p={6}
            rounded={"lg"}
            textAlign={"center"}
            flexDirection={"column"}>
                <Center>
                    <Image 
                    src={props.src}
                    boxSize={"100px"}
                    borderRadius={props.rounded === "true" ? "full" : "none"}
                    pos={"relative"}
                    mb={"6"}>
                    </Image>
                </Center>
                <Text fontSize={"xl"}>
                    {props.text}
                </Text>
            </Flex>
        </Center>
    );
}