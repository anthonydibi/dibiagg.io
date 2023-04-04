import {Grid, Heading, Center, Text, Stack, GridItem, Tooltip, Box, useColorModeValue} from "@chakra-ui/react"
import React from 'react';
import IconCard from '../components/IconCard'
import SEO from "../components/seo";

export default function About(){
    return (
        <>
            <SEO description="About dibiagg.io"
            title="About"
            siteTitle="dibiagg.io"/>
            <Center>
                <Stack h="100%" align={"center"} p={{base: 5, lg: 20}} mx={{base: 1, md: 5}} border="1px solid" borderBottom="0px none" borderTop="0px none" w={"1300px"} transitionDuration="1000ms">
                    <Heading
                        fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                        mb={6}>
                        HI! MY NAME IS ANTHONY <Tooltip label="(dee-bee-aw-jee-oh)" border="1px solid" px="2" borderRadius="0" bg={useColorModeValue("white", "black")} textColor={useColorModeValue("black", "white")} borderColor={useColorModeValue("black", "white")} fontSize={{base:"md", md: "lg"}}><Text whiteSpace="nowrap"textDecorationColor={"accent"} decoration={"underline dotted"} as="span">DI BIAGGIO</Text></Tooltip>.
                    </Heading>
                    <Stack spacing={9} px={{base: 0, md: 20}}>
                        <Text px={{base: 3, md: 6}} fontSize={{base: "lg", sm: "xl", md: "2xl" }}>
                            Welcome to DIBIAGG.<Text as="span" color="accent" fontSize={{base: "lg", sm: "xl", md: "2xl" }}>IO</Text>! 
                            I'm studying computer science at the University of Minnesota with a focus in software engineering. This is my personal website which functions as a little sandbox for whatever 
                            projects I decide to whip up as well as a hub for my portfolio, resume, contact links, etc.
                        </Text>
                        <Text px={{base: 3, md: 6}} fontSize={{ base: "lg", sm: "xl", md: "2xl" }}>
                            Here is the stuff I used to build this website.
                        </Text>
                        <Grid align={"center"} flex={"1"} autoColumns={"1fr"} gap={"3"} templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}>
                            <GridItem>
                                <IconCard src={"/chakralogo.jpg"}
                                alt={"ChakraUI logo"}
                                color={"white"}
                                text={"Style primitives, color mode helpers"}
                                heading={"ChakraUI"}
                                rounded={"true"}>
                                </IconCard>
                            </GridItem>
                            <GridItem>
                                <IconCard src={"/reactlogo.png"}
                                alt={"React logo"}
                                color={"white"}
                                text={"Frontend logic"}
                                heading={"React.js"}
                                rounded={"true"}>
                                </IconCard>
                            </GridItem>
                            <GridItem>
                                <IconCard src={"/postgrelogo.png"}
                                alt={"PostgreSQL logo"}
                                color={"white"}
                                text={"Persistent data storage for Graffiti, Deathball"}
                                heading={"PostgreSQL"}
                                rounded={"true"}>
                                </IconCard>
                            </GridItem>
                            <GridItem>
                                <IconCard src={"/herokulogo.png"}
                                alt={"Heroku logo"}
                                color={"white"}
                                text={"Deployment for backend - Graffiti API, Deathball API"}
                                heading={"Heroku"}
                                rounded={"true"}>
                                </IconCard>
                            </GridItem>
                            <GridItem>
                                <IconCard src={"/nodelogo.png"}
                                alt={"Nodejs logo"}
                                color={"white"}
                                text={"Backend logic"}
                                heading={"Node.js"}
                                rounded={"true"}>
                                </IconCard>
                            </GridItem>
                            <GridItem>
                                <IconCard src={"/vercellogo.png"}
                                alt={"Vercel logo"}
                                color={"white"}
                                text={"Frontend hosting"}
                                heading={"Vercel"}
                                rounded={"true"}>
                                </IconCard>
                            </GridItem>
                            <GridItem>
                                <IconCard src={"/nextlogo.png"}
                                alt={"Nextjs logo"}
                                color={"white"}
                                text={"React framework"}
                                heading={"Next.js"}
                                rounded={"true"}>
                                </IconCard>
                            </GridItem>
                        </Grid>
                    </Stack>
                </Stack>
            </Center>
        </>
    );
}