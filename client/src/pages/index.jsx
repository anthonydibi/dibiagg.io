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
} from '@chakra-ui/icons';
import Script from 'next/script';
import GraffitiCanvas from '../components/GraffitiCanvas';
import NextLink from 'next/link';
import MyLinks from '../components/MyLinks';
import {
  SiHeroku,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import { BsLightningFill, BsTriangleFill } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { skillCategories, skillIcons } from '../components/threejs/Skills';
import { getLatestPost } from '../services/BlogApi';
import BlogEntry from '../components/blog/BlogEntry';
import TrackingEye from '../components/TrackingEye';

const Skills = dynamic(() => import('../components/threejs/Skills'), {
  ssr: false,
  loading: () => (
    <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
      <Spinner color="var(--darklight)" boxSize="28px" />
    </Flex>
  ),
});

const RecipesPotView = dynamic(
  () => import('../components/threejs/RecipesPotView'),
  {
    ssr: false,
    loading: () => (
      <Flex w="100%" h="100%" justifyContent="center" alignItems="center">
        <Spinner color="var(--darklight)" boxSize="28px" />
      </Flex>
    ),
  },
);

const BuiltWithMarqueeContent = () => (
  <Flex
    direction={['row', null, 'column']}
    py="tight"
    px="control"
    gap="card"
    alignItems="center"
  >
    {builtWithTechs.map((tech) => (
      <Tooltip
        key={tech.name}
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
  <Flex direction="row" p="tight" alignItems="center">
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
    name: 'RaidGuessr',
    desc: 'A daily puzzle game for MMO raids.',
    href: 'https://raidguessr.dev/',
    videoSrc: '/raidguessr-showcase.mp4',
    videoPosition: '38.5% center',
    videoOffsetY: '15%',
    videoBackground: '#080b16',
  },
  {
    name: 'ThreeSharp',
    desc: 'A Unity app that visualizes C# code in virtual reality.',
    href: 'https://www.youtube.com/watch?v=JaxGmNPOdZM',
    videoSrc: '/threesharp-showcase.mp4',
    videoPosition: 'center center',
    videoBackground: '#1e2530',
  },
  {
    name: 'Memedle',
    desc: 'Meme guessing game, each guess upgrades quality.',
    href: 'https://memedle.dev/',
    videoBackground: '#f0f0f0',
    videoTextColor: '#202020',
    content: (
      <Flex justifyContent="center" mt={1} mb={1} overflow="hidden">
        <Box
          as="video"
          aria-hidden="true"
          tabIndex={-1}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          src="/memedle-showcase-tile.mp4"
          aspectRatio="1 / 1"
          objectFit="contain"
          objectPosition="center center"
          pointerEvents="none"
        />
      </Flex>
    ),
  },
  {
    name: 'Graffiti',
    desc: 'A canvas where you can draw and leave your mark on my site. Uses WebSockets to sync your art with peers, and persists drawings in a PostgreSQL DB. No penises, please.',
    href: '#Graffiti',
  },
  {
    name: 'Deathball clone',
    desc: 'A clone of the arcade game Deathball which I manically programmed at 2am one night during college.',
    href: 'https://gilded-kulfi-c5ad94.netlify.app/',
  },
];

const isExternalProjectHref = (href) =>
  href.startsWith('http://') || href.startsWith('https://');

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
    icon: SiNextdotjs,
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
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
  const [isRecipesPotReady, setIsRecipesPotReady] = React.useState(false);
  const handleRecipesPotReady = React.useCallback(
    () => setIsRecipesPotReady(true),
    [],
  );
  const [isGraffitiDrawing, setIsGraffitiDrawing] = React.useState(false);
  const [selectedSkill, setSelectedSkill] = React.useState(null);
  const [selectedSkillCategory, setSelectedSkillCategory] =
    React.useState(null);
  const [previewedSkillCategory, setPreviewedSkillCategory] =
    React.useState(null);
  const activeSkillCategory = previewedSkillCategory ?? selectedSkillCategory;
  const skillCategoryScrollerRef = React.useRef(null);
  const skillCategoryScrollFrameRef = React.useRef(null);
  const skillCategoryTouchFocusRef = React.useRef(false);
  const skillCategoryHasInteractedRef = React.useRef(false);
  const [skillCategoryScrollEdges, setSkillCategoryScrollEdges] =
    React.useState({ left: false, right: false });
  const skillsPopupRef = React.useRef(null);
  const skillCloseButtonRef = React.useRef(null);
  const skillTriggerRef = React.useRef(null);
  const useSkillTooltips =
    useBreakpointValue({ base: false, md: true }) ?? false;

  const skillIconColor = useColorModeValue('black', 'white');
  const skillCategoryBackground = useColorModeValue(
    'gray.300',
    'whiteAlpha.200',
  );
  const skillCategoryColor = useColorModeValue('var(--dark)', 'white');
  const secondaryTileTextColor = useColorModeValue('GrayText', 'gray.300');
  const projectCardBackground = useColorModeValue(
    'var(--light)',
    'var(--dark)',
  );
  const projectCardShadow = useColorModeValue(
    '5px 5px 8px #cccccc, -5px -5px 8px #fafafa',
    '5px 5px 8px #1b1b1b, -5px -5px 8px #252525',
  );

  const updateSkillCategoryScrollEdges = React.useCallback(() => {
    const scroller = skillCategoryScrollerRef.current;
    if (!scroller) return;

    const nextEdges = {
      left: skillCategoryHasInteractedRef.current && scroller.scrollLeft > 1,
      right:
        scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth - 1,
    };

    setSkillCategoryScrollEdges((currentEdges) =>
      currentEdges.left === nextEdges.left &&
      currentEdges.right === nextEdges.right
        ? currentEdges
        : nextEdges,
    );
  }, []);

  const handleSkillCategoryScroll = React.useCallback(() => {
    if (skillCategoryScrollFrameRef.current !== null) return;

    skillCategoryScrollFrameRef.current = requestAnimationFrame(() => {
      skillCategoryScrollFrameRef.current = null;
      updateSkillCategoryScrollEdges();
    });
  }, [updateSkillCategoryScrollEdges]);

  const scrollSkillCategoryIntoView = React.useCallback((categoryButton) => {
    const scroller = skillCategoryScrollerRef.current;
    if (!scroller || scroller.scrollWidth <= scroller.clientWidth) return;

    const scrollerBounds = scroller.getBoundingClientRect();
    const buttonBounds = categoryButton.getBoundingClientRect();
    const scrollerCenter = scrollerBounds.left + scrollerBounds.width / 2;
    const buttonCenter = buttonBounds.left + buttonBounds.width / 2;

    scroller.scrollBy({
      left: buttonCenter - scrollerCenter,
      behavior: 'smooth',
    });
  }, []);

  useOutsideClick({
    ref: skillsPopupRef,
    handler: () => setSelectedSkill(null),
  });

  useEffect(() => {
    if (!useSkillTooltips && selectedSkill) {
      skillCloseButtonRef.current?.focus({ preventScroll: true });
    }
  }, [selectedSkill, useSkillTooltips]);

  const handleSkillSelect = (skillName) => {
    skillTriggerRef.current = document.activeElement;
    setSelectedSkill((currentSkill) =>
      currentSkill === skillName ? null : skillName,
    );
  };

  const closeSkillDetails = () => {
    setSelectedSkill(null);
    requestAnimationFrame(() =>
      skillTriggerRef.current?.focus?.({ preventScroll: true }),
    );
  };

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
  const builtWithTitleLeft = useBreakpointValue(['BUILT WITH', null, 'BUILT']);
  const builtWithTitleRight = useBreakpointValue([undefined, null, 'WITH']);

  const skillsContainerRef = React.useRef(null);
  const skillsIsInView = useInView(skillsContainerRef, {
    once: true,
    amount: 0.5,
  });

  useEffect(() => {
    const scroller = skillCategoryScrollerRef.current;
    if (!scroller) return;

    updateSkillCategoryScrollEdges();
    const resizeObserver = new ResizeObserver(updateSkillCategoryScrollEdges);
    resizeObserver.observe(scroller);
    Array.from(scroller.children).forEach((categoryButton) => {
      resizeObserver.observe(categoryButton);
    });

    return () => {
      resizeObserver.disconnect();
      if (skillCategoryScrollFrameRef.current !== null) {
        cancelAnimationFrame(skillCategoryScrollFrameRef.current);
      }
    };
  }, [updateSkillCategoryScrollEdges]);

  const skillCategoryScrollMask = skillCategoryScrollEdges.left
    ? skillCategoryScrollEdges.right
      ? 'linear-gradient(to right, transparent, black 14px, black calc(100% - 14px), transparent)'
      : 'linear-gradient(to right, transparent, black 14px)'
    : skillCategoryScrollEdges.right
    ? 'linear-gradient(to right, black calc(100% - 14px), transparent)'
    : undefined;

  return (
    <>
      <Head>
        <link
          rel="preload"
          href="/recipe-pot-stew.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/recipe-pot-stew-lid.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link rel="preload" href="/Textures/colormap.png" as="image" />
      </Head>
      <SEO description="About dibiagg.io" title="Home" siteTitle="dibiagg.io" />
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
        p={['grid', null, 'tile']}
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
          boxShadow="md"
        >
          <Marquee />
        </Flex>
        <Box maxW="1200px" as="article" boxShadow="md">
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
                  I'm a software engineer. Grew up in West Chester, PA, now
                  living in Minneapolis. I graduated from the University of
                  Minnesota in 2023.
                  <br /> <br />
                  The browser is one of my favorite creative and technical
                  platforms, but I'm most interested in solving complex problems
                  wherever they live, from frontend experiences and realtime
                  systems, to backend services, infrastructure, and tooling. My
                  favorite challenges involve distilling complicated problems
                  into polished, intuitive solutions as part of a team that
                  cares deeply about the end product.
                  <br /> <br />
                  Most days you will find me scoping out new board games at a
                  local game store, biking unreasonable distances, trying out a
                  new recipe, or working on my latest random project. Have fun
                  looking around!
                  <TrackingEye />
                </Text>{' '}
              </Flex>
            </HomeGridItem>
            <HomeGridItem
              hash="Skills"
              colSpan={[6, null, 4, 3]}
              title="SKILLS"
              titleCenter={
                <Flex
                  ref={skillCategoryScrollerRef}
                  role="group"
                  aria-label="Filter skills by category"
                  align="center"
                  mt="grid"
                  px="1.5"
                  width="100%"
                  maxW="100%"
                  gap="tight"
                  overflowX="auto"
                  overflowY="hidden"
                  justifyContent="safe center"
                  onScroll={handleSkillCategoryScroll}
                  onPointerDownCapture={() => {
                    skillCategoryHasInteractedRef.current = true;
                  }}
                  onWheel={() => {
                    skillCategoryHasInteractedRef.current = true;
                  }}
                  onKeyDown={() => {
                    skillCategoryHasInteractedRef.current = true;
                  }}
                  sx={{
                    scrollbarWidth: 'none',
                    WebkitMaskImage: skillCategoryScrollMask,
                    maskImage: skillCategoryScrollMask,
                    '&::-webkit-scrollbar': { display: 'none' },
                  }}
                >
                  {skillCategories.map((category) => {
                    const isActive = activeSkillCategory === category.id;

                    return (
                      <Box
                        key={category.id}
                        as="button"
                        type="button"
                        aria-label={`Filter skills by ${category.label.toLowerCase()}`}
                        aria-pressed={selectedSkillCategory === category.id}
                        title={category.label}
                        color={isActive ? 'white' : skillCategoryColor}
                        bg={isActive ? 'accent' : skillCategoryBackground}
                        display="inline-flex"
                        alignItems="center"
                        height="18px"
                        fontSize="9px"
                        lineHeight="1"
                        px="tight"
                        flexShrink={0}
                        whiteSpace="nowrap"
                        onPointerDown={(event) => {
                          skillCategoryTouchFocusRef.current =
                            event.pointerType === 'touch';
                        }}
                        onPointerEnter={(event) => {
                          if (event.pointerType === 'touch') return;
                          setPreviewedSkillCategory(category.id);
                        }}
                        onPointerLeave={(event) => {
                          if (event.pointerType === 'touch') return;
                          setPreviewedSkillCategory(null);
                        }}
                        onFocus={() => {
                          if (!skillCategoryTouchFocusRef.current) {
                            setPreviewedSkillCategory(category.id);
                          }
                        }}
                        onBlur={() => {
                          skillCategoryTouchFocusRef.current = false;
                          setPreviewedSkillCategory(null);
                        }}
                        onClick={(event) => {
                          scrollSkillCategoryIntoView(event.currentTarget);
                          setPreviewedSkillCategory(null);
                          setSelectedSkillCategory((currentCategory) =>
                            currentCategory === category.id
                              ? null
                              : category.id,
                          );
                        }}
                        sx={{
                          '@media (hover: hover)': {
                            '&:hover': { bg: 'accent', color: 'white' },
                          },
                        }}
                        _focusVisible={{
                          outline: '1px solid white',
                          outlineOffset: '-1px',
                        }}
                      >
                        {category.label}
                      </Box>
                    );
                  })}
                </Flex>
              }
              rowSpan={3}
              position="relative"
              overflow="hidden"
              zIndex={2}
              ref={skillsContainerRef}
            >
              <Skills
                onClick={handleSkillSelect}
                paused={!skillsIsInView}
                selectedSkill={selectedSkill}
                showTooltips={useSkillTooltips}
                activeCategory={activeSkillCategory}
              />
              <AnimatePresence>
                {!useSkillTooltips && selectedSkill && (
                  <Flex
                    ref={skillsPopupRef}
                    as={motion.div}
                    p="tight"
                    height="auto"
                    width="100%"
                    left={0}
                    zIndex={2}
                    bg="var(--off)"
                    position="absolute"
                    role="region"
                    aria-live="polite"
                    aria-label={`${selectedSkill} skill details`}
                    onKeyDown={(event) => {
                      if (event.key === 'Escape') closeSkillDetails();
                    }}
                    initial={{ bottom: '-100%' }}
                    animate={{ bottom: '0' }}
                    exit={{ bottom: '-100%' }}
                  >
                    <Button
                      ref={skillCloseButtonRef}
                      variant="icon"
                      position="absolute"
                      top={'.525rem'}
                      right=".525rem"
                      onClick={closeSkillDetails}
                      aria-label="Close skill details"
                      data-skill-drawer-control=""
                    >
                      <CloseIcon boxSize="12px" />
                    </Button>
                    <Flex
                      flexDirection="column"
                      gap="control"
                      width="100%"
                      height="100%"
                      border="2px solid var(--accent)"
                      p="tile"
                      alignItems="space-between"
                    >
                      <Flex
                        alignItems="center"
                        flexDirection="row"
                        gap="tight"
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
                <Text color={secondaryTileTextColor}>
                  It's worth it for the summers, I swear.....
                </Text>
              </Flex>
            </HomeGridItem>
            <HomeGridItem colSpan={[6, null, 3]} title="CAREER" hash="Career">
              <Flex direction="column">
                <Text>DraftKings 🤓 🏈</Text>
                <Text color={secondaryTileTextColor}>
                  I currently work on the web app for{' '}
                  <Link href="https://pick6.draftkings.com/" isExternal>
                    Pick6
                    <ExternalLinkIcon mx="grid" />
                  </Link>
                  , a daily fantasy sports game. I also build internal tooling.
                </Text>
              </Flex>
            </HomeGridItem>
            <HomeGridItem colSpan={[6, null, 3]} title="RECIPES" hash="Recipes">
              <Flex
                align="stretch"
                direction={['column-reverse', null, 'row']}
              >
                <Flex
                  w={['100%', null, '52%']}
                  minW="0"
                  align="center"
                >
                  <Text id="recipes-description">
                    I enjoy sharing my love of food, so all of my recipes
                    sync to my site.
                  </Text>
                </Flex>
                <Box
                  w="125px"
                  flex="0 0 125px"
                  minH={['140px', null, '0']}
                  alignSelf={['center', null, 'stretch']}
                  position="relative"
                  mt="-32px"
                  mb={[0, null, '-10px']}
                >
                  {!isRecipesPotReady && (
                    <Flex
                      position="absolute"
                      inset="0"
                      zIndex={3}
                      justifyContent="center"
                      alignItems="center"
                      bg="var(--off)"
                    >
                      <Spinner color="var(--darklight)" boxSize="28px" />
                    </Flex>
                  )}
                  <RecipesPotView onReady={handleRecipesPotReady} />
                </Box>
              </Flex>
            </HomeGridItem>
            <HomeGridItem
              pt="header"
              pb="tile"
              px="0"
              colSpan={[12, 12, 9]}
              title="PROJECTS"
              hash="Projects"
              display="flex"
              flexDirection="column"
            >
              <Flex
                data-lenis-prevent-horizontal
                direction="row"
                flex="1"
                overflowX="auto"
                gap="card"
                overflowY="hidden"
                py="shadow"
                my="-14px"
              >
                {projects.map((project, index) => (
                  <Flex
                    key={project.name}
                    ml={index === 0 ? 'shadow' : 0}
                    mr={index === projects.length - 1 ? 'shadow' : 0}
                    direction="column"
                    borderRadius="16px"
                    boxShadow={projectCardShadow}
                    w="100%"
                    gap="tight"
                    minW="200px"
                    minH="260px"
                    position="relative"
                    overflow="hidden"
                    bg={projectCardBackground}
                    _after={{
                      content: '""',
                      position: 'absolute',
                      inset: '2px',
                      zIndex: 2,
                      pointerEvents: 'none',
                      border: '2px solid var(--accent)',
                      borderRadius: '14px',
                    }}
                  >
                    <Flex
                      position="relative"
                      m="tight"
                      flex="1"
                      minW="0"
                      overflow="hidden"
                      borderRadius="12px"
                      bg={project.videoBackground ?? projectCardBackground}
                      color={
                        project.videoTextColor ??
                        (project.videoSrc ? 'white' : undefined)
                      }
                    >
                      {project.videoSrc && (
                        <Box
                          as="video"
                          aria-hidden="true"
                          tabIndex={-1}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="metadata"
                          src={project.videoSrc}
                          position="absolute"
                          top={project.videoOffsetY ?? 0}
                          left={0}
                          w="100%"
                          h="100%"
                          objectFit={project.videoFit ?? 'cover'}
                          objectPosition={
                            project.videoPosition ?? 'center center'
                          }
                          pointerEvents="none"
                        />
                      )}
                      <Flex
                        justifyContent="space-between"
                        flexDirection="column"
                        flex="1"
                        w="100%"
                        p="medium"
                        position="relative"
                        zIndex={1}
                      >
                        <Flex flexDirection="column" gap="tight">
                          <Heading size="md">{project.name}</Heading>
                          <Text>{project.desc}</Text>
                          {project.content}
                        </Flex>
                        <Flex justifyContent="right">
                          <Button
                            p={0}
                            boxSize="40px"
                            minW="40px"
                            minH="40px"
                            flexShrink={0}
                            border="1px solid"
                            borderRadius="100%"
                            transition="background-position 0.3s ease, color 0.3s ease"
                            background="linear-gradient(to left, transparent 50%, var(--accent) 50%) right"
                            backgroundSize="200% 100%"
                            _hover={{
                              backgroundPosition: 'left',
                              color: 'white',
                              transform: 'none',
                            }}
                            _active={{
                              backgroundPosition: 'left',
                              color: 'white',
                              transform: 'none',
                            }}
                            variant="icon"
                            as={NextLink}
                            href={project.href}
                            isExternal={isExternalProjectHref(project.href)}
                            target={
                              isExternalProjectHref(project.href)
                                ? '_blank'
                                : undefined
                            }
                            rel={
                              isExternalProjectHref(project.href)
                                ? 'noopener noreferrer'
                                : undefined
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
                  </Flex>
                ))}
              </Flex>
            </HomeGridItem>
            <HomeGridItem
              colSpan={[12, 12, 3]}
              title="LATEST POST"
              hash="Latest post"
            >
              <BlogEntry post={latestBlogPost} tags={false} />
            </HomeGridItem>
            <Grid
              gridColumn="1 / -1"
              templateColumns="repeat(12, minmax(0, 1fr))"
              templateRows={['auto', null, 'repeat(2, minmax(0, 1fr))']}
              bg="accent"
              gap="grid"
            >
              <HomeGridItem
                colSpan={[12, null, 10]}
                rowSpan={[1, null, 2]}
                hash="Graffiti"
                title={isGraffitiDrawing ? undefined : 'GRAFFITI'}
                p="0"
                minH="0"
              >
                <GraffitiCanvas onDrawingChange={setIsGraffitiDrawing} />
              </HomeGridItem>
              <HomeGridItem
                colSpan={[12, null, 2]}
                rowSpan={1}
                title="LINKS"
                hash="Links"
                minH="0"
                overflow="hidden"
              >
                <Grid
                  h="100%"
                  minH="0"
                  p={['control', null, 'tight']}
                  templateColumns={['1fr 1fr', '1fr 1fr 1fr', '1fr']}
                  gap={['control', null, 'medium']}
                  alignContent="start"
                  justifyItems="center"
                >
                  <MyLinks />
                </Grid>
              </HomeGridItem>
              <HomeGridItem
                minH={['120px', null, '0']}
                pt="header"
                pb="tile"
                px="0"
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
