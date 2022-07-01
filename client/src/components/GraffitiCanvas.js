import { Stage, Layer, Line } from 'react-konva'
import React from 'react'
import { Flex, IconButton, Box, Center, Heading } from '@chakra-ui/react'
import { FaUndo } from 'react-icons/fa'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import { SwatchesPicker } from 'react-color'

export default function GraffitiCanvas() { //built off of free-draw template from react-konva docs
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    const [maxStep, setMaxStep] = React.useState(0);
    const [step, setStep] = React.useState(0);
    const tool = "pen";
    const [numSessionLines, setNumSessionLines] = React.useState(0);
    const [lines, setLines] = React.useState([]);
    const [color, setColor] = React.useState("#000000")
    const isDrawing = React.useRef(false);
    const [weekOf, setWeekOf] = React.useState(today.toISOString().split('T')[0]);

    const API_URL = 'https://dibiaggdotio.herokuapp.com';

    const handleChangeComplete = (color) => {
        setColor(color);
    };

    const fetchCanvasState = (step) => {
        console.log("Fetching canvas state");
        fetch(API_URL + '/graffiti?' + new URLSearchParams({ step: step }))
            .then(response => response.json())
            .then(data => {
                setLines(data.lines);
                setWeekOf(data.day.split(' ')[0]);
            })
    }

    const fetchMaxStep = () => {
        fetch(API_URL + '/graffiti/maxstep')
            .then(response => response.json())
            .then(data => {
                let count = parseInt(data.count);
                count === 0 ? setMaxStep(0) : setMaxStep(count - 1);
            });
    }

    const postCanvasState = (lines) => {
        let data = {lines: lines};
        fetch(API_URL + '/graffiti', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, color: color.hex, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
        setNumSessionLines(numSessionLines + 1);
        save();
    };

    const undo = () => {
        if(numSessionLines > 0){
            const newLines = lines.slice(0, lines.length - 1);
            setLines(newLines);
            setNumSessionLines(numSessionLines - 1);
            save();
        }
    }

    const back = () => {
        if(step + 1 > maxStep){
            return;
        }
        setStep(step + 1);
        fetchCanvasState(step);
    }

    const forward = () => {
        if(step - 1 < 0){
            return;
        }
        setStep(step - 1);
        fetchCanvasState(step);
    }

    const save = () => {
        if(step !== 0){
            return;
        }
        postCanvasState(lines);
    }

    React.useEffect(()=>{
        fetchMaxStep();
        fetchCanvasState(0);
    }, []);

  return (
    <Box w="100%">
        <Center>
            <IconButton isRound="true" m="2" value="previousWeek" variant="solid" icon={<AiFillCaretLeft/>} onClick={ back }>
            </IconButton>
            <Heading my={"6"}>Week of {weekOf}</Heading>
            <IconButton isRound="true" m="2" value="nextWeek" variant="solid" icon={<AiFillCaretRight/>} onClick={ forward }>
            </IconButton>
        </Center>
        <Flex>
        <Box flex={"1"} align={"right"} overflow={"hidden"}>
            <SwatchesPicker color={color} height={1000}
            onChangeComplete={handleChangeComplete}
            />
        </Box>
        <Box zIndex={"5"} mb={"6"} boxShadow="dark-lg" border="3px" borderColor="teal" borderRadius="md">
            <Stage
                width={1000}
                height={1000}
                onMouseDown={handleMouseDown}
                onMousemove={handleMouseMove}
                onMouseup={handleMouseUp}
            >
                <Layer>
                {lines.map((line, i) => (
                    <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={5}
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
            <IconButton isRound="true" m="2" value="undo" variant="solid" icon={<FaUndo/>} onClick={ undo }>
            </IconButton>
        </Box>
        </Flex>
    </Box>
  );
}