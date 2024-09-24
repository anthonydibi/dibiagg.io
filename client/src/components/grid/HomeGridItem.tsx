import { Box, Flex, GridItem, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, {
  FC,
  forwardRef,
  PropsWithChildren,
  use,
  useEffect,
} from 'react';
import useHash from '../../hooks/useHash';
import { set } from 'date-fns';

interface HomeGridItemProps extends PropsWithChildren {
  hash: string;
  title: string;
  titleRight: string;
}

const HomeGridItem: FC<HomeGridItemProps> = forwardRef(
  ({ hash, title, titleRight, children, ...rest }, ref) => {
    const hashFromUrl = useHash();
    const isHashed = hashFromUrl === hash;

    const [isHydrated, setIsHydrated] = React.useState(false);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (hashFromUrl === hash && isHydrated && ref?.current) {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [hashFromUrl, isHydrated]);

    return (
      <GridItem
        //combine ref and internalRef
        ref={ref}
        as="section"
        bg={useColorModeValue('var(--light)', 'var(--dark)')}
        position="relative"
        p={`${title ? '2rem' : '.625rem'} .625rem .625rem .625rem`}
        {...rest}
        scrollMarginTop="4rem"
      >
        {title && (
          <Flex
            as={'h2'}
            position="absolute"
            top={0}
            left={0}
            bg="accent"
            p=".2rem"
            zIndex={1}
            align="center"
            justify="center"
          >
            <Text as={Link} href={`#${hash}`} color="white" fontSize="xs">
              {title}
            </Text>
            {isHashed && isHydrated && (
              <Box position="absolute" right="-20px" className="cube accent">
                <Box className="top"></Box>
                <Box className="right"></Box>
                <Box className="bottom"></Box>
                <Box className="left"></Box>
                <Box className="front"></Box>
                <Box className="back"></Box>
              </Box>
            )}
          </Flex>
        )}
        {titleRight && (
          <Box position="absolute" top={0} right={0} bg="accent" p=".2rem">
            <Text color="white" fontSize="xs">
              {titleRight}
            </Text>
          </Box>
        )}
        {children}
      </GridItem>
    );
  },
);

export default HomeGridItem;
