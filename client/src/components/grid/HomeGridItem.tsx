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
  title?: string;
  titleCenter?: React.ReactNode;
  titleRight?: React.ReactNode;
}

const HomeGridItem: FC<HomeGridItemProps> = forwardRef(
  ({ hash, title, titleCenter, titleRight, children, ...rest }, ref) => {
    const hashFromUrl = useHash();
    const isHashed = hashFromUrl === hash;

    const [isHydrated, setIsHydrated] = React.useState(false);

    const internalRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      setIsHydrated(true);
    }, []);

    useEffect(() => {
      if (hashFromUrl === hash && isHydrated && internalRef?.current) {
        internalRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }, [hashFromUrl, isHydrated]);

    return (
      <GridItem
        //combine ref and internalRef
        ref={(el) => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(el);
            } else {
              ref.current = el;
            }
          }
          internalRef.current = el;
        }}
        as="section"
        bg={useColorModeValue('var(--light)', 'var(--dark)')}
        position="relative"
        p={`${title ? '2rem' : '.625rem'} .625rem .625rem .625rem`}
        {...rest}
        scrollMarginTop="4rem"
      >
        {title && (
          <Flex
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex={1}
            align="stretch"
            pointerEvents="none"
          >
            <Flex
              as={'h2'}
              position="relative"
              bg="accent"
              p=".2rem"
              align="center"
              justify="center"
              pointerEvents="auto"
            >
              <Text as={Link} href={`#${hash}`} color="white" fontSize="xs">
                {title}
              </Text>
              {isHashed && isHydrated && (
                <Box
                  position="absolute"
                  top={titleCenter ? 'calc(100% + 7px)' : undefined}
                  left={titleCenter ? '7px' : undefined}
                  right={titleCenter ? undefined : '-20px'}
                  className="cube accent"
                >
                  <Box className="top"></Box>
                  <Box className="right"></Box>
                  <Box className="bottom"></Box>
                  <Box className="left"></Box>
                  <Box className="front"></Box>
                  <Box className="back"></Box>
                </Box>
              )}
            </Flex>
            {titleCenter && (
              <Flex
                flex="1"
                minW={0}
                align="center"
                justify="center"
                overflow="hidden"
                pointerEvents="auto"
              >
                {titleCenter}
              </Flex>
            )}
          </Flex>
        )}
        {titleRight && (
          <Box
            position="absolute"
            top={0}
            right={0}
            bg="accent"
            p=".2rem"
            zIndex={1}
          >
            {typeof titleRight === 'string' ? (
              <Text color="white" fontSize="xs">
                {titleRight}
              </Text>
            ) : (
              titleRight
            )}
          </Box>
        )}
        {children}
      </GridItem>
    );
  },
);

HomeGridItem.displayName = 'HomeGridItem';

export default HomeGridItem;
