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
      height="100%"
      border="1px var(--accent)"
      minWidth={0}
    >
      <Flex
        w="32px"
        h="48px"
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
          height="24px"
          background={useColorModeValue(
            'linear-gradient(145deg, #ffffff, #d8d8d8)',
            'linear-gradient(145deg, #222222, #1d1d1d)',
          )}
          justifyContent="center"
          alignItems="center"
        >
          {colorMode === 'light' ? (
            <SunIcon color="accent" w={'18px'} h={'18px'} />
          ) : (
            <MoonIcon color="accent" w="18px" h="18px" />
          )}
        </Flex>
        <Box
          position="absolute"
          top=".55rem"
          w="6px"
          h="6px"
          background={DARK_ACCENT}
          borderRadius="4px"
        />
        <Box
          position="absolute"
          bottom=".55rem"
          w="6px"
          h="6px"
          background={LIGHT_ACCENT}
          borderRadius="4px"
        />
      </Flex>
    </Button>
  );
};
/** '--accent': mode('#FF5F1F', '#38B2AC')(props), */
export default ColorModeSwitcher;
