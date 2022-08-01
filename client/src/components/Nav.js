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

const LeftLinks = [{display: 'ABOUT', href: '/About'}, {display: 'GRAFFITI', href: '/Graffiti'}];
const RightLinks = [{display: 'RESUME', href: '/Resume'}]

const NavLink = ({ onClick, children }) => (
  <Link
    onClick={onClick}
    fontWeight={"bold"}
    border="1px solid transparent"
    px={2}
    py={1}
    _hover={{
      textDecoration: 'none',
      border: "1px solid"
    }}>
    {children}
  </Link>
);

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "black");

  return (
    <>
        <Flex position="sticky" top="0" bg={useColorModeValue("pink.50", "black")} w="100%" zIndex="100" borderBottom={"1px solid"} borderColor={useColorModeValue("black", "white")} h={"60px"} align="center">
          <Spacer />
          <IconButton
            size={'md'}
            variant="interact"
            rounded="none"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Center>
            <HStack spacing={8} alignItems={'center'}>
              <Box>
                <Heading mx={{ base: "5", md: "0"}}
                size={"lg"}>
                DB.<Heading as="span" color="accent" size="lg">IO</Heading></Heading>
              </Box>
              <HStack
                as={'nav'}
                display={{ base: 'none', md: 'flex' }}>
                {LeftLinks.map((link) => (
                  <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
                ))}
               <Menu>
                <MenuButton as={Button} 
                  fontWeight={"bold"}
                  border="1px solid transparent"
                  px={2}
                  rounded={"none"}
                  _hover={{
                    textDecoration: 'none',
                    border: "1px solid"
                  }} variant={"interact"} rightIcon={<ChevronDownIcon />} h={"31px"}>
                  DEATHBALL CLONE
                </MenuButton>
                <MenuList bg={useColorModeValue("white", "black")} borderRadius="0px" border="1px solid">
                  <MenuItem><RouteLink to={"/deathball/about"} key={"about"}><NavLink key={"about"}>ABOUT</NavLink></RouteLink></MenuItem>
                  <MenuItem onClick={() => { window.open("https://gilded-kulfi-c5ad94.netlify.app/")}}><NavLink>PLAY</NavLink></MenuItem>
                  <MenuItem><RouteLink to={"/deathball/leaderboard"} key={"leaderboard"}><NavLink key={"leaderboard"}>LEADERBOARD</NavLink></RouteLink></MenuItem>
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
            <Button onClick={toggleColorMode} variant="interact" p="2" rounded="none">
                {colorMode === 'light' ? <MoonIcon color="accent" /> : <SunIcon color="accent"/>}
            </Button>
            </Menu>
          </Flex>
          <Spacer />
        </Flex>

      {isOpen ? (
        <>
        <Box border="1px solid" borderTop="none" borderLeft="none" borderRight="none" zIndex={"500"} position="sticky" top="60px"  w={"100%"} bg={bgColor} p={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4} align={"start"}>
            {LeftLinks.map((link) => (
              <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
            ))}
            {RightLinks.map((link) => (
              <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
            ))}
            <Menu>
                <MenuButton as={Button} 
                  fontWeight={"bold"}
                  border="1px solid transparent"
                  px={2}
                  py={1}
                  rounded={"none"}
                  _hover={{
                    textDecoration: 'none',
                    border: "1px solid"
                  }} variant={"ghost"} rightIcon={<ChevronDownIcon />} h={"31px"}>
                  DEATHBALL CLONE
                </MenuButton>
                <MenuList bg={bgColor} borderRadius="0px" border="1px solid">
                  <MenuItem><RouteLink to={"/deathball/about"} key={"about"}><NavLink key={"about"}>ABOUT</NavLink></RouteLink></MenuItem>
                  <MenuItem onClick={() => { window.open("https://gilded-kulfi-c5ad94.netlify.app/")}}><NavLink>PLAY</NavLink></MenuItem>
                  <MenuItem><RouteLink to={"/deathball/leaderboard"} key={"leaderboard"}><NavLink key={"leaderboard"}>LEADERBOARD</NavLink></RouteLink></MenuItem>
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