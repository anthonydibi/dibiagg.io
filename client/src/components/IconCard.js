import React from 'react';
import {Box, Center, useColorModeValue, Image, Text} from '@chakra-ui/react';

export default function IconCard(props) {
    return (
        <Center py={6}>
            <Box
            w={"85%"}
            maxW={"400px"}
            bg={useColorModeValue(props.color, "gray.800")}
            boxShadow={"xl"}
            p={6}
            rounded={"lg"}
            textAlign={"center"}>
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
            </Box>
        </Center>
    );
}