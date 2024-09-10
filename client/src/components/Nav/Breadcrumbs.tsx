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
import { BreadcrumbConfig, BreadcrumbPositionConfig } from './constants';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import ColorModeSwitcher from '../ColorModeSwitcher';

type Props = {};

const Breadcrumbs = (props: Props) => {
  const pathname = usePathname();
  const logo = useColorModeValue(lightModeLogo, darkModeLogo);
  const splitPathname = pathname.split('/');

  return (
    <Flex
      zIndex={999}
      as={motion.div}
      layout="position"
      position="sticky"
      top={['2px', null, '.2rem .625rem']}
      m={[
        '2px',
        null,
        pathname.includes('recipes')
          ? '.2rem .625rem .2rem 260px'
          : '.2rem .625rem',
      ]}
      p=".4rem"
      alignItems="center"
      justifyContent="start"
      border="2px solid var(--accent)"
      width="max-content"
      bg={useColorModeValue('var(--light)', 'var(--dark)')}
    >
      <Box mr={1}>
        <ColorModeSwitcher />
      </Box>
      <Breadcrumb separator={<ChevronRightIcon color="accent" />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            <Image
              style={{ display: 'inline-block', verticalAlign: 'bottom' }}
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
              <BreadcrumbLink as={Link} href={config.href}>
                <Heading size="xs" fontWeight={600}>
                  {config.display}
                </Heading>
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Flex>
  );
};

export default Breadcrumbs;
