import React from 'react';
import {Flex, Center, useColorModeValue, Image, Text} from '@chakra-ui/react';

export default function IconCard(props) {
    return (
        <Center py={6}>
            <Flex
            bg={useColorModeValue(props.color, "gray.800")}
            boxShadow={"xl"}
            h={"480px"}
            w={"400px"}
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