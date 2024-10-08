import dynamic from 'next/dynamic';
import React, { useCallback } from 'react';
import {
  Flex,
  IconButton,
  Box,
  Heading,
  Grid,
  GridItem,
  useBreakpoint,
  Stack,
  Skeleton,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  useColorModeValue,
  useDisclosure,
  HStack,
  useBreakpointValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@chakra-ui/react';
import { FaEraser, FaPen } from 'react-icons/fa';
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastForward,
  AiOutlineQuestion,
} from 'react-icons/ai';
import { SliderPicker, BlockPicker } from 'react-color';
import { fetchCanvasState, postCanvasLine } from '../services/GraffitiApi';
import TaggingModal from './TaggingModal.js';
import useWindowDimensions from '../hooks/useWindowDimensions';
const GraffitiDrawArea = dynamic(() => import('./GraffitiDrawArea'), {
  ssr: false,
  loading: () => <Skeleton height="100%" width="100%" />,
});

export default function GraffitiCanvas() {
  //built off of free-draw template from react-konva docs
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const modeValue = useColorModeValue('var(--light)', 'var(--dark)');
  const [step, setStep] = React.useState(0);
  const [tool, setTool] = React.useState('pen');
  const [lines, setLines] = React.useState({ self: [] });
  const [color, setColor] = React.useState('#000000');
  const [userTag, setUserTag] = React.useState('');
  const [day, setDay] = React.useState(today.toISOString().split('T')[0]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorMode = useColorModeValue('light', 'dark');
  const { width, height } = useWindowDimensions();
  const canvasDimension = useBreakpointValue({
    base: Math.min(width, height) - 16,
    md: Math.min(Math.min(width - 300, 900), height - 100),
  });

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

  const handleTagChange = (e) => {
    const newTag = e.target.value;
    setUserTag(newTag);
    localStorage.setItem('graffitiTag', newTag);
  };

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
    let savedUserTag = localStorage.getItem('graffitiTag');
    if (savedUserTag) {
      setUserTag(savedUserTag);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setIsLoaded(false);
    getCanvasState(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  React.useLayoutEffect(() => {
    const blockPicker = document.querySelector('.block-picker');
    if (blockPicker) {
      blockPicker.style.backgroundColor = modeValue;
    }
  }, [modeValue]);

  return (
    <Box className="GraffitiContainer" w="100%">
      <TaggingModal isOpen={isOpen} onClose={onClose} />
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        w={'100%'}
        align={{ base: 'center', lg: 'none' }}
      >
        <InputGroup
          size="md"
          w="95%"
          display={{ base: 'block', lg: 'none' }}
          mt="2"
        >
          <Input
            pr="4.5rem"
            type={'text'}
            placeholder="Enter tag"
            maxLength={'20'}
            value={userTag}
            onChange={handleTagChange}
          />
          <InputRightElement width="4.5rem" mr="-3">
            <IconButton
              size="sm"
              isRound="true"
              value="taggingHelp"
              variant="interact"
              icon={<AiOutlineQuestion />}
              onClick={onOpen}
            ></IconButton>
          </InputRightElement>
        </InputGroup>
        <Flex w={'100%'}>
          <Stack
            flex={'1'}
            justify={'right'}
            align={'center'}
            direction={'row'}
          >
            <InputGroup
              size="md"
              maxWidth={[`${canvasDimension}px`, null, '200px']}
              display={{ base: 'none', lg: 'block' }}
            >
              <Input
                pr="4.5rem"
                type={'text'}
                placeholder="Enter tag"
                maxLength={'20'}
                value={userTag}
                onChange={handleTagChange}
              />
              <InputRightElement width="4.5rem" mr="-3">
                <IconButton
                  size="sm"
                  isRound="true"
                  value="taggingHelp"
                  variant="interact"
                  icon={<AiOutlineQuestion />}
                  onClick={onOpen}
                ></IconButton>
              </InputRightElement>
            </InputGroup>
          </Stack>
          <HStack m={'1'} px={'2'} py={'1'} borderRadius={'20px'}>
            <IconButton
              aria-label="Go to previous day"
              size="sm"
              isRound="true"
              value="previousDay"
              variant="interact"
              icon={<AiFillCaretLeft />}
              onClick={back}
              boxShadow={useColorModeValue(
                '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                '5px 5px 7px #1b1b1b, -5px -5px 7px #252525',
              )}
            ></IconButton>
            <Heading mx={'1'} minW="10ch" textAlign="center">
              {day}
            </Heading>
            <Box>
              <IconButton
                aria-label="Go to next day"
                size="sm"
                isRound="true"
                value="nextDay"
                variant="interact"
                icon={<AiFillCaretRight />}
                onClick={next}
                boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525',
                )}
              ></IconButton>
            </Box>
          </HStack>
          <Stack
            flex={'1'}
            justify={'left'}
            align={'center'}
            direction={'row'}
            pl={1}
          >
            {step > 0 ? (
              <IconButton
                aria-label="Fast forward to current day"
                position={'relative'}
                left={'0'}
                ml={'-3'}
                size="sm"
                isRound="true"
                value="fastForward"
                variant="interact"
                icon={<AiFillFastForward />}
                onClick={fastForward}
                boxShadow={
                  colorMode === 'light'
                    ? '5px 5px 7px #cccccc, -5px -5px 7px #ffffff'
                    : '5px 5px 7px #1b1b1b, -5px -5px 7px #252525'
                }
              ></IconButton>
            ) : null}
          </Stack>
        </Flex>
      </Stack>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="center"
        alignItems="center"
      >
        <Box width={`${canvasDimension}px`} height={`${canvasDimension}px`}>
          <GraffitiDrawArea
            lines={lines}
            setLines={setLines}
            tool={tool}
            isLoaded={isLoaded}
            color={color}
            userTag={userTag}
            step={step}
            save={save}
            canvasDimension={canvasDimension}
          />
        </Box>
        <Box>
          <Grid display={{ base: 'none', lg: step === 0 ? 'block' : 'none' }}>
            <GridItem>
              <IconButton
                aria-label="Use pen tool"
                size="lg"
                isRound="true"
                m="2"
                value="pen"
                variant="interact"
                border={tool === 'pen' ? '1px solid' : '1px solid transparent'}
                icon={<FaPen />}
                onClick={() => {
                  setTool('pen');
                }}
                boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525',
                )}
              ></IconButton>
            </GridItem>
            <GridItem>
              <IconButton
                aria-label="Use eraser tool"
                size="lg"
                isRound="true"
                m="2"
                value="eraser"
                variant="interact"
                border={
                  tool === 'eraser' ? '1px solid' : '1px solid transparent'
                }
                boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525',
                )}
                icon={<FaEraser />}
                onClick={() => {
                  setTool('eraser');
                }}
              ></IconButton>
            </GridItem>
            <GridItem>
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
                    isRound="true"
                    m="2"
                    variant="interact"
                    onClick={fastForward}
                    boxShadow={
                      colorMode === 'light'
                        ? '5px 5px 7px #cccccc, -5px -5px 7px #ffffff'
                        : '5px 5px 7px #1b1b1b, -5px -5px 7px #252525'
                    }
                  />
                </PopoverTrigger>
                <PopoverContent w="min-content">
                  <BlockPicker
                    triangle={'hide'}
                    color={color}
                    onChangeComplete={handleChangeComplete}
                  />
                </PopoverContent>
              </Popover>
            </GridItem>
          </Grid>
          <Stack
            direction={'column'}
            display={{ base: step === 0 ? 'flex' : 'none', lg: 'none' }}
            p={1}
            mb={3}
            spacing={1}
            width={`${canvasDimension}px`}
          >
            <HStack display="flex" spacing="2">
              <IconButton
                size="lg"
                isRound="true"
                value="pen"
                variant="interact"
                border={tool === 'pen' ? '1px solid' : '1px solid transparent'}
                boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525',
                )}
                icon={<FaPen />}
                onClick={() => {
                  setTool('pen');
                }}
              ></IconButton>
              <IconButton
                size="lg"
                my={2}
                isRound="true"
                value="eraser"
                variant="interact"
                border={
                  tool === 'eraser' ? '1px solid' : '1px solid transparent'
                }
                boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525',
                )}
                icon={<FaEraser />}
                onClick={() => {
                  setTool('eraser');
                }}
              />
            </HStack>
            <Box w={'100%'} margin={'0 !important'}>
              <Box
                w={'100%'}
                h={'100%'}
                boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525',
                )}
                p={'4'}
                borderRadius={'20px'}
              >
                <SliderPicker
                  color={color}
                  onChangeComplete={handleChangeComplete}
                />
              </Box>
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
