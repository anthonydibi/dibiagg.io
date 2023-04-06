import dynamic from "next/dynamic";
import { Box, Heading, Center, Text, Stack, Flex } from "@chakra-ui/react"
import React from 'react';
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import SEO from "../components/seo";
import Image from "next/image";

const LeftBox = (props) => {
    return (
        <Flex direction="row" align="center">
            <Box borderTop="1px" w="6vw" h="0px"></Box>
            <Box border="1px" w={props.width} maxW={props.maxWidth || "650px"} p="3">
                {props.children}
            </Box>
        </Flex>
    );
}

const RightBox = (props) => {
    return (
        <Flex direction="row" align="center" justify={"end"}>
            <Box border="1px" w={props.width} p="3">
                {props.children}
            </Box>
            <Box borderTop="1px" w="6vw" h="0px"></Box>
        </Flex>
    );
}

const MidBox = (props) => {
    return (
        <Flex direction="row" align="center" width={"100%"}>
            <Box borderTop="1px" w={{base: "7vw", md: "25%"}} h="0px"></Box>
            <Box border="1px" w={{base: "100%", md: "50%"}} p="3">
                {props.children}
            </Box>
            <Box borderTop="1px" w={{base: "7vw", md: "25%"}}  h="0px"></Box>
        </Flex>
    )
}

export default function ThreeSharp() {
    return (
        <>
            <SEO description="ThreeSharp - a virtual reality code visualization tool"
                title="ThreeSharp"
                siteTitle="dibiagg.io" />
            {/* <Center>
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
            </Center> */}
            <Stack direction="column" h="100%" w="100%" my="10" gap="8">
                <MidBox>
                    <Heading align={"center"} size={"xl"}>
                        THREESHARP
                    </Heading>
                </MidBox>
                <LeftBox width={{base: "80%", md: "40%"}}>
                    <Text fontSize={"xl"}>
                        A project that I developed using Unity which aims to make working with code more engaging and immersive.
                        I've always wanted to be able to physically explore code. Sitting in a chair, staring at a screen, typing
                        on a keyboard and wrecking my wrists has made me yearn for a better development experience.
                    </Text>
                </LeftBox>
                <LeftBox width={{base: "80%", md: "40%"}}>
                    <Text fontSize={"xl"}>
                        ThreeSharp aims to deliver this experience by bringing development into virtual reality.
                        In the Unity-based VR environment, you can load in any C# project, and then see it visualized
                        in full 3D. This visualization lays out your code based on relationships like namespace membership
                        and inheritance. This means that you can more easily get a spatial understanding of your code,
                        and how different classes and modules relate to each other.
                    </Text>
                </LeftBox>
                <RightBox>
                    <Box border="1px">
                        <Image src="/visualizationex.jpeg" width="600" height="600">
                        </Image>
                    </Box>
                </RightBox>
                <RightBox>
                    <Text fontSize={"xl"}>
                        It's like UML, but in virtual reality.
                    </Text>
                </RightBox>
                <RightBox width={{base: "80%", md: "40%"}}>
                    <Text fontSize={"xl"}>
                        Also, the environment makes full usage of motion controls, allowing you to explore code by walking
                        around and using your hands to control the visualization.
                        You can watch it in action below:
                    </Text>
                </RightBox>
                <MidBox width={{base: "90%", md: "60%"}}>
                    <Flex
                        align={'center'}
                        p="1"
                        border={"1px"}>
                            <ReactPlayer width={"100%"} url='https://youtu.be/JaxGmNPOdZM' />
                    </Flex>
                    <Box borderTop="1px" w="4rem" h="0px"></Box>
                </MidBox>
            </Stack>
        </>
    );
}