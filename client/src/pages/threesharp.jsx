import dynamic from "next/dynamic";
import { Box, Heading, Center, Text, Stack, Flex } from "@chakra-ui/react"
import React, { useState } from 'react';
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
import SEO from "../components/seo";
import Image from "next/image";

const LeftBox = (props) => {
    return (
        <Flex direction="row" align="center">
            <Box borderTop="1px" w={{base: "5vw", md: "15vw"}} h="0px"></Box>
            <Box border="1px" w={props.width} maxW={props.maxWidth || "600px"} p="3">
                {props.children}
            </Box>
        </Flex>
    );
}

const RightBox = (props) => {
    return (
        <Flex direction="row" align="center" justify={"end"}>
            <Box border="1px" w={props.width} maxW={props.maxWidth || "600px"} p="3">
                {props.children}
            </Box>
            <Box borderTop="1px" w={{base: "5vw", md: "15vw"}} h="0px"></Box>
        </Flex>
    );
}

const MidBox = (props) => {
    return (
        <Flex direction="row" align="center" w={"100%"}>
            <Box borderTop="1px" h="0px" flexGrow={"1"}></Box>
                {props.children}
            <Box borderTop="1px" h="0px" flexGrow={"1"}></Box>
        </Flex>
    )
}



export default function ThreeSharp() {
    const [reactPlayerWidth, setWidth] = useState(0);
    const [reactPlayerHeight, setHeight] = useState(0);

    React.useEffect(() => {
        setWidth(window.innerWidth * 0.8); //TODO: make this less hacky, have tried so many css tricks though...
        setHeight((window.innerWidth * 0.8) * 0.5625); //this causes 2 rerenders but not really a big deal
    }, []);


    return (
        <>
            <SEO description="ThreeSharp - a virtual reality code visualization tool"
                title="ThreeSharp"
                siteTitle="dibiagg.io" />
            <Stack direction="column" h="100%" w="100%" my="10" gap="8">
                <MidBox>
                    <Box align={"center"} w={"90%"} border={"1px"} px={"10"} py={"2"}>
                        <Heading size={"xl"}>
                            THREESHARP
                        </Heading>
                    </Box>
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
                <MidBox>
                    <Box align={"center"} w={"90%"} border={"1px"} px={"10"} py={"2"}>
                        <Heading size={"xl"}>
                            DEMO
                        </Heading>
                    </Box>
                </MidBox>
                <MidBox>
                    <Flex
                        direction={"row"}
                        align={'center'}
                        p="1"
                        border={"1px"}>
                            <ReactPlayer width={reactPlayerWidth} height={reactPlayerHeight} url='https://youtu.be/JaxGmNPOdZM'/>
                    </Flex>
                </MidBox>
            </Stack>
        </>
    );
}