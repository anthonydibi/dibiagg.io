import { Stage, Layer, Line } from 'react-konva'
import React from 'react'
import { Flex, IconButton, Box, Center, Heading, Grid, GridItem, useBreakpointValue, Stack } from '@chakra-ui/react'
import { FaEraser, FaPen } from 'react-icons/fa'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { SliderPicker, SwatchesPicker } from 'react-color'

export default function GraffitiCanvas() { //built off of free-draw template from react-konva docs
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const [maxStep, setMaxStep] = React.useState(0);
    const [step, setStep] = React.useState(0);
    const [tool, setTool] = React.useState('pen');
    const [numSessionLines, setNumSessionLines] = React.useState(0);
    const [lines, setLines] = React.useState([]);
    const [color, setColor] = React.useState("#000000")
    const isDrawing = React.useRef(false);
    const [day, setDay] = React.useState(today.toISOString().split('T')[0]);
    const stageScale = useBreakpointValue({ base: window.innerWidth/1000, md: 1 })

    const API_URL = 'https://dibiaggdotio.herokuapp.com';

    const handleChangeComplete = (color) => {
        setColor(color);
    };

    const fetchCanvasState = (stepIn) => {
        return fetch(API_URL + '/graffiti?' + new URLSearchParams({ step: stepIn }))
            .then(response => response.json())
            .then(data => {
                setLines(data.lines);
                setDay(data.day.split(' ')[0]);
            })
    }

    const fetchMaxStep = () => {
        return fetch(API_URL + '/graffiti/maxstep')
            .then(response => response.json())
            .then(data => {
                let count = parseInt(data.count);
                count === 0 ? setMaxStep(0) : setMaxStep(count - 1);
            });
    }

    const postCanvasState = (callback) => {
        let data = {line: lines[lines.length - 1]};
        if(data.line === null) return;
        return fetch(API_URL + '/graffiti', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    const handleMouseDown = (e) => {
        if(step === 0){
            isDrawing.current = true;
            const pos = e.target.getStage().getPointerPosition();
            setLines([...lines, { tool, color: color.hex, points: [pos.x/stageScale, pos.y/stageScale] }]);
        }
    };

    const handleMouseMove = (e) => {
        e.evt.preventDefault();
        // not drawing or not on current day - skipping
        if (!isDrawing.current || step !== 0) {
            return;
        }
        const point = e.target.getStage().getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x/stageScale, point.y/stageScale]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        if(step === 0){
            isDrawing.current = false;
            setNumSessionLines(numSessionLines + 1);
            save(() => fetchCanvasState(step));
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
        fetchCanvasState(step + 1);
        setStep(step + 1);
    }

    const forward = () => {
        if(step - 1 < 0){
            return;
        }
        fetchCanvasState(step - 1);
        setStep(step - 1);
    }

    const save = (callback) => {
        if(step !== 0){
            return;
        }
        postCanvasState()
            .then(result => callback());
    }

    React.useEffect(()=>{
        fetchMaxStep();
        fetchCanvasState(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <Box w="100%">
        <Center>
            <IconButton isRound="true" m="2" value="previousDay" variant="solid" icon={<AiFillCaretLeft/>} onClick={ back }>
            </IconButton>
            <Heading my={"6"}>{day}</Heading>
            <IconButton isRound="true" m="2" value="nextDay" variant="solid" icon={<AiFillCaretRight/>} onClick={ forward }>
            </IconButton>
        </Center>
        <Flex direction={{base: "column", md: "row"}}>
            <Box display={{base: "none", md: "block"}} flex={"1"} align={"right"}>
                <SwatchesPicker color={color} height={1000 * stageScale}
                onChangeComplete={handleChangeComplete}
                />
            </Box>
            <Box zIndex={"5"} mb={{base: 0, md: 6}} boxShadow="dark-lg" border="3px" borderColor="teal" borderRadius="md">
                <Stage
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
                    {lines.map((line, i) => (
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
                        />
                    ))}
                    </Layer>
                </Stage>
            </Box>
            <Box flex={"1"}>
                <Grid display={{base: "none", md: "block"}}>
                    <GridItem>
                        <IconButton size="lg" isRound="true" m="2" value="pen" variant="solid" icon={<FaPen/>} onClick={() => { setTool("pen") }}>
                        </IconButton>
                    </GridItem>
                    <GridItem>
                        <IconButton size="lg" isRound="true" m="2" value="eraser" variant="solid" icon={<FaEraser/>} onClick={() => { setTool("eraser") }}>
                        </IconButton>
                    </GridItem>
                </Grid>
                <Stack direction={"row"} display={{base: "block", md: "none"}}>
                        <IconButton size="lg" my={2} isRound="true" value="pen" variant="solid" icon={<FaPen/>} onClick={() => { setTool("pen") }}>
                        </IconButton>
                        <IconButton size="lg" my={2} isRound="true" value="eraser" variant="solid" icon={<FaEraser/>} onClick={() => { setTool("eraser") }}>
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