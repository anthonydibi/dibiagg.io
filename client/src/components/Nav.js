import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Heading,
  Button,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Spacer,
  Center,
  MenuButton,
  Menu,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Link as RouteLink } from "react-router-dom";
import ContactButtons from '../components/ContactButtons'

const LeftLinks = [{display: 'About', href: '/About'}, {display: 'Graffiti', href: '/Graffiti'}];
const RightLinks = [{display: 'Resume', href: '/Resume'}]

const NavLink = ({ onClick, children }) => (
  <Link
    onClick={onClick}
    fontWeight={"bold"}
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}>
    {children}
  </Link>
);

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("pink.50", "gray.900");

  return (
    <>
        <Flex top="0" position="fixed" w="100%" zIndex="100" boxShadow="sm" bg={useColorModeValue('pink.50', 'gray.900')} px={4} h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Spacer />
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Center>
            <HStack spacing={8} alignItems={'center'}>
              <Box>
                <Heading mx={{ base: "5", md: "0"}}
                size="xl"
                bgClip="text"
                bgGradient='linear(to-l, #7928CA, #FF0080)'>
                dibiagg.io</Heading>
              </Box>
              <HStack
                as={'nav'}
                display={{ base: 'none', md: 'flex' }}>
                {LeftLinks.map((link) => (
                  <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
                ))}
               <Menu>
                <MenuButton as={Button} variant={"ghost"} rightIcon={<ChevronDownIcon />}>
                  Deathball Clone
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => { window.location = "https://gilded-kulfi-c5ad94.netlify.app/" }}><NavLink>Play</NavLink></MenuItem>
                  <MenuItem><RouteLink to={"/deathball/leaderboard"} key={"leaderboard"}><NavLink key={"leaderboard"}>Leaderboard</NavLink></RouteLink></MenuItem>
                </MenuList>
              </Menu>
              </HStack>
            </HStack>
          </Center>
          <Spacer display={{ base: "none", md: "block"} } />
          <Spacer display={{ base: "none", md: "block"} } />
          <Flex alignItems={'center'}>
            <Menu>
            <HStack
              mr={"32px"}
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {RightLinks.map((link) => (
                <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
              ))}
              <ContactButtons />
            </HStack>
            <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Menu>
          </Flex>
          <Spacer />
        </Flex>

      {isOpen ? (
        <>
        <Box h="64px"></Box>
        <Box zIndex={"500"} position={"fixed"} w={"100%"} bg={bgColor} p={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4} align={"start"}>
            {LeftLinks.map((link) => (
              <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
            ))}
            {RightLinks.map((link) => (
              <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
            ))}
            <Menu>
              <MenuButton p={"0px 8px"} as={Button} variant={"ghost"} rightIcon={<ChevronDownIcon />}>
                Deathball Clone
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => { window.location = "https://gilded-kulfi-c5ad94.netlify.app/" }}><NavLink>Play</NavLink></MenuItem>
                <MenuItem><RouteLink to={"/deathball/leaderboard"} key={"leaderboard"}><NavLink key={"leaderboard"}>Leaderboard</NavLink></RouteLink></MenuItem>
              </MenuList>
            </Menu>
            <Stack direction={"row"} justify={"center"}>
              <ContactButtons />
            </Stack>
          </Stack>
        </Box>
        </>
      ) : null}
    </>
  );
}