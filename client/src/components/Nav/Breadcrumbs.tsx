import React from 'react';
import lightModeLogo from '../../../public/lightmodelogo.png';
import darkModeLogo from '../../../public/darkmodelogo.png';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Heading,
  Text,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { BreadcrumbConfig, BreadcrumbSearchWhitelist } from './constants';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronRightIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import ColorModeSwitcher from '../ColorModeSwitcher';
import { useNavStore } from '../../stores/navStore';

type Props = {};

const Breadcrumbs = (props: Props) => {
  const pathname = usePathname();
  const logo = useColorModeValue(lightModeLogo, darkModeLogo);
  const splitPathname = pathname.split('/');
  const search = useSearchParams();

  const isRecipesPage = pathname.includes('recipes');

  const navIsOpen = useNavStore((state) => state.isOpen);
  const toggleNav = useNavStore((state) => state.toggle);
  const setIsOpen = useNavStore((state) => state.setIsOpen);

  return (
    <Flex
      as={motion.div}
      layout
      layoutRoot
      zIndex={999}
      width="100%"
      position="sticky"
      top={['2px', null, '.625rem']}
      alignItems="center"
      pointerEvents="none"
      justifyContent="center"
      p={[
        '2px',
        null,
        pathname.includes('recipes')
          ? '.2rem .625rem .2rem 264px'
          : '.2rem .625rem',
      ]}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        minWidth={0}
        maxWidth={isRecipesPage ? 'unset' : '1200px'}
      >
        <Flex
          as={motion.div}
          layout="position"
          pointerEvents="auto"
          pr={1}
          h="48px"
          flex="0 1 auto"
          width="max-content"
          minWidth={0}
          overflow="hidden"
          alignItems="center"
          justifyContent="start"
          border="2px solid var(--accent)"
          bg={useColorModeValue('var(--light)', 'var(--dark)')}
          boxShadow="md"
        >
          <Breadcrumb
            width="100%"
            minWidth={0}
            overflow="hidden"
            separator={<ChevronRightIcon color="accent" />}
            sx={{
              '& > ol': {
                flexWrap: 'nowrap',
                minWidth: 0,
              },
            }}
          >
            <Button
              p={0}
              onClick={toggleNav}
              variant="icon"
              display={[
                pathname.includes('/recipes') ? 'initial' : 'none',
                null,
                'none',
              ]}
            >
              {!navIsOpen ? (
                <HamburgerIcon boxSize="16px" />
              ) : (
                <CloseIcon boxSize="16px" />
              )}
            </Button>
            <BreadcrumbItem flexShrink={0}>
              <BreadcrumbLink
                as={Link}
                href="/"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'bottom',
                    maxWidth: 'unset',
                    marginRight: '-4px',
                  }}
                  alt={
                    'A logo with a circle, two vertical lines, and another circle, representing the letters db'
                  }
                  height={36}
                  src={logo}
                  priority
                />
              </BreadcrumbLink>
            </BreadcrumbItem>
            {splitPathname.map((path) => {
              if (path === '' || !BreadcrumbConfig[path]) {
                return null;
              }
              const config = BreadcrumbConfig[path];
              return (
                <BreadcrumbItem key={path} flexShrink={0}>
                  <BreadcrumbLink
                    _hover={{ textDecoration: 'underline' }}
                    as={Link}
                    href={config.href}
                    onClick={() => setIsOpen(false)}
                    shallow
                  >
                    <Text
                      _hover={{ textDecoration: 'underline' }}
                      fontSize="sm"
                      lineHeight="1.5"
                      fontWeight={600}
                    >
                      {config.display}
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
            {Array.from(search).map(([key, value]) => {
              if (!BreadcrumbSearchWhitelist.includes(key)) {
                return null;
              }
              return (
                <BreadcrumbItem
                  key={key}
                  flex="1 1 auto"
                  minWidth={0}
                  overflow="hidden"
                >
                  <BreadcrumbLink
                    _hover={{ textDecoration: 'underline' }}
                    as={Link}
                    href="#"
                    shallow
                    onClick={() => setIsOpen(false)}
                    display="block"
                    width="100%"
                    minWidth={0}
                    overflow="hidden"
                  >
                    <Text
                      isTruncated
                      _hover={{ textDecoration: 'underline' }}
                      fontSize="xs"
                      lineHeight="1.5"
                      fontWeight={600}
                      maxWidth="100%"
                    >
                      {value}
                    </Text>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </Flex>
        <Flex
          as={motion.div}
          layout="position"
          pointerEvents="auto"
          h="48px"
          width="min-content"
          flexShrink={0}
          position="sticky"
          p=".4rem"
          ml="4px"
          alignItems="center"
          justifyContent="start"
          border="2px solid var(--accent)"
          bg={useColorModeValue('var(--light)', 'var(--dark)')}
          boxShadow="md"
        >
          <ColorModeSwitcher />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Breadcrumbs;
