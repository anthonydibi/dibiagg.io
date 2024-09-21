import { Box, GridItem, Text, useColorModeValue } from '@chakra-ui/react';
import React, { FC, PropsWithChildren } from 'react';

interface HomeGridItemProps extends PropsWithChildren {
  title: string;
  titleRight: string;
}

const HomeGridItem: FC<HomeGridItemProps> = ({
  title,
  titleRight,
  children,
  ...rest
}) => {
  return (
    <GridItem
      bg={useColorModeValue('var(--light)', 'var(--dark)')}
      position="relative"
      p={`${title ? '2rem' : '.625rem'} .625rem .625rem .625rem`}
      {...rest}
    >
      {title && (
        <Box
          position="absolute"
          top={0}
          left={0}
          bg="accent"
          p=".2rem"
          zIndex={1}
        >
          <Text color="white" fontSize="xs">
            {title}
          </Text>
        </Box>
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
};

export default HomeGridItem;
