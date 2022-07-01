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
  Center,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouteLink } from "react-router-dom";

const Links = [{display: 'About', href: '/About'}, {display: 'Graffiti', href: '/Graffiti'}];

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
      <Box boxShadow="sm" bg={useColorModeValue('pink.50', 'gray.900')} px={4}>
        <Center>
          <Flex w="75%" h={16} alignItems={'center'} justifyContent={'space-between'}>
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
                {Links.map((link) => (
                  <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
              <Button onClick={toggleColorMode}>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Menu>
            </Flex>
          </Flex>
        </Center>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <RouteLink to={link.href} key={link.display}><NavLink key={link.display}>{link.display}</NavLink></RouteLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}