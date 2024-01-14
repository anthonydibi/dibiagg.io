import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Center,
} from '@chakra-ui/react';
import { Link } from '@chakra-ui/next-js';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });
import Emoji from '../../components/Emoji';
import SEO from '../../components/seo';

export default function DeathballAbout() {
  return (
    <>
      <SEO
        description="About Anthony Di Biaggio's Deathball clone"
        title="About Deathball clone"
        siteTitle="dibiagg.io"
      />
      <Center>
        <Container
          px={{ base: 0, md: 30 }}
          mx={{ base: 1, md: 5 }}
          maxW={'7xl'}
          border="1px solid"
          borderBottom="0px none"
          borderTop="0px none"
        >
          <Stack
            spacing={{ base: 8, md: 10 }}
            align="start"
            p={{ base: 5, md: 20 }}
            direction={{ base: 'column', md: 'row' }}
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text as={'span'} position={'relative'}>
                  What is
                </Text>
                <br />
                <Text
                  as={Link}
                  decoration={'underline'}
                  href={'https://deathball.cab'}
                  color={'accent'}
                >
                  Deathball?
                </Text>
              </Heading>
              <Text fontSize={'xl'}>
                Deathball is an arcade game that me and my friends are addicted
                to - it's like if Rocket League had a two-dimensional baby with
                an old-school arcade RPG. You play as a wizard and attempt to
                put a ball into the other wizard's net. The only problem is that
                it is a cabinet-only game so we have to go on-site and pay 50¢
                to play.
              </Text>
              <Text fontSize={'xl'}>
                This gave me the idea to create a "clone" of the game so that we
                could play when we aren't able or wanting to go out.{' '}
                <em>Clone</em> is in quotes because my version doesn't touch the
                insane visual and mechanical polish of the original, I can only
                hope that someone plays it and says{' '}
                <em>"hey, that was kind of fun."</em>
              </Text>
              <Text fontSize={'xl'}>
                I built this game using Phaser 3, which is a JavaScript game
                framework. Originally I planned to develop the game in Unity,
                but I decided that it would be really inconvenient to have to
                download and install the game in order to play it. With Phaser I
                can give someone a link and they can play on any desktop device
                instantly without any setup. I like Phaser because it gives
                well-documented implementations for conventional game features
                like tilemaps, collision, scenes, etc. and since it is
                open-source if there is something about the API that I don't
                like I can just write something myself. It's also surprisingly
                performant for a web framework - with graphics acceleration
                enabled the game runs upwards of 200 fps on my machine.
              </Text>
              <Text fontSize={'xl'}>
                One disadvantage of hosting the game on the web is that the only
                well-supported communication API is WebSocket, and WebSocket
                only supports TCP so the prospect of making Deathball a remote
                multiplayer experience isn't great.{' '}
                <Link href="https://webrtc.org/">WebRTC</Link> allows
                peer-to-peer UDP connections and seems to be pretty supported
                these days, it is not supported in Internet Explorer but IE has
                been discontinued <Emoji label={'celebration'} symbol={'🎉'} />{' '}
                so maybe that is a sign that I should add multiplayer. We shall
                see.
              </Text>
              <Text fontSize={'xs'}>
                All credit goes to the original creator, Tony Hauber.
              </Text>
            </Stack>
            <Flex
              flex={1}
              justify={'center'}
              align={'center'}
              position={{ base: 'relative', md: 'sticky' }}
              top={{ base: '0', md: '80px' }}
              w={'full'}
              p="1"
              border={'1px'}
            >
              <Box
                position={'relative'}
                boxShadow={'2xl'}
                width={'100%'}
                height={'100%'}
                overflow={'hidden'}
              >
                <ReactPlayer
                  width={'100%'}
                  url="https://www.youtube.com/watch?v=aeIkB0Uw2kM"
                />
              </Box>
              <Box
                position="absolute"
                right="-7rem"
                w="7rem"
                h="0px"
                borderTop="1px"
                display={{ base: 'none', md: 'block' }}
              ></Box>
            </Flex>
          </Stack>
        </Container>
      </Center>
    </>
  );
}
