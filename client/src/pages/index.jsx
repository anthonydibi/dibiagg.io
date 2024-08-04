import {
  Grid,
  Heading,
  Center,
  Text,
  Stack,
  GridItem,
  Tooltip,
  Box,
  useColorModeValue,
  Container,
  Flex,
  useColorMode,
  Spinner,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import IconCard from '../components/IconCard';
import SEO from '../components/seo';
import {
  SiReact,
  SiPostgresql,
  SiHeroku,
  SiNodeDotJs,
  SiNextDotJs,
} from 'react-icons/si';
import { BsLightningFill, BsTriangleFill } from 'react-icons/bs';
import { UnderlinedHeading } from '../components/UnderlinedHeading';
import OffsetGrid from '../components/grid/OffsetGrid';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
const Testtt = dynamic(
  () => import('../components/threejs/Test').then((mod) => mod.default),
  {
    ssr: false,
  },
);
const View = dynamic(
  () => import('@react-three/drei').then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <Flex width="100%" height="100%" justify="center" alignItems="center">
        <Spinner size="xl" />
      </Flex>
    ),
  },
);

export default function About() {
  return (
    <>
      <SEO
        description="About dibiagg.io"
        title="About"
        siteTitle="dibiagg.io"
      />
      <Flex justifyContent="center" p="0 0 6rem 0">
        <Stack w="100%" justifyContent="center" alignItems="center">
          <Stack spacing={9} maxW="5xl" justifyContent="center" px={5}>
            <Box w="100%" aspectRatio={1 / 1}>
              <View
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                <Testtt />
              </View>
            </Box>
            <Heading size={{ base: '2xl', md: '4xl' }} as="h1">
              HI! MY NAME IS ANTHONY{' '}
              <Tooltip
                label="(dee-bee-aw-jee-oh)"
                border="1px solid"
                px="2"
                borderRadius="0"
                bg={useColorModeValue('white', 'black')}
                textColor={useColorModeValue('black', 'white')}
                borderColor={useColorModeValue('black', 'white')}
                fontSize={{ base: 'md', md: 'lg' }}
              >
                <Text
                  whiteSpace="nowrap"
                  textDecorationColor={'accent'}
                  decoration={'underline dotted'}
                  textDecorationThickness={{ base: '4px', md: '8px' }}
                  as="span"
                >
                  DI BIAGGIO
                </Text>
              </Tooltip>
              .
            </Heading>
            <UnderlinedHeading>Who?</UnderlinedHeading>
            <Text
              px={{ base: 3, md: 6 }}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            >
              A computer science graduate from the University of Minnesota,
              currently working as a software engineer at DraftKings.
            </Text>
            <Text
              px={{ base: 3, md: 6 }}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            >
              A full-stack developer who feels most at home developing for
              data-intensive applications, where performance and progressive
              enhancement are paramount.
            </Text>
            <Text
              px={{ base: 3, md: 6 }}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            >
              Learning new things keeps me happy, and I am always trying to
              broaden my horizons while also becoming more well-versed in the
              areas that I am experienced in.
            </Text>
            <Text
              px={{ base: 3, md: 6 }}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            >
              Enjoy poking around - I like to put my projects on here, and you
              can also find information about me, like my socials and resume. I
              also started a blog on here, which is my outlet for randomly
              screaming things at the moon.
            </Text>
          </Stack>
          <Flex
            justifyContent="center"
            alignItems="start"
            height="100%"
            my="4rem"
            width="100% "
            background="accent"
          >
            <Stack
              spacing={9}
              w="100%"
              p="1rem 0 9rem"
              maxW="5xl"
              justifyContent="center"
              px={5}
            >
              <UnderlinedHeading fontColor="white" underlineColor="accent2">
                Skills
              </UnderlinedHeading>
              <Flex direction={['column', null, 'row']} alignItems="center">
                <Box width={['100%', null, '50%']}>
                  <OffsetGrid />
                </Box>
                <Box width={['100%', null, '50%']} height="100%" pl=".625rem">
                  <Flex height="100%" direction="column">
                    <Heading
                      size="xl"
                      color="white"
                      p=".625rem"
                      border="1px solid"
                    >
                      React
                    </Heading>
                    <Flex
                      direction="row"
                      alignItems="center"
                      gap="20px"
                      borderX="1px solid white"
                    >
                      <Box p=".625rem" borderRight="1px solid white">
                        <Text
                          fontSize="xl"
                          fontWeight={500}
                          color="white"
                          whiteSpace="nowrap"
                        >
                          Proficiency
                        </Text>
                      </Box>
                      <Flex
                        direction="row"
                        alignItems="center"
                        gap={['16px', null, '20px']}
                      >
                        <div class="cube accent">
                          <div class="top"></div>
                          <div class="right"></div>
                          <div class="bottom"></div>
                          <div class="left"></div>
                          <div class="front"></div>
                          <div class="back"></div>
                        </div>
                        <div class="cube accent">
                          <div class="top"></div>
                          <div class="right"></div>
                          <div class="bottom"></div>
                          <div class="left"></div>
                          <div class="front"></div>
                          <div class="back"></div>
                        </div>
                        <div class="cube accent">
                          <div class="top"></div>
                          <div class="right"></div>
                          <div class="bottom"></div>
                          <div class="left"></div>
                          <div class="front"></div>
                          <div class="back"></div>
                        </div>
                        <div class="cube accent">
                          <div class="top"></div>
                          <div class="right"></div>
                          <div class="bottom"></div>
                          <div class="left"></div>
                          <div class="front"></div>
                          <div class="back"></div>
                        </div>
                        <div class="cube white">
                          <div class="top"></div>
                          <div class="right"></div>
                          <div class="bottom"></div>
                          <div class="left"></div>
                          <div class="front"></div>
                          <div class="back"></div>
                        </div>
                      </Flex>
                    </Flex>
                    <Text p=".625rem" color="white" border="1px solid white">
                      I've spent most of my career building React apps, from the
                      Redux hells of yore to cutting-edge, zippy Remix apps. I
                      promise I won't litter your codebase with{' '}
                      <code>useEffect</code> 🥺👉👈
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Stack>
          </Flex>
          <Stack w="100%" maxW="5xl" px={5}>
            <UnderlinedHeading>Built with</UnderlinedHeading>
            <Grid
              pt={'10'}
              align={'center'}
              autoColumns={'1fr'}
              gap={'10'}
              templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
            >
              <GridItem>
                <IconCard
                  icon={BsLightningFill}
                  alt={'ChakraUI logo'}
                  color={'white'}
                  text={'Accessibility and theming-focused component library'}
                  heading={'ChakraUI'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiReact}
                  alt={'React logo'}
                  color={'white'}
                  text={
                    'Library for building reactive, component-driven interfaces'
                  }
                  heading={'React'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiNextDotJs}
                  alt={'Nextjs logo'}
                  color={'white'}
                  text={
                    'React with some more batteries - server-side rendering, routing, and more'
                  }
                  heading={'Next.js'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={BsTriangleFill}
                  alt={'Vercel logo'}
                  color={'white'}
                  text={
                    'Frontend hosting with some nice perks like edge caching'
                  }
                  heading={'Vercel'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiNodeDotJs}
                  alt={'Nodejs logo'}
                  color={'white'}
                  text={'Backend logic - database queries, WebSocket setup'}
                  heading={'Node.js'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiPostgresql}
                  alt={'PostgreSQL logo'}
                  color={'white'}
                  text={
                    'RDBMS (I like the elephant... and native JSON support)'
                  }
                  heading={'PostgreSQL'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiHeroku}
                  alt={'Heroku logo'}
                  color={'white'}
                  text={'Fully managed yet modular cloud platform'}
                  heading={'Heroku'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
