import {
  Box,
  Flex,
  HStack,
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
  MenuItem,
  Collapse
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import {
  SunIcon,
  MoonIcon,
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons'
import ContactButtons from '../components/ContactButtons'

const LeftLinks = [
  { display: 'ABOUT', href: '/' },
  { display: 'GRAFFITI', href: '/graffiti' },
  { display: 'THREESHARP', href: '/threesharp' },
]
const RightLinks = [
  { display: 'BLOG', href: '/blog' },
  { display: 'RESUME', href: '/resume' },
]

const NavLink = (props) => (
  <Link
    href={props.href}
    onClick={props.onClick}
    fontWeight={'bold'}
    border="1px solid transparent"
    px={2}
    py={1}
    _hover={{
      textDecoration: 'none',
      border: '1px solid',
    }}
  >
    {props.children}
  </Link>
)

const FakeLink = (props) => (
  <Box
    fontWeight={'bold'}
    border="1px solid transparent"
    px={2}
    py={1}
    _hover={{
      textDecoration: 'none',
      border: '1px solid',
    }}
  >
    {props.children}
  </Box>
)

export default function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('white', 'black')

  return (
    <>
      <Flex
        position="sticky"
        top="0"
        bg={useColorModeValue('pink.50', 'black')}
        w="100%"
        zIndex="100"
        borderBottom={'1px solid'}
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
            <Box>
              <Heading
                mx={{ base: '5', md: '0' }}
                fontFamily={'SangoStatic'}
                size={'xl'}
              >
                DB.
                <Heading
                  as="span"
                  color="accent"
                  size="xl"
                  fontFamily={'SangoStatic'}
                >
                  IO
                </Heading>
              </Heading>
            </Box>
            <HStack as={'nav'} display={{ base: 'none', md: 'flex' }}>
              {LeftLinks.map((link) => (
                <NavLink href={`${link.href}`} key={link.display}>
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
                  <MenuItem
                    onClick={() => {
                      window.open('https://gilded-kulfi-c5ad94.netlify.app/')
                    }}
                  >
                    <FakeLink>PLAY</FakeLink>
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
              {RightLinks.map((link) => (
                <NavLink href={`${link.href}`} key={link.display}>
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
            border="1px solid"
            borderTop="none"
            borderLeft="none"
            borderRight="none"
            zIndex={'500'}
            position="sticky"
            top="60px"
            w={'100%'}
            bg={bgColor}
            p={4}
            display={{ md: 'none' }}
          >
            <Stack as={'nav'} spacing={4} align={'start'}>
              {LeftLinks.map((link) => (
                <NavLink href={`${link.href}`} key={link.display}>
                  {link.display}
                </NavLink>
              ))}
              {RightLinks.map((link) => (
                <NavLink href={`${link.href}`} key={link.display}>
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
                  <MenuItem
                    onClick={() => {
                      window.open('https://gilded-kulfi-c5ad94.netlify.app/')
                    }}
                  >
                    <FakeLink>PLAY</FakeLink>
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
  )
}
