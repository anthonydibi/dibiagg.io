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
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { Suspense, useEffect } from 'react';
import SEO from '../components/seo';
import ColorModeSwitcher from '../components/ColorModeSwitcher';
import HomeGridItem from '../components/grid/HomeGridItem';
import {
  ArrowForwardIcon,
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
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { skillIcons } from '../components/threejs/Skills';
import { getLatestPost } from '../services/BlogApi';
import BlogEntry from '../components/blog/BlogEntry';

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
    p=".2rem 8px .2rem 8px"
    gap={'16px'}
    alignItems="center"
  >
    {builtWithTechs.map((tech) => (
      <Tooltip
        label={tech.name}
        border="1px solid"
        px="1"
        borderRadius="0"
        bg="lightdark"
        textColor="darklight"
        borderColor="darklight"
        fontSize="sm"
      >
        <Box>
          <Icon
            key={tech.name}
            as={tech.icon}
            boxSize={['36px', null, '48px', '76px']}
            color="accent"
          />
        </Box>
      </Tooltip>
    ))}
  </Flex>
);

const BuiltWithMarquee = (props) => {
  return (
    <Flex flexDirection={['row', null, 'column']}>
      <Flex className={props.builtWithMarqueeClass}>
        <BuiltWithMarqueeContent />
      </Flex>
      <Flex className={props.builtWithMarqueeClass}>
        <BuiltWithMarqueeContent />
      </Flex>
      <Flex className={props.builtWithMarqueeClass}>
        <BuiltWithMarqueeContent />
      </Flex>
      <Flex className={props.builtWithMarqueeClass}>
        <BuiltWithMarqueeContent />
      </Flex>
    </Flex>
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

const projects = [
  {
    name: 'dibiagg.io',
    desc: 'My personal website. Random assortment of things I like and things I want people to see. Built with Next.js.',
    href: '#',
  },
  {
    name: 'ThreeSharp',
    desc: 'A Unity application that visualizes C# code in virtual reality using abstract syntax trees.',
    href: 'https://www.youtube.com/watch?v=JaxGmNPOdZM',
  },
  {
    name: 'Deathball clone',
    desc: 'A clone of the arcade game Deathball which I manically programmed at 2am one night.',
    href: 'https://gilded-kulfi-c5ad94.netlify.app/',
  },
  {
    name: 'Graffiti',
    desc: 'A canvas where you can draw and leave your mark on my site. Uses WebSockets to sync your art with peers, and persists drawings in a PostgreSQL DB.',
    href: '#Graffiti',
  },
];

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

export default function About({ latestBlogPost }) {
  const [selectedSkill, setSelectedSkill] = React.useState(null);
  const skillsPopupRef = React.useRef(null);

  const skillIconColor = useColorModeValue('black', 'white');

  useOutsideClick({
    ref: skillsPopupRef,
    handler: () => setSelectedSkill(null),
  });

  const handleMarqueeMouseEnter = (e, className) => {
    const allMarquees = document.querySelectorAll(`.${className}`);
    allMarquees.forEach((marquee) => {
      marquee.style.animationPlayState = 'paused';
    });
  };

  const handleMarqueeMouseLeave = (e, className) => {
    const allMarquees = document.querySelectorAll(`.${className}`);
    allMarquees.forEach((marquee) => {
      marquee.style.animationPlayState = 'running';
    });
  };

  const builtWithMarqueeClass = useBreakpointValue([
    'marquee',
    null,
    'marquee-vert',
  ]);
  const builtWithTitleLeft = useBreakpointValue(['BUILT WITH?', null, 'BUILT']);
  const builtWithTitleRight = useBreakpointValue([undefined, null, 'WITH?']);

  const skillsContainerRef = React.useRef(null);
  const skillsIsInView = useInView(skillsContainerRef, {
    once: true,
    amount: 0.5,
  });

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
        justifyContent="start"
        alignItems="center"
        p={['.1rem', null, '.625rem']}
      >
        <Flex
          as="h1"
          maxW="1200px"
          onMouseEnter={(e) => handleMarqueeMouseEnter(e, 'marquee')}
          onMouseLeave={(e) => handleMarqueeMouseLeave(e, 'marquee')}
          w="100%"
          overflow="hidden"
          direction="row"
          border="2px solid var(--accent)"
          borderBottom="2px solid var(--accent)"
          justifyContent="space-between"
        >
          <Marquee />
        </Flex>
        <Box maxW="1200px" as="article">
          <Grid
            templateColumns="repeat(12, minmax(0, 1fr))"
            bg="accent"
            gridGap="2px"
            border="2px solid var(--accent)"
            borderTop="none"
          >
            <HomeGridItem
              hash="Who?"
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
                  in or is related to the browser. My favorite challenges
                  involve creating experiences that are visually robust and
                  data-intensive.
                  <br /> <br />
                  Most days you will find me scoping out new board games at a
                  local game store, trying out a new recipe, or working on my
                  latest random project. Have fun looking around! ✌️
                </Text>{' '}
              </Flex>
            </HomeGridItem>
            <HomeGridItem
              hash="Skills"
              colSpan={[6, null, 4, 3]}
              title="SKILLS"
              rowSpan={3}
              position="relative"
              overflow="hidden"
              ref={skillsContainerRef}
            >
              <Skills
                onClick={setSelectedSkill}
                paused={!skillsIsInView}
                selectedSkill={selectedSkill}
              />
              <AnimatePresence>
                {selectedSkill && (
                  <Flex
                    ref={skillsPopupRef}
                    as={motion.div}
                    p=".2rem"
                    height="auto"
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
            <HomeGridItem
              colSpan={[6, null, 3]}
              title="LOCATION"
              hash="Location"
            >
              <Flex direction="column">
                <Text>Minneapolis, Minnesota 🥶</Text>
                <Text color={'GrayText'}>
                  It's worth it for the summers, I swear.....
                </Text>
              </Flex>
            </HomeGridItem>
            <HomeGridItem colSpan={[6, null, 3]} title="CAREER" hash="Career">
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
            <HomeGridItem colSpan={[6, null, 3]} title="RECIPES" hash="Recipes">
              <Flex direction="column">
                <Text>
                  I enjoy sharing my love of food 🍝, so I've made all of my
                  recipes available from my site. You can check them out{' '}
                  <Link as={NextLink} href="/recipes">
                    here.
                    <LinkIcon mx={1} boxSize="12px" />
                  </Link>
                </Text>
              </Flex>
            </HomeGridItem>
            <HomeGridItem
              p="2rem 0 .625rem 0"
              colSpan={[12, 12, 9]}
              title="PROJECTS"
              hash="Projects"
            >
              <Flex
                direction="row"
                overflowX="auto"
                gap="16px"
                overflowY="hidden"
                h="100%"
              >
                {projects.map((project, index) => (
                  <Flex
                    ml={index === 0 ? '.625rem' : 0}
                    mr={index === projects.length - 1 ? '.625rem' : 0}
                    direction="column"
                    p="1rem"
                    border="2px solid var(--accent)"
                    w="100%"
                    gap="4px"
                    minW="200px"
                  >
                    <Flex
                      justifyContent="space-between"
                      flexDirection="column"
                      h="100%"
                    >
                      <Flex flexDirection="column" gap={1}>
                        <Heading size="md">{project.name}</Heading>
                        <Text>{project.desc}</Text>
                      </Flex>
                      <Flex justifyContent="right">
                        <Button
                          p={0}
                          border="1px solid"
                          borderRadius="100%"
                          transition="background-position 0.3s ease"
                          background="linear-gradient(to left, transparent 50%, var(--accent) 50%) right"
                          backgroundSize="200% 100%"
                          _hover={{ backgroundPosition: 'left' }}
                          _active={{ backgroundPosition: 'left' }}
                          variant="icon"
                          as={NextLink}
                          href={project.href}
                          isExternal={
                            !project.href.startsWith('#') &&
                            !project.href.startsWith('/')
                          }
                        >
                          <ArrowForwardIcon
                            transform="rotate(-45deg)"
                            boxSize="24px"
                          />
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </HomeGridItem>
            <HomeGridItem
              colSpan={[12, 12, 3]}
              title="LATEST POST"
              hash="Latest post"
            >
              <BlogEntry post={latestBlogPost} />
            </HomeGridItem>
            <HomeGridItem
              colSpan={[12, null, 10]}
              rowSpan={2}
              title="GRAFFITI"
              hash="Graffiti"
            >
              <GraffitiCanvas />
            </HomeGridItem>
            <HomeGridItem
              colSpan={[12, null, 2]}
              rowSpan={1}
              title="LINKS"
              hash="Links"
            >
              <Grid
                p={2}
                templateColumns={['1fr 1fr', '1fr 1fr 1fr', '1fr']}
                gap="16px"
              >
                <MyLinks />
              </Grid>
            </HomeGridItem>
            <HomeGridItem
              minH={['120px', null, '412px']}
              p={`2rem 0 .625rem 0`}
              colSpan={[12, null, 2]}
              rowSpan={1}
              hash="Built with"
              title={builtWithTitleLeft}
              titleRight={builtWithTitleRight}
              overflow="hidden"
              position="relative"
              display="flex"
              justifyContent="center"
              alignItems="center"
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
                  onMouseEnter={(e) =>
                    handleMarqueeMouseEnter(e, builtWithMarqueeClass)
                  }
                  onMouseLeave={(e) =>
                    handleMarqueeMouseLeave(e, builtWithMarqueeClass)
                  }
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <BuiltWithMarquee
                    builtWithMarqueeClass={builtWithMarqueeClass}
                  />
                </Flex>
              </Flex>
            </HomeGridItem>
          </Grid>
        </Box>
      </Flex>
    </>
  );
}

export const getStaticProps = async () => {
  const latestBlogPost = await getLatestPost([
    'title',
    'date',
    'slug',
    'author',
    'tags',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { latestBlogPost },
  };
};
