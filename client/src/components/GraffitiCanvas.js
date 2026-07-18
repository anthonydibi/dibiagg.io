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
const GraffitiDrawArea = dynamic(() => import('./GraffitiDrawArea'), {
  ssr: false,
  loading: () => (
    <Flex
      width="100%"
      height="100%"
      align="center"
      justify="center"
      bg="var(--light)"
    >
      <Spinner color="var(--dark)" />
    </Flex>
  ),
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
  const mobileControlShadow = useColorModeValue(
    '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
    '5px 5px 7px #1b1b1b, -5px -5px 7px #252525',
  );
  const desktopControlShadow = '5px 5px 7px #cccccc, -5px -5px 7px #ffffff';
  const canvasFrameRef = React.useRef(null);
  const [canvasDimension, setCanvasDimension] = React.useState(0);
  const [controlsVisible, setControlsVisible] = React.useState(true);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const controlsAreShown = controlsVisible && !isDrawing;

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
        right="8px"
        top="8px"
        zIndex="20"
        size="sm"
        isRound
        variant="interact"
        bg="var(--light)"
        color="var(--dark)"
        boxShadow={desktopControlShadow}
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
        bg="var(--off)"
        borderBottom="0.5px solid var(--accent)"
        opacity={isDrawing ? 0 : 1}
        pointerEvents={isDrawing ? 'none' : 'auto'}
        transition="opacity 120ms ease"
      >
        <HStack position="relative" alignSelf="center">
          <IconButton
            aria-label="Go to previous day"
            size="sm"
            isRound
            variant="interact"
            boxShadow={mobileControlShadow}
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
            boxShadow={mobileControlShadow}
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
              boxShadow={mobileControlShadow}
              icon={<AiFillFastForward />}
              onClick={fastForward}
            />
          )}
        </HStack>
      </Stack>

      <Flex
        display={{ base: 'none', lg: 'flex' }}
        position="absolute"
        top="10px"
        left="10px"
        right="10px"
        zIndex="10"
        justify="center"
        align="center"
        transform={
          controlsAreShown ? 'translateY(0)' : 'translateY(calc(-100% - 12px))'
        }
        transition="transform 220ms ease, opacity 180ms ease"
        opacity={controlsAreShown ? 1 : 0}
        pointerEvents="none"
      >
        <HStack
          position="relative"
          p="tight"
          borderRadius="full"
          _before={{
            content: '""',
            position: 'absolute',
            inset: 0,
            right: step > 0 ? '-40px' : 0,
            zIndex: -1,
            borderRadius: '9999px',
            bg: 'var(--light)',
            boxShadow: desktopControlShadow,
          }}
          color="var(--dark)"
          pointerEvents="auto"
        >
          <IconButton
            aria-label="Go to previous day"
            size="sm"
            isRound
            variant="interact"
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
            bg="var(--light)"
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
        bg="var(--off)"
        borderTop="0.5px solid var(--accent)"
        opacity={isDrawing ? 0 : 1}
        pointerEvents={isDrawing ? 'none' : 'auto'}
        transition="opacity 120ms ease"
      >
        <HStack justify="flex-start" spacing="control">
          <IconButton
            aria-label="Use pen tool"
            size="md"
            isRound
            variant="interact"
            boxShadow={mobileControlShadow}
            border={tool === 'pen' ? '1px solid' : '1px solid transparent'}
            icon={<FaPen />}
            onClick={() => setTool('pen')}
          />
          <IconButton
            aria-label="Use eraser tool"
            size="md"
            isRound
            variant="interact"
            boxShadow={mobileControlShadow}
            border={tool === 'eraser' ? '1px solid' : '1px solid transparent'}
            icon={<FaEraser />}
            onClick={() => setTool('eraser')}
          />
        </HStack>
        <SliderPicker color={color} onChangeComplete={handleChangeComplete} />
      </Stack>

      <Stack
        display={{ base: 'none', lg: step === 0 ? 'flex' : 'none' }}
        position="absolute"
        right="10px"
        top="50%"
        transform={
          controlsAreShown
            ? 'translate(0, -50%)'
            : 'translate(calc(100% + 12px), -50%)'
        }
        transition="transform 220ms ease, opacity 180ms ease"
        opacity={controlsAreShown ? 1 : 0}
        pointerEvents={controlsAreShown ? 'auto' : 'none'}
        zIndex="10"
        spacing="control"
        p="control"
        borderRadius="32px"
        bg="var(--light)"
        color="var(--dark)"
        boxShadow={desktopControlShadow}
      >
        <IconButton
          aria-label="Use pen tool"
          size="lg"
          isRound
          variant="interact"
          border={tool === 'pen' ? '1px solid' : '1px solid transparent'}
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
            />
          </PopoverTrigger>
          <PopoverContent w="min-content" bg="var(--light)" color="var(--dark)">
            <BlockPicker
              triangle="hide"
              color={color}
              onChangeComplete={handleChangeComplete}
            />
          </PopoverContent>
        </Popover>
        <IconButton
          aria-label="Use eraser tool"
          size="lg"
          isRound
          variant="interact"
          border={tool === 'eraser' ? '1px solid' : '1px solid transparent'}
          icon={<FaEraser />}
          onClick={() => setTool('eraser')}
        />
      </Stack>
    </Box>
  );
}
