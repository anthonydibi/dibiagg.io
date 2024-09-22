import {
  Grid,
  Heading,
  Text,
  Tooltip,
  Box,
  Flex,
  Link,
  Button,
  Icon,
  useOutsideClick,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import React, { Suspense, useEffect } from 'react';
import SEO from '../components/seo';
import ColorModeSwitcher from '../components/ColorModeSwitcher';
import HomeGridItem from '../components/grid/HomeGridItem';
import {
  ChevronLeftIcon,
  CloseIcon,
  ExternalLinkIcon,
  LinkIcon,
} from '@chakra-ui/icons';
import Script from 'next/script';
import GraffitiCanvas from '../components/GraffitiCanvas';
import NextLink from 'next/link';
import MyLinks from '../components/MyLinks';
import {
  SiHeroku,
  SiNextDotJs,
  SiNodeDotJs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { BsLightningFill, BsTriangleFill } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { skillIcons } from '../components/threejs/Skills';

const Skills = dynamic(() => import('../components/threejs/Skills'), {
  ssr: false,
  loading: () => (
    <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
      <Spinner color="var(--darklight)" boxSize="28px" />
    </Flex>
  ),
});

const BuiltWithMarqueeContent = () => (
  <Flex
    direction={['row', null, 'column']}
    p=".2rem"
    gap={8}
    alignItems="center"
  >
    {builtWithTechs.map((tech) => (
      <Icon
        key={tech.name}
        as={tech.icon}
        boxSize={['36px', null, '48px', '76px']}
        color="accent"
      />
    ))}
  </Flex>
);

const BuiltWithMarquee = () => {
  return (
    <>
      <Flex className="marquee-vert">
        <BuiltWithMarqueeContent />
      </Flex>
      <Flex className="marquee-vert">
        <BuiltWithMarqueeContent />
      </Flex>
      <Flex className="marquee-vert">
        <BuiltWithMarqueeContent />
      </Flex>
      <Flex className="marquee-vert">
        <BuiltWithMarqueeContent />
      </Flex>
    </>
  );
};

const Marquee = () => (
  <>
    <Flex className="marquee">
      <MarqueeContent />
    </Flex>
    <Flex className="marquee">
      <MarqueeContent />
    </Flex>
  </>
);

const MarqueeContent = () => (
  <Flex direction="row" p=".2rem" alignItems="center">
    {Array(3)
      .fill(0)
      .map((_, i) => (
        <>
          <Heading size={['md', null, 'lg']} whiteSpace="nowrap">
            ANTHONY{' '}
            <Tooltip
              label="(dee-bee-aw-jee-oh)"
              border="1px solid"
              px="1"
              borderRadius="0"
              bg="lightdark"
              textColor="darklight"
              borderColor="darklight"
              fontSize="sm"
            >
              <Text
                whiteSpace="nowrap"
                textDecorationColor={'accent'}
                decoration={'underline dotted'}
                textDecorationThickness="4px"
                as="span"
                lineHeight="36px"
              >
                DI BIAGGIO
              </Text>
            </Tooltip>
          </Heading>
          <Flex>
            <ChevronLeftIcon boxSize="36px" />
            <ChevronLeftIcon boxSize="36px" />
            <ChevronLeftIcon boxSize="36px" />
            <ChevronLeftIcon boxSize="36px" />
          </Flex>
        </>
      ))}
  </Flex>
);

const builtWithTechs = [
  {
    name: 'React',
    icon: SiReact,
  },
  {
    name: 'TypeScript',
    icon: SiTypescript,
  },
  {
    name: 'ChakraUI',
    icon: BsLightningFill,
  },
  {
    name: 'Next.js',
    icon: SiNextDotJs,
  },
  {
    name: 'Node.js',
    icon: SiNodeDotJs,
  },
  {
    name: 'Heroku',
    icon: SiHeroku,
  },
  {
    name: 'Vercel',
    icon: BsTriangleFill,
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
  },
];

export default function About() {
  const [selectedSkill, setSelectedSkill] = React.useState(null);
  const skillsPopupRef = React.useRef(null);

  const skillIconColor = useColorModeValue('black', 'white');

  useOutsideClick({
    ref: skillsPopupRef,
    handler: () => setSelectedSkill(null),
  });

  const handleMarqueeMouseEnter = (e) => {
    const allMarquees = document.querySelectorAll('.marquee');
    allMarquees.forEach((marquee) => {
      marquee.style.animationPlayState = 'paused';
    });
  };

  const handleMarqueeMouseLeave = (e) => {
    const allMarquees = document.querySelectorAll('.marquee');
    allMarquees.forEach((marquee) => {
      marquee.style.animationPlayState = 'running';
    });
  };

  return (
    <>
      <SEO
        description="About dibiagg.io"
        title="About"
        siteTitle="dibiagg.io"
      />
      <Script
        src="https://cdn.socket.io/4.5.0/socket.io.min.js"
        integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k"
        crossorigin="anonymous"
      ></Script>
      <Flex
        w="100%"
        minH="100vh"
        direction="column"
        justifyContent="center"
        alignItems="center"
        p={['.1rem', null, '.625rem']}
      >
        <Flex
          maxW="1200px"
          onMouseEnter={handleMarqueeMouseEnter}
          onMouseLeave={handleMarqueeMouseLeave}
          w="100%"
          overflow="hidden"
          direction="row"
          border="2px solid var(--accent)"
          borderBottom="2px solid var(--accent)"
          justifyContent="space-between"
        >
          <Marquee />
        </Flex>
        <Box maxW="1200px">
          <Grid
            templateColumns="repeat(12, minmax(0, 1fr))"
            bg="accent"
            gridGap="2px"
            border="2px solid var(--accent)"
            borderTop="none"
          >
            <HomeGridItem
              colSpan={[12, null, 5, 6]}
              rowSpan={3}
              position="relative"
              title="WHO?"
            >
              <Flex direction="column">
                <Flex
                  direction="row"
                  alignItems="center"
                  flexWrap="wrap"
                ></Flex>
                <Text>
                  I'm a software engineer. Grew up in Philadelphia, now living
                  in Minneapolis. I graduated from the University of Minnesota
                  in 2023.
                  <br /> <br />
                  I think that the web is one of the most powerful technology
                  platforms. I am passionate about building anything that lives
                  in or is related to the browser.
                  <br /> <br />
                  In particular, I thrive when creating interactive experiences
                  that are not only visually robust, but also must deal with
                  massive amounts of incoming data and have strict performance
                  requirements. These are the sort of challenges where I feel
                  most at home.
                  <br /> <br />
                  Most days you will find me scoping out new board games at a
                  local game store, trying out a new recipe, or working on my
                  latest random project. Have fun looking around! ✌️
                </Text>{' '}
              </Flex>
            </HomeGridItem>
            <HomeGridItem colSpan={[6, null, 3]} title="LOCATION">
              <Flex direction="column">
                <Text>Minneapolis, Minnesota 🥶</Text>
                <Text color={'GrayText'}>
                  It's worth it for the summers, I swear.....
                </Text>
              </Flex>
            </HomeGridItem>
            <HomeGridItem
              colSpan={[6, null, 4, 3]}
              title="SKILLS"
              rowSpan={3}
              position="relative"
              overflow="hidden"
            >
              <Skills onClick={setSelectedSkill} />
              <AnimatePresence>
                {selectedSkill && (
                  <Flex
                    ref={skillsPopupRef}
                    as={motion.div}
                    p=".2rem"
                    height="150px"
                    width="100%"
                    left={0}
                    zIndex={1}
                    bg="var(--off)"
                    position="absolute"
                    initial={{ bottom: '-100%' }}
                    animate={{ bottom: '0' }}
                    exit={{ bottom: '-100%' }}
                  >
                    <Button
                      variant="icon"
                      position="absolute"
                      top={'.525rem'}
                      right=".525rem"
                      onClick={() => setSelectedSkill(null)}
                    >
                      <CloseIcon boxSize="12px" />
                    </Button>
                    <Flex
                      flexDirection="column"
                      gap="8px"
                      width="100%"
                      height="100%"
                      border="2px solid var(--accent)"
                      p=".625rem"
                      alignItems="space-between"
                    >
                      <Flex
                        alignItems="center"
                        flexDirection="row"
                        gap="4px"
                        height="max-content"
                      >
                        <Text
                          fontSize="20px"
                          fill={skillIconColor}
                          color={skillIconColor}
                        >
                          {
                            skillIcons.find(
                              (skill) => skill.name === selectedSkill,
                            ).icon
                          }
                        </Text>
                        <Text>{selectedSkill}</Text>
                      </Flex>
                      <Text color={'GrayText'}>
                        {
                          skillIcons.find(
                            (skill) => skill.name === selectedSkill,
                          ).desc
                        }
                      </Text>
                    </Flex>
                  </Flex>
                )}
              </AnimatePresence>
            </HomeGridItem>
            <HomeGridItem colSpan={[6, null, 3]} title="CAREER">
              <Flex direction="column">
                <Text>DraftKings 🤓 🏈</Text>
                <Text color={'GrayText'}>
                  I currently work on the web app for{' '}
                  <Link href="https://pick6.draftkings.com/" isExternal>
                    Pick6
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                  , a daily fantasy sports game. I also build internal tooling.
                </Text>
              </Flex>
            </HomeGridItem>
            <HomeGridItem colSpan={[6, null, 3]} title="IDK">
              <Flex direction="column">
                <Text>DraftKings 🤓 🏈</Text>
                <Text color={'GrayText'}>
                  I currently work on the web app for{' '}
                  <Link href="https://pick6.draftkings.com/" isExternal>
                    Pick6
                    <ExternalLinkIcon mx="2px" />
                  </Link>
                  , a daily fantasy sports game. I also build internal tooling.
                </Text>
              </Flex>
            </HomeGridItem>
            {/* <HomeGridItem colSpan={[6, null, 3]} title="RECIPES">
              <Flex direction="column">
                <Text>
                  I am constantly trying out new recipes, and put my favorites
                  in Paprika. You can check them out{' '}
                  <Link as={NextLink} href="/recipes">
                    here.
                    <LinkIcon mx={1} boxSize="12px" />
                  </Link>
                </Text>
              </Flex>
            </HomeGridItem> */}
            <HomeGridItem colSpan={12} title="PROJECTS">
              <Flex h="200px" />
            </HomeGridItem>
            <HomeGridItem colSpan={[12, null, 10]} rowSpan={2} title="GRAFFITI">
              <GraffitiCanvas />
            </HomeGridItem>
            <HomeGridItem colSpan={[12, null, 2]} rowSpan={1} title="LINKS">
              <Flex
                p={2}
                direction={['row', null, 'column']}
                gap="16px"
                flexWrap="wrap"
              >
                <MyLinks />
              </Flex>
            </HomeGridItem>
            <HomeGridItem
              minH="412px"
              colSpan={[12, null, 2]}
              rowSpan={1}
              title="BUILT"
              titleRight="WITH?"
              overflow="hidden"
              position="relative"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
              >
                <Flex
                  position="absolute"
                  direction="column"
                  overflow="hidden"
                  onMouseEnter={handleMarqueeMouseEnter}
                  onMouseLeave={handleMarqueeMouseLeave}
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <BuiltWithMarquee />
                </Flex>
              </Flex>
            </HomeGridItem>
          </Grid>
        </Box>
      </Flex>
    </>
  );
}
