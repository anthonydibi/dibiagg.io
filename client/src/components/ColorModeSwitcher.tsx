import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';
import { DARK_ACCENT, LIGHT_ACCENT } from '../styles/theme';
import { motion } from 'framer-motion';

const ColorModeSwitcher: FC = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [isGoingDark, setIsGoingDark] = useState<boolean>(false);
  const setColorModeTimeout = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  // To handle color mode flash on page refresh since the state is initialized on the server
  useEffect(() => {
    setIsGoingDark(colorMode === 'dark');
  }, [colorMode]);

  const onRequestColorModeChange = () => {
    if (setColorModeTimeout.current) {
      clearTimeout(setColorModeTimeout.current);
    }
    const currentIsGoingDark = isGoingDark;

    setIsGoingDark(!isGoingDark);
    setColorModeTimeout.current = setTimeout(() => {
      setColorMode(currentIsGoingDark ? 'light' : 'dark');
    }, 150);
  };

  return (
    <Button
      aria-label={`Toggle color mode to ${
        colorMode === 'light' ? 'dark' : 'light'
      }`}
      onClick={onRequestColorModeChange}
      variant="unstyled"
      border="1px var(--accent)"
      minWidth={0}
    >
      <Flex
        aspectRatio={2 / 3}
        height="100%"
        p={'1.5px'}
        borderRadius={'4px'}
        background={useColorModeValue('#f0f0f0', 'dark')}
        boxShadow={useColorModeValue(
          'inset 5px 5px 10px #b2b2b2, inset -5px -5px 10px #ffffff',
          'inset 5px 5px 9px #0f0f0f, inset -5px -5px 9px #313131',
        )}
        justifyContent="center"
        position="relative"
      >
        <Box
          p=".1rem"
          height="55%"
          width="100%"
          zIndex={2}
          position="absolute"
          as={motion.div}
          animate={{ top: !isGoingDark ? 0 : '45%' }}
        >
          <Flex
            borderRadius="4px"
            width="100%"
            height="100%"
            background={useColorModeValue(
              'linear-gradient(145deg, #ffffff, #d8d8d8)',
              'linear-gradient(145deg, #222222, #1d1d1d)',
            )}
            justifyContent="center"
            alignItems="center"
          >
            {colorMode === 'light' ? (
              <SunIcon color="accent" w="50%" />
            ) : (
              <MoonIcon color="accent" w="50%" />
            )}
          </Flex>
        </Box>
        <Box
          aspectRatio={1 / 1}
          position="absolute"
          top=".55rem"
          w="15%"
          background={DARK_ACCENT}
          borderRadius="4px"
        />
        <Box
          aspectRatio={1 / 1}
          position="absolute"
          bottom=".55rem"
          w="15%"
          background={LIGHT_ACCENT}
          borderRadius="4px"
        />
      </Flex>
    </Button>
  );
};
/** '--accent': mode('#FF5F1F', '#38B2AC')(props), */
export default ColorModeSwitcher;
