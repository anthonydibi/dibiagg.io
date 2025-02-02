import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Spacer,
  Center,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
  Collapse,
  useBreakpoint,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';
import ContactButtons from '../ContactButtons';
import Image from 'next/image';
import lightModeLogo from '../../../public/lightmodelogo.png';
import darkModeLogo from '../../../public/darkmodelogo.png';
import NavLink, { NavLinkProps } from './NavLink';
import {
  DeathballLinks,
  NavLeftLinks,
  NavProjectLinks,
  NavRightLinks,
} from './constants';
import ColorModeSwitcher from '../ColorModeSwitcher';

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('var(--light)', 'var(--dark)');
  const logo = useColorModeValue(lightModeLogo, darkModeLogo);
  const shouldUseShortenedNav = useBreakpointValue({ base: true, xl: false });

  const handleNavLinkClick = () => {
    onClose();
  };

  const mapToLink = (link: NavLinkProps) => {
    return (
      <NavLink key={link.display} {...link} onClick={handleNavLinkClick}>
        {link.display}
      </NavLink>
    );
  };

  const projectsMenu = (
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
        PROJECTS
      </MenuButton>
      <MenuList
        bg={useColorModeValue('white', 'black')}
        borderRadius="0px"
        border="1px solid"
      >
        {NavProjectLinks.map((link) => (
          <MenuItem key={link.display}>{mapToLink(link)}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

  const deathballMenu = (
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
        {DeathballLinks.map((link) => (
          <MenuItem key={link.display}>{mapToLink(link)}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );

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
          display={{ lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Center>
          <HStack spacing={8} alignItems={'center'}>
            <Box mx={{ base: 4, lg: 0 }}>
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
            <HStack as={'nav'} display={{ base: 'none', lg: 'flex' }}>
              {shouldUseShortenedNav ? (
                <>
                  {' '}
                  {mapToLink({ display: 'ABOUT', href: '/' })}
                  {projectsMenu}
                  {deathballMenu}
                </>
              ) : (
                <>
                  {NavLeftLinks.map(mapToLink)}
                  {deathballMenu}
                </>
              )}
            </HStack>
          </HStack>
        </Center>
        <Spacer display={{ base: 'none', lg: 'block' }} />
        <Spacer display={{ base: 'none', lg: 'block' }} />
        <Flex alignItems={'center'}>
          <HStack
            mr={'32px'}
            as={'nav'}
            spacing={4}
            display={{ base: 'none', lg: 'flex' }}
          >
            {NavRightLinks.map(mapToLink)}
            <ContactButtons />
          </HStack>
          <ColorModeSwitcher />
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
        display={{ lg: 'none' }}
      >
        <Stack as={'nav'} spacing={4} align={'start'}>
          {NavLeftLinks.map(mapToLink)}
          {NavRightLinks.map(mapToLink)}
          {deathballMenu}
          <Stack direction={'row'} justify={'center'}>
            <ContactButtons />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
