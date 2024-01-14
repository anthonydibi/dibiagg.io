import {
  Box,
  Flex,
  HStack,
  IconButton,
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
  MenuItem,
  Collapse,
} from '@chakra-ui/react';
import {
  SunIcon,
  MoonIcon,
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import ContactButtons from '../ContactButtons';
import Image from 'next/image';
import lightModeLogo from '../../../public/lightmodelogo.png';
import darkModeLogo from '../../../public/darkmodelogo.png';
import NavLink from './NavLink';
import { NavLeftLinks, NavRightLinks } from './constants';

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('var(--light)', 'var(--dark)');
  const logo = useColorModeValue(lightModeLogo, darkModeLogo);

  return (
    <>
      <Flex
        position="sticky"
        top="0"
        bg={useColorModeValue('var(--light)', 'var(--dark)')}
        boxShadow={'md'}
        w="100%"
        zIndex="100"
        borderColor={useColorModeValue('black', 'white')}
        h={'60px'}
        align="center"
      >
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
            <Box mx={{ base: 4, md: 0 }}>
              <Image
                alt={
                  'A logo with a circle, two vertical lines, and another circle, representing the letters db'
                }
                width={90}
                height={60}
                src={logo}
                priority
              />
            </Box>
            <HStack as={'nav'} display={{ base: 'none', md: 'flex' }}>
              {NavLeftLinks.map((link) => (
                <NavLink href={link.href} key={link.display}>
                  {link.display}
                </NavLink>
              ))}
              <Menu>
                <MenuButton
                  as={Button}
                  fontWeight={'bold'}
                  border="1px solid transparent"
                  px={2}
                  rounded={'none'}
                  _hover={{
                    textDecoration: 'none',
                    border: '1px solid',
                  }}
                  variant={'interact'}
                  rightIcon={<ChevronDownIcon />}
                  h={'31px'}
                >
                  DEATHBALL CLONE
                </MenuButton>
                <MenuList
                  bg={useColorModeValue('white', 'black')}
                  borderRadius="0px"
                  border="1px solid"
                >
                  <MenuItem>
                    <NavLink href="/deathball/about" key={'about'}>
                      ABOUT
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      key="play-deathball"
                      href="https://gilded-kulfi-c5ad94.netlify.app/"
                    >
                      PLAY
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink href="/deathball/leaderboard" key={'leaderboard'}>
                      LEADERBOARD
                    </NavLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
        </Center>
        <Spacer display={{ base: 'none', md: 'block' }} />
        <Spacer display={{ base: 'none', md: 'block' }} />
        <Flex alignItems={'center'}>
          <Menu>
            <HStack
              mr={'32px'}
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {NavRightLinks.map((link) => (
                <NavLink href={link.href} key={link.display}>
                  {link.display}
                </NavLink>
              ))}
              <ContactButtons />
            </HStack>
            <Button
              onClick={toggleColorMode}
              variant="interact"
              p="2"
              rounded="none"
            >
              {colorMode === 'light' ? (
                <MoonIcon color="accent" />
              ) : (
                <SunIcon color="accent" />
              )}
            </Button>
          </Menu>
        </Flex>
        <Spacer />
      </Flex>
      <Box
        as={Collapse}
        in={isOpen}
        animateOpacity={false}
        boxShadow={'md'}
        zIndex={'500'}
        position="sticky"
        top="60px"
        w={'100%'}
        bg={bgColor}
        p={4}
        display={{ md: 'none' }}
      >
        <Stack as={'nav'} spacing={4} align={'start'}>
          {NavLeftLinks.map((link) => (
            <NavLink href={link.href} key={link.display}>
              {link.display}
            </NavLink>
          ))}
          {NavRightLinks.map((link) => (
            <NavLink href={link.href} key={link.display}>
              {link.display}
            </NavLink>
          ))}
          <Menu>
            <MenuButton
              as={Button}
              fontWeight={'bold'}
              border="1px solid transparent"
              px={2}
              py={1}
              rounded={'none'}
              _hover={{
                textDecoration: 'none',
                border: '1px solid',
              }}
              variant={'ghost'}
              rightIcon={<ChevronDownIcon />}
              h={'31px'}
            >
              DEATHBALL CLONE
            </MenuButton>
            <MenuList bg={bgColor} borderRadius="0px" border="1px solid">
              <MenuItem>
                <NavLink href="/deathball/about" key={'about'}>
                  ABOUT
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink href="https://gilded-kulfi-c5ad94.netlify.app/">
                  PLAY
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink href="/deathball/leaderboard" key={'leaderboard'}>
                  LEADERBOARD
                </NavLink>
              </MenuItem>
            </MenuList>
          </Menu>
          <Stack direction={'row'} justify={'center'}>
            <ContactButtons />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}