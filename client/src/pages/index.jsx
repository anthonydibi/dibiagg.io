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
} from '@chakra-ui/react'
import React from 'react'
import IconCard from '../components/IconCard'
import SEO from '../components/seo'
import {
  SiReact,
  SiPostgresql,
  SiHeroku,
  SiNodeDotJs,
  SiNextDotJs,
} from 'react-icons/si'
import { BsLightningFill, BsTriangleFill } from 'react-icons/bs'
import UnderlinedHeading from '../components/UnderlinedHeading'

export default function About() {
  return (
    <>
      <SEO
        description="About dibiagg.io"
        title="About"
        siteTitle="dibiagg.io"
      />
      <Center>
        <Stack
          h="100%"
          align={'center'}
          p={{ base: 5, lg: 20 }}
          mx={{ base: 1, md: 5 }}
          border="1px solid"
          borderBottom="0px none"
          borderTop="0px none"
          w={'1300px'}
          transitionDuration="1000ms"
        >
          <Heading fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} mb={6}>
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
                textDecorationThickness={{base: "4px", md: "8px"}}
                as="span"
              >
                DI BIAGGIO
              </Text>
            </Tooltip>
            .
          </Heading>
          <Stack spacing={9} px={{ base: 0, md: 20 }}>
            <UnderlinedHeading>
              Who?
            </UnderlinedHeading>
            <Text
              px={{ base: 3, md: 6 }}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            >
              Anthony... it's me? From your dreams?
            </Text>
            <Text
              px={{ base: 3, md: 6 }}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            >
              I'm a computer science graduate from the University of Minnesota. I know a lot of things -
              virtual reality, graphics, UI/UX, backend, <span style={{textDecoration: "line-through"}}>crying</span>, etc.,
              but most importantly I care about writing quality software that is easy to use, easy to understand, and easy
              to extend.
            </Text>
            <Text
              px={{ base: 3, md: 6 }}
              fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}
            >
              Learning new things keeps me happy, and I am always trying to broaden my horizons while also becoming more
              well-versed in the areas that I am confident in.
            </Text>
            <UnderlinedHeading mb={"100"}>
              Built With
            </UnderlinedHeading>
            <Grid
              pt={"10"}
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
                  text={'Style primitives, color mode helpers, accessibility'}
                  heading={'ChakraUI'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiReact}
                  alt={'React logo'}
                  color={'white'}
                  text={'Frontend logic'}
                  heading={'React.js'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiNextDotJs}
                  alt={'Nextjs logo'}
                  color={'white'}
                  text={
                    'React framework that makes routing, bundle optimization, etc. easier'
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
                  text={'Frontend hosting and domain configuration'}
                  heading={'Vercel'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiNodeDotJs}
                  alt={'Nodejs logo'}
                  color={'white'}
                  text={
                    'Backend logic - handles database queries, WebSocket communications'
                  }
                  heading={'Node.js'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiPostgresql}
                  alt={'PostgreSQL logo'}
                  color={'white'}
                  text={'SQL data storage for Graffiti and Deathball'}
                  heading={'PostgreSQL'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
              <GridItem>
                <IconCard
                  icon={SiHeroku}
                  alt={'Heroku logo'}
                  color={'white'}
                  text={'Deployment for backend - Graffiti API, Deathball API'}
                  heading={'Heroku'}
                  rounded={'true'}
                ></IconCard>
              </GridItem>
            </Grid>
          </Stack>
        </Stack>
      </Center>
    </>
  )
}
