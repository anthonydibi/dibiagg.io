import {Box, Heading, Center, Text, Stack} from "@chakra-ui/react"
import React from 'react';
import ReactPlayer from "react-player/youtube";

export default function ThreeSharp(){
    return (
        <>
            <Center>
                <Box h="100%" mx={{base: 1, md: 5}} border="1px solid" borderBottom="0px none" borderTop="0px none" w={"1300px"}>
                    <ReactPlayer width={"100%"} style={{height: "min-content"}} url='https://youtu.be/JaxGmNPOdZM'/>
                    <Stack align={"center"} spacing={9} px={{base: 0, md: 20}} py={{base:5, md: 10}}>
                        <Heading fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}>
                            THREESHARP
                        </Heading>
                        <Text px={{base: 5, md: 40}} fontSize={{base: "lg", sm: "xl", md: "2xl" }}>
                                A project that I developed using Unity which aims to make working with code more engaging and immersive.
                                ThreeSharp allows you to take C# code and generate a visualization which you can interact with using
                                motion controls. You can see relationships like inheritance and namespace membership, so you can
                                quickly and easily get semantically verified big picture insights from your code. Plug in a new repository to get familiarized
                                with its layout and components, or one you are already familiar with. With ThreeSharp, you can get out of the chair
                                and physically explore your code.
                        </Text>
                    </Stack>
                </Box>
            </Center>
        </>
    );
}