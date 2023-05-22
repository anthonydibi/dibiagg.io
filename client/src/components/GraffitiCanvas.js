import dynamic from 'next/dynamic'
import React, { useCallback } from 'react'
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
} from '@chakra-ui/react'
import { FaEraser, FaPen } from 'react-icons/fa'
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastForward,
  AiOutlineQuestion,
} from 'react-icons/ai'
import { SliderPicker, SwatchesPicker } from 'react-color'
import { fetchCanvasState, postCanvasLine } from '../services/GraffitiApi'
import TaggingModal from './TaggingModal.js'
import useWindowDimensions from '../hooks/useWindowDimensions'
const GraffitiDrawArea = dynamic(() => import('./GraffitiDrawArea'), {
  //ssr has to be disabled for konva-react
  ssr: false,
})

export default function GraffitiCanvas() {
  //built off of free-draw template from react-konva docs
  let today = new Date()
  today.setHours(0, 0, 0, 0)
  const modeValue = useColorModeValue('var(--light)', 'var(--dark)')
  const [step, setStep] = React.useState(0)
  const [tool, setTool] = React.useState('pen')
  const [lines, setLines] = React.useState({ self: [] })
  const [color, setColor] = React.useState('#000000')
  const [userTag, setUserTag] = React.useState('')
  const [day, setDay] = React.useState(today.toISOString().split('T')[0])
  const [isLoaded, setIsLoaded] = React.useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  let [stageScale, setStageScale] = React.useState(1)
  const { width, height } = useWindowDimensions()

  React.useEffect(() => {
    if (width <= 1000) {
      setStageScale(width / 1000.0)
    }
  }, [width, height])

  const handleChangeComplete = (color) => {
    setColor(color)
  }

  const getCanvasState = useCallback(
    (step) => {
      fetchCanvasState(step).then(async (response) => {
        if (response.status !== 200) {
          //if we didn't find a wall, then go back to the previous step
          setStep(step - 1)
        } else {
          let data = await response.json()
          setLines({ ...lines, self: data.lines })
          setDay(data.day.split(' ')[0])
          setIsLoaded(true)
        }
      })
    },
    [lines],
  )

  const updateCanvasState = useCallback(() => {
    //in the backend, the canvas state is updated line by line
    let line = lines['self'][lines['self'].length - 1]
    if (line != null) {
      postCanvasLine(line)
    }
  }, [lines])

  const handleTagChange = (e) => {
    const newTag = e.target.value
    setUserTag(newTag)
    localStorage.setItem('graffitiTag', newTag)
  }

  // const undo = () => {
  //     if(numSessionLines > 0){
  //         const newLines = lines.slice(0, lines.length - 1);
  //         setLines(newLines);
  //         setNumSessionLines(numSessionLines - 1);
  //         save();
  //     }
  // }

  const back = () => {
    setStep(step + 1)
  }

  const next = () => {
    if (step - 1 < 0) {
      return
    }
    setStep(step - 1)
  }

  const fastForward = () => {
    setStep(0)
  }

  const save = () => {
    if (step !== 0) {
      return
    }
    updateCanvasState()
    //.then(res => callback());
  }

  React.useEffect(() => {
    getCanvasState(0)
    let savedUserTag = localStorage.getItem('graffitiTag')
    if (savedUserTag) {
      setUserTag(savedUserTag)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    setIsLoaded(false)
    getCanvasState(step)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  React.useEffect(() => {
    //my hacky way to set the color picker background to the correct color :( needs work
    document.querySelector('.swatches-picker div div').style.backgroundColor =
      modeValue
  })
  return (
    <Box className="GraffitiContainer" w="100%">
      <TaggingModal isOpen={isOpen} onClose={onClose} />
      <Stack
        direction={{ base: 'column', md: 'row' }}
        w={'100%'}
        align={{ base: 'center', md: 'none' }}
      >
        <InputGroup
          size="md"
          w="95%"
          display={{ base: 'block', md: 'none' }}
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
              w="300px"
              display={{ base: 'none', md: 'block' }}
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
          <Box m={"2"} borderRadius={"20px"} >
          <HStack m={"1"} px={"2"} py={"1"} borderRadius={"20px"}
      >
          <IconButton
              size="sm"
              isRound="true"
              value="previousDay"
              variant="interact"
              icon={<AiFillCaretLeft />}
              onClick={back}
              boxShadow={useColorModeValue(
                '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                '5px 5px 7px #1b1b1b, -5px -5px 7px #252525')}
            ></IconButton>
          <Heading my={'2'} mx={'2'}>
            {day}
          </Heading>
          <Box>
            <IconButton
              size="sm"
              isRound="true"
              value="nextDay"
              variant="interact"
              icon={<AiFillCaretRight />}
              onClick={next}
              boxShadow={useColorModeValue(
                '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                '5px 5px 7px #1b1b1b, -5px -5px 7px #252525')}
            ></IconButton>
          </Box>
          </HStack>
          </Box>
          <Stack flex={"1"} justify={'left'}
            align={'center'}
            direction={'row'}>
          {step > 0 ? (
              <IconButton
                position={'relative'}
                left={'0'}
                ml={"-3"}
                size="sm"
                isRound="true"
                value="fastForward"
                variant="interact"
                icon={<AiFillFastForward />}
                onClick={fastForward}
                boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525')}
              ></IconButton>
            ) : null}
          </Stack>
        </Flex>
      </Stack>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box
          visibility={{ base: 'hidden', md: step === 0 ? 'visible' : 'hidden' }}
          display={{ base: 'none', md: 'block' }}
          flex={'1'}
          align={'right'}
        >
          <SwatchesPicker
            color={color}
            height={1002 * stageScale}
            onChangeComplete={handleChangeComplete}
          />
        </Box>
        <Box width={stageScale * 1000} height={stageScale * 1000}>
          <GraffitiDrawArea
            lines={lines}
            setLines={setLines}
            tool={tool}
            isLoaded={isLoaded}
            color={color}
            userTag={userTag}
            stageScale={stageScale}
            step={step}
            save={save}
          />
        </Box>
        <Box flex={'1'}>
          <Grid display={{ base: 'none', md: step === 0 ? 'block' : 'none' }}>
            <GridItem>
              <IconButton
                size="lg"
                isRound="true"
                m="2"
                value="pen"
                variant="interact"
                border={tool === 'pen' ? '1px solid' : '1px solid transparent'}
                icon={<FaPen />}
                onClick={() => {
                  setTool('pen')
                }}
                boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525')}
              ></IconButton>
            </GridItem>
            <GridItem>
              <IconButton
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
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525')}
                icon={<FaEraser />}
                onClick={() => {
                  setTool('eraser')
                }}
              ></IconButton>
            </GridItem>
          </Grid>
          <Stack
            direction={'row'}
            display={{ base: step === 0 ? 'block' : 'none', md: 'none' }}
            p={1}
            mb={3}
          >
            <IconButton
              size="lg"
              my={2}
              isRound="true"
              value="pen"
              variant="interact"
              border={tool === 'pen' ? '1px solid' : '1px solid transparent'}
              boxShadow={useColorModeValue(
                '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                '5px 5px 7px #1b1b1b, -5px -5px 7px #252525')}
              icon={<FaPen />}
              onClick={() => {
                setTool('pen')
              }}
            ></IconButton>
            <IconButton
              size="lg"
              my={2}
              isRound="true"
              value="eraser"
              variant="interact"
              border={tool === 'eraser' ? '1px solid' : '1px solid transparent'}
              boxShadow={useColorModeValue(
                '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                '5px 5px 7px #1b1b1b, -5px -5px 7px #252525')}
              icon={<FaEraser />}
              onClick={() => {
                setTool('eraser')
              }}
            ></IconButton>
            <Box w={'100%'} margin={"0 !important"}>
                    <Box w={"100%"} h={"100%"} boxShadow={useColorModeValue(
                  '5px 5px 7px #cccccc, -5px -5px 7px #ffffff',
                  '5px 5px 7px #1b1b1b, -5px -5px 7px #252525')} p={"4"} borderRadius={"20px"}>
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
  )
}
