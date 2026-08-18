import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';
import {
  Flex,
  IconButton,
  Box,
  Heading,
  Stack,
  Spinner,
  useColorModeValue,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/react';
import { FaEraser, FaPen } from 'react-icons/fa';
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillFastForward,
} from 'react-icons/ai';
import { BlockPicker, SliderPicker } from 'react-color';
import { fetchCanvasState, postCanvasLine } from '../services/GraffitiApi';

const GraffitiLoading = () => {
  const canvasBackground = useColorModeValue('#f0f0f0', '#6b7684');

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      justify="center"
      bg={canvasBackground}
    >
      <Spinner color="var(--dark)" />
    </Flex>
  );
};

const GraffitiDrawArea = dynamic(() => import('./GraffitiDrawArea'), {
  ssr: false,
  loading: () => <GraffitiLoading />,
});

export default function GraffitiCanvas({ onDrawingChange }) {
  //built off of free-draw template from react-konva docs
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const [step, setStep] = React.useState(0);
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState({ self: [] });
  const [color, setColor] = React.useState('#000000');
  const [day, setDay] = React.useState(today.toISOString().split('T')[0]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const canvasBackground = useColorModeValue('#f0f0f0', '#6b7684');
  const canvasFrameRef = React.useRef(null);
  const [canvasDimension, setCanvasDimension] = React.useState(0);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const controlsAreShown = controlsVisible && !isDrawing;
  const controlSurface = useColorModeValue('var(--light)', 'var(--dark)');
  const controlHoverSurface = useColorModeValue('#e2e2e2', '#2b2b2b');
  const controlActiveSurface = useColorModeValue('#d6d6d6', '#151515');
  const controlText = useColorModeValue('#202020', '#f8fafc');
  const controlBorder = 'var(--accent)';
  const controlButtonStyles = {
    bg: 'transparent',
    color: 'inherit',
    border: '2px solid transparent',
    borderRadius: 'full',
    boxShadow: 'none',
    _hover: {
      bg: controlHoverSurface,
      borderColor: controlBorder,
    },
    _active: { bg: controlActiveSurface },
  };

  const handleDrawingChange = React.useCallback(
    (nextIsDrawing) => {
      setIsDrawing(nextIsDrawing);
      onDrawingChange?.(nextIsDrawing);
    },
    [onDrawingChange],
  );

  const handleChangeComplete = (color) => {
    setColor(color);
  };

  const getCanvasState = useCallback(
    (step) => {
      fetchCanvasState(step).then(async (response) => {
        if (response.status !== 200) {
          //if we didn't find a wall, then go back to the previous step
          setStep(step - 1);
        } else {
          let data = await response.json();
          setLines({ ...lines, self: data.lines });
          setDay(data.day.split(' ')[0]);
          setIsLoaded(true);
        }
      });
    },
    [lines],
  );

  const updateCanvasState = useCallback(() => {
    //the canvas state is updated line by line
    let line = lines['self'][lines['self'].length - 1];
    if (line != null) {
      postCanvasLine(line);
    }
  }, [lines]);

  const back = () => {
    setStep(step + 1);
  };

  const next = () => {
    if (step - 1 < 0) {
      return;
    }
    setStep(step - 1);
  };

  const fastForward = () => {
    setStep(0);
  };

  const save = () => {
    if (step !== 0) {
      return;
    }
    updateCanvasState();
  };

  React.useEffect(() => {
    getCanvasState(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setIsLoaded(false);
    getCanvasState(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  React.useEffect(() => {
    const canvasFrame = canvasFrameRef.current;
    if (!canvasFrame) return;

    const updateCanvasDimension = (width) => {
      const nextDimension = Math.round(width);
      setCanvasDimension((currentDimension) =>
        currentDimension === nextDimension ? currentDimension : nextDimension,
      );
    };

    updateCanvasDimension(canvasFrame.getBoundingClientRect().width);

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) updateCanvasDimension(entry.contentRect.width);
    });
    resizeObserver.observe(canvasFrame);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box
      className="GraffitiContainer"
      w="100%"
      position="relative"
      overflow="hidden"
    >
      <IconButton
        aria-label={
          controlsVisible ? 'Hide graffiti controls' : 'Show graffiti controls'
        }
        aria-expanded={controlsVisible}
        display={{ base: 'none', lg: 'inline-flex' }}
        position="absolute"
        right="0"
        top="0"
        zIndex="20"
        size="sm"
        variant="interact"
        borderRadius="0"
        bg={controlSurface}
        color={controlText}
        border="2px solid"
        borderColor={controlBorder}
        borderTop="0"
        borderRight="0"
        boxShadow="none"
        _hover={{ bg: controlHoverSurface }}
        _active={{ bg: controlActiveSurface }}
        opacity={isDrawing ? 0 : 1}
        pointerEvents={isDrawing ? 'none' : 'auto'}
        transition="opacity 120ms ease"
        icon={
          controlsVisible ? (
            <AiFillEyeInvisible size="20px" />
          ) : (
            <AiFillEye size="20px" />
          )
        }
        onClick={() => setControlsVisible((isVisible) => !isVisible)}
      />

      <Stack
        display={{ base: 'flex', lg: 'none' }}
        w="100%"
        spacing="control"
        p="control"
        bg={controlSurface}
        color={controlText}
        borderBottom="2px solid"
        borderColor={controlBorder}
      >
        <HStack position="relative" alignSelf="center">
          <IconButton
            aria-label="Go to previous day"
            size="sm"
            isRound
            variant="interact"
            {...controlButtonStyles}
            icon={<AiFillCaretLeft />}
            onClick={back}
          />
          <Heading minW="10ch" textAlign="center" fontSize="xl">
            {day}
          </Heading>
          <IconButton
            aria-label="Go to next day"
            size="sm"
            isRound
            variant="interact"
            {...controlButtonStyles}
            icon={<AiFillCaretRight />}
            onClick={next}
          />
          {step > 0 && (
            <IconButton
              aria-label="Fast forward to current day"
              position="absolute"
              right="-36px"
              size="sm"
              isRound
              variant="interact"
              {...controlButtonStyles}
              icon={<AiFillFastForward />}
              onClick={fastForward}
            />
          )}
        </HStack>
      </Stack>

      <Flex
        display={{ base: 'none', lg: 'flex' }}
        position="absolute"
        top="0"
        left="0"
        right="0"
        zIndex="10"
        justify="center"
        align="center"
        transform={
          controlsAreShown ? 'translateY(0)' : 'translateY(calc(-100% - 2px))'
        }
        transition="transform 220ms ease, opacity 180ms ease"
        opacity={controlsAreShown ? 1 : 0}
        pointerEvents="none"
      >
        <HStack
          position="relative"
          p="tight"
          borderRadius="0"
          _before={{
            content: '""',
            position: 'absolute',
            inset: 0,
            right: step > 0 ? '-40px' : 0,
            zIndex: -1,
            borderRadius: '0',
            bg: controlSurface,
            border: '2px solid',
            borderColor: controlBorder,
            borderTop: '0',
          }}
          color={controlText}
          pointerEvents="auto"
        >
          <IconButton
            aria-label="Go to previous day"
            size="sm"
            isRound
            variant="interact"
            {...controlButtonStyles}
            icon={<AiFillCaretLeft />}
            onClick={back}
          />
          <Heading minW="10ch" textAlign="center">
            {day}
          </Heading>
          <IconButton
            aria-label="Go to next day"
            size="sm"
            isRound
            variant="interact"
            {...controlButtonStyles}
            icon={<AiFillCaretRight />}
            onClick={next}
          />
          {step > 0 && (
            <IconButton
              aria-label="Fast forward to current day"
              position="absolute"
              right="-36px"
              size="sm"
              isRound
              variant="interact"
              {...controlButtonStyles}
              icon={<AiFillFastForward />}
              onClick={fastForward}
            />
          )}
        </HStack>
      </Flex>

      <Box ref={canvasFrameRef} className="graffiti-canvas-frame">
        {canvasDimension > 0 ? (
          <GraffitiDrawArea
            lines={lines}
            setLines={setLines}
            tool={tool}
            isLoaded={isLoaded}
            color={color}
            step={step}
            save={save}
            onDrawingChange={handleDrawingChange}
            canvasDimension={canvasDimension}
          />
        ) : (
          <Flex
            height="100%"
            width="100%"
            align="center"
            justify="center"
            bg={canvasBackground}
          >
            <Spinner color="var(--dark)" />
          </Flex>
        )}
      </Box>

      <Stack
        display={{ base: step === 0 ? 'flex' : 'none', lg: 'none' }}
        w="100%"
        spacing="control"
        p="control"
        bg={controlSurface}
        color={controlText}
        borderTop="2px solid"
        borderColor={controlBorder}
      >
        <HStack justify="flex-start" spacing="control">
          <IconButton
            aria-label="Use pen tool"
            size="md"
            isRound
            variant="interact"
            {...controlButtonStyles}
            borderColor={tool === 'pen' ? controlBorder : 'transparent'}
            icon={<FaPen />}
            onClick={() => setTool('pen')}
          />
          <IconButton
            aria-label="Use eraser tool"
            size="md"
            isRound
            variant="interact"
            {...controlButtonStyles}
            borderColor={tool === 'eraser' ? controlBorder : 'transparent'}
            icon={<FaEraser />}
            onClick={() => setTool('eraser')}
          />
        </HStack>
        <SliderPicker color={color} onChangeComplete={handleChangeComplete} />
      </Stack>

      <Stack
        display={{ base: 'none', lg: step === 0 ? 'flex' : 'none' }}
        position="absolute"
        right="0"
        top="50%"
        transform={
          controlsAreShown
            ? 'translate(0, -50%)'
            : 'translate(calc(100% + 2px), -50%)'
        }
        transition="transform 220ms ease, opacity 180ms ease"
        opacity={controlsAreShown ? 1 : 0}
        pointerEvents={controlsAreShown ? 'auto' : 'none'}
        zIndex="10"
        spacing="control"
        p="control"
        borderRadius="0"
        bg={controlSurface}
        color={controlText}
        border="2px solid"
        borderColor={controlBorder}
        borderRight="0"
        boxShadow="none"
      >
        <IconButton
          aria-label="Use pen tool"
          size="lg"
          isRound
          variant="interact"
          {...controlButtonStyles}
          borderColor={tool === 'pen' ? controlBorder : 'transparent'}
          icon={<FaPen />}
          onClick={() => setTool('pen')}
        />
        <Popover>
          <PopoverTrigger>
            <IconButton
              aria-label="Pick color"
              icon={
                <Box
                  w="20px"
                  h="20px"
                  background={color.hex ?? color}
                  borderRadius="50%"
                />
              }
              size="lg"
              isRound
              variant="interact"
              {...controlButtonStyles}
            />
          </PopoverTrigger>
          <PopoverContent
            w="min-content"
            bg={controlSurface}
            color={controlText}
            border="2px solid"
            borderColor={controlBorder}
            borderRadius="0"
            boxShadow="none"
          >
            <BlockPicker
              triangle="hide"
              color={color}
              onChangeComplete={handleChangeComplete}
              styles={{
                card: {
                  background: controlSurface,
                  boxShadow: 'none',
                  borderRadius: '0',
                },
                head: { borderRadius: '0' },
                body: { background: controlSurface },
                input: {
                  color: controlText,
                  background: controlActiveSurface,
                  boxShadow: 'none',
                  border: `2px solid ${controlBorder}`,
                  borderRadius: '0',
                },
              }}
            />
          </PopoverContent>
        </Popover>
        <IconButton
          aria-label="Use eraser tool"
          size="lg"
          isRound
          variant="interact"
          {...controlButtonStyles}
          borderColor={tool === 'eraser' ? controlBorder : 'transparent'}
          icon={<FaEraser />}
          onClick={() => setTool('eraser')}
        />
      </Stack>
    </Box>
  );
}
