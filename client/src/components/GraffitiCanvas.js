import { Stage, Layer, Line } from 'react-konva'
import React from 'react'
import { Flex, IconButton, Box, Center, Heading, Grid, GridItem, useBreakpointValue, Stack, Skeleton, useColorModeValue } from '@chakra-ui/react'
import { FaEraser, FaPen } from 'react-icons/fa'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { SliderPicker, SwatchesPicker } from 'react-color'
import "./SwatchesStyle.css"
import { fetchCanvasState, fetchMaxStep, postCanvasLine } from '../services/GraffitiApi'
import useGraffitiSocket from '../hooks/useGraffitiSocket'

export default function GraffitiCanvas() { //built off of free-draw template from react-konva docs
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const modeValue=useColorModeValue("white", "black");
    const [maxStep, setMaxStep] = React.useState(0);
    const [step, setStep] = React.useState(0);
    const [tool, setTool] = React.useState('pen');
    const [numSessionLines, setNumSessionLines] = React.useState(0);
    const [lines, setLines] = React.useState({"self": []});
    const [color, setColor] = React.useState("#000000")
    const isDrawing = React.useRef(false);
    const [day, setDay] = React.useState(today.toISOString().split('T')[0]);
    const stageScale = useBreakpointValue({ base: window.innerWidth/1000, md: 1 })
    const [isLoaded, setIsLoaded] = React.useState(false);
    const socket = useGraffitiSocket(setLines);

    const handleChangeComplete = (color) => {
        setColor(color);
    };

    const getCanvasState = (step) => {
        fetchCanvasState(step)
            .then(data => {
                setLines({...lines, "self": data.lines});
                setDay(data.day.split(' ')[0]);
                setIsLoaded(true);
            })
    }

    const getMaxStep = () => {
        fetchMaxStep()
            .then(data => {
                let count = parseInt(data.count);
                count === 0 ? setMaxStep(0) : setMaxStep(count - 1);
            })
    }

    const updateCanvasState = () => { //in the backend, the canvas state is updated line by line
        let line = lines["self"][lines["self"].length - 1];
        postCanvasLine(line)
    }

    const handleMouseDown = (e) => {
        if(step === 0){
            isDrawing.current = true;
            const pos = e.target.getStage().getPointerPosition();
            setLines({...lines, "self": [...lines["self"], { tool, color: color.hex ?? color, points: [pos.x/stageScale, pos.y/stageScale]} ] });
            socket.emit('lineStarted', { peer: socket.id, line: {tool, color: color.hex ?? color, points: [pos.x/stageScale, pos.y/stageScale] }}); //send start of new line to peers
        }
    };

    const handleMouseMove = (e) => {
        e.evt.preventDefault();
        // not drawing or not on current day - skipping
        if (!isDrawing.current || step !== 0) {
            return;
        }
        const point = e.target.getStage().getPointerPosition();
        let lastLine = lines["self"][lines["self"].length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x/stageScale, point.y/stageScale]);

        // replace last
        lines["self"].splice(lines["self"].length - 1, 1, lastLine);
        setLines({...lines});
        socket.emit('point', {peer: socket.id, point: {x: point.x/stageScale, y: point.y/stageScale}}) //send drawn point to peers
    };

    const handleMouseUp = () => {
        if(step === 0){
            isDrawing.current = false;
            setNumSessionLines(numSessionLines + 1);
            save();
        }
    };

    // const undo = () => {
    //     if(numSessionLines > 0){
    //         const newLines = lines.slice(0, lines.length - 1);
    //         setLines(newLines);
    //         setNumSessionLines(numSessionLines - 1);
    //         save();
    //     }
    // }

    const back = () => {
        if(step + 1 > maxStep){
            return;
        }
        setIsLoaded(false);
        getCanvasState(step + 1);
        setStep(step + 1);
    }

    const next = () => {
        if(step - 1 < 0){
            return;
        }
        setIsLoaded(false)
        getCanvasState(step - 1);
        setStep(step - 1);
    }

    const save = () => {
        if(step !== 0){
            return;
        }
        updateCanvasState()
            //.then(res => callback());
    }

    React.useEffect(()=>{
        getMaxStep();
        getCanvasState(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => { //my hacky way to set the color picker background to the correct color :( needs work
        document.querySelector(".swatches-picker div div").style.backgroundColor = modeValue; 
    });

  return (
    <Box className='GraffitiContainer' w="100%">
        <Center>
            <IconButton size="sm" isRound="true" m="2" value="previousDay" variant="interact" icon={<AiFillCaretLeft/>} onClick={ back }>
            </IconButton>
            <Heading my={"2"}>{day}</Heading>
            <IconButton size="sm" isRound="true" m="2" value="nextDay" variant="interact" icon={<AiFillCaretRight/>} onClick={ next }>
            </IconButton>
        </Center>
        <Flex direction={{base: "column", md: "row"}}>
            <Box display={{base: "none", md: "block"}} flex={"1"} align={"right"}>
                <SwatchesPicker color={color} height={1002 * stageScale}
                onChangeComplete={handleChangeComplete}
                />
            </Box>
            <Skeleton isLoaded={isLoaded} zIndex={"5"} border="1px solid" borderBottom={{base: "1px", md: "0px none"}}>
                <Stage
                    style={{backgroundColor: "white"}}
                    width={1000 * stageScale}
                    height={1000 * stageScale}
                    scaleX={stageScale}
                    scaleY={stageScale}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchMove={handleMouseMove}
                    onTouchEnd={handleMouseUp}
                >
                    <Layer>
                    {step === 0 ? Object.entries(lines).map(([, list]) => ( //if on latest wall, draw the lines for self AND peers, otherwise just draw lines for self since that's where the fetched wall state is placed
                        list.map((line, i) => {
                            return (
                            <Line
                            key={i}
                            points={line.points}
                            stroke={line.color}
                            strokeWidth={line.tool === 'eraser' ? 15 : 5}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                line.tool === 'eraser' ? 'destination-out' : 'source-over'
                            }
                        />);
                        })
                    )) : lines["self"].map((line, i) => {
                        return (
                            <Line
                            key={i}
                            points={line.points}
                            stroke={line.color}
                            strokeWidth={line.tool === 'eraser' ? 15 : 5}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                line.tool === 'eraser' ? 'destination-out' : 'source-over'
                            }
                        />);
                    })}
                    </Layer>
                </Stage>
            </Skeleton>
            <Box flex={"1"}>
                <Grid display={{base: "none", md: "block"}}>
                    <GridItem>
                        <IconButton size="lg" isRound="true" m="2" value="pen" variant="interact" icon={<FaPen/>} onClick={() => { setTool("pen") }}>
                        </IconButton>
                    </GridItem>
                    <GridItem>
                        <IconButton size="lg" isRound="true" m="2" value="eraser" variant="interact" icon={<FaEraser/>} onClick={() => { setTool("eraser") }}>
                        </IconButton>
                    </GridItem>
                </Grid>
                <Stack direction={"row"} display={{base: "block", md: "none"}} p={1} mb={3}>
                        <IconButton size="lg" my={2} isRound="true" value="pen" variant="interact" icon={<FaPen/>} onClick={() => { setTool("pen") }}>
                        </IconButton>
                        <IconButton size="lg" my={2} isRound="true" value="eraser" variant="interact" icon={<FaEraser/>} onClick={() => { setTool("eraser") }}>
                        </IconButton>
                        <Box w={"auto"}>
                        <SliderPicker color={color} onChangeComplete={handleChangeComplete}/>
                        </Box>
                </Stack>
            </Box>
        </Flex>
    </Box>
  );
}