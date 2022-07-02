import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Heading,
  Button,
  Menu,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  Spacer,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouteLink } from "react-router-dom";

const LeftLinks = [{display: 'About', href: '/About'}, {display: 'Graffiti', href: '/Graffiti'}];
const RightLinks = [{display: 'Resume', href: '/Resume'},{display: "Contact", href: '/Contact'}]

const NavLink = ({ children }) => (
  <Link
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
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Heading size="xl"
              bgClip="text"
              bgGradient='linear(to-l, #7928CA, #FF0080)'>
              dibiagg.io</Heading>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {LeftLinks.map((link) => (
                <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
              ))}
            </HStack>
          </HStack>
          <Spacer />
          <Spacer />
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
        <Box h="70px"></Box>
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {LeftLinks.map((link) => (
              <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
            ))}
            {RightLinks.map((link) => (
              <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
            ))}
          </Stack>
        </Box>
        </>
      ) : null}
    </>
  );
}