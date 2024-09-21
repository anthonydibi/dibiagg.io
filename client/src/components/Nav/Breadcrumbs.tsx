import React from 'react';
import lightModeLogo from '../../../public/lightmodelogo.png';
import darkModeLogo from '../../../public/darkmodelogo.png';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { BreadcrumbConfig, BreadcrumbSearchWhitelist } from './constants';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import ColorModeSwitcher from '../ColorModeSwitcher';

type Props = {};

const Breadcrumbs = (props: Props) => {
  const pathname = usePathname();
  const logo = useColorModeValue(lightModeLogo, darkModeLogo);
  const splitPathname = pathname.split('/');
  const search = useSearchParams();

  const isRecipesPage = pathname.includes('recipes');

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
          ? '.2rem .625rem .2rem 260px'
          : '.2rem .625rem',
      ]}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        maxWidth={isRecipesPage ? 'unset' : '1200px'}
      >
        <Flex
          as={motion.div}
          layout="position"
          pointerEvents="auto"
          pr={1}
          h="48px"
          width="max-content"
          alignItems="center"
          justifyContent="start"
          border="2px solid var(--accent)"
          bg={useColorModeValue('var(--light)', 'var(--dark)')}
        >
          <Breadcrumb separator={<ChevronRightIcon color="accent" />}>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/">
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
                <BreadcrumbItem key={path}>
                  <BreadcrumbLink
                    _hover={{ textDecoration: 'underline' }}
                    as={Link}
                    href={config.href}
                    shallow
                  >
                    <Heading
                      _hover={{ textDecoration: 'underline' }}
                      size="xs"
                      fontWeight={600}
                    >
                      {config.display}
                    </Heading>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
            {Array.from(search).map(([key, value]) => {
              if (!BreadcrumbSearchWhitelist.includes(key)) {
                return null;
              }
              return (
                <BreadcrumbItem key={key}>
                  <BreadcrumbLink
                    _hover={{ textDecoration: 'underline' }}
                    as={Link}
                    href="#"
                    shallow
                  >
                    <Heading
                      _hover={{ textDecoration: 'underline' }}
                      size="xs"
                      fontWeight={600}
                    >
                      {value}
                    </Heading>
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
          position="sticky"
          p=".4rem"
          alignItems="center"
          justifyContent="start"
          border="2px solid var(--accent)"
          bg={useColorModeValue('var(--light)', 'var(--dark)')}
        >
          <ColorModeSwitcher />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Breadcrumbs;
