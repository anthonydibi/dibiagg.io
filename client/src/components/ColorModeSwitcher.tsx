import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { FC } from 'react';
import { DARK_ACCENT, LIGHT_ACCENT } from '../styles/theme';

const ColorModeSwitcher: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      aria-label={`Toggle color mode to ${
        colorMode === 'light' ? 'dark' : 'light'
      }`}
      onClick={toggleColorMode}
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
        alignItems={colorMode === 'light' ? 'start' : 'end'}
        justifyContent="center"
      >
        <Flex
          zIndex={2}
          borderRadius="4px"
          width="100%"
          height="50%"
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
