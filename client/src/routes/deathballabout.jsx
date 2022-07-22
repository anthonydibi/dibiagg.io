import {
    Container,
    Stack,
    Flex,
    Box,
    Heading,
    Text,
    Link
  } from '@chakra-ui/react';
  import ReactPlayer from 'react-player'
  
  export default function DeathballAbout() {
    return (
    <>
      <Box w="100%" h="70px"></Box>
      <Container maxW={'7xl'}>
        <Stack
          align={'center'}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: 'column', md: 'row' }}>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
              <Text
                as={'span'}
                position={'relative'}>
                What is
              </Text>
              <br />
              <Text as={Link} decoration={"underline"} href={"https://deathball.cab"} color={'red.400'}>
                Deathball?
              </Text>
            </Heading>
            <Text fontSize={"xl"}>
                Deathball is an arcade game that me and my friends are addicted to - it's like if Rocket League had a two-dimensional baby
                with an old-school arcade RPG. You play as a wizard and attempt to put a ball into the other wizard's net. The only problem is that it is a cabinet-only game
                so we have to go on-site and pay 50¢ to play.
            </Text>
            <Text fontSize={"xl"}>
                This gave me the idea to create a "clone" of the game so that we could play when we aren't able or wanting to go out. <em>Clone</em> is in quotes because my 
                version doesn't touch the insane visual and mechanical polish of the original, I can only hope that
                someone plays it and says <em>"hey, that was kind of fun."</em>
            </Text>
            <Text>
                All credit goes to the original creator, Tony Hauber.
            </Text>
          </Stack>
          <Flex
            flex={1}
            justify={'center'}
            align={'center'}
            position={'relative'}
            w={'full'}>
            <Box
              position={'relative'}
              rounded={'2xl'}
              boxShadow={'2xl'}
              width={"full"}
              overflow={'hidden'}>
              <ReactPlayer width={"100%"}
                url='https://www.youtube.com/watch?v=aeIkB0Uw2kM'
              />
            </Box>
          </Flex>
        </Stack>
      </Container>
      </>
    );
  }