import { Stage, Layer, Line } from "react-konva";
import React, { useCallback } from "react";
import {
  Flex,
  IconButton,
  Box,
  Heading,
  Grid,
  GridItem,
  useBreakpointValue,
  Stack,
  Skeleton,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEraser, FaPen } from "react-icons/fa";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillFastForward,
  AiOutlineQuestion,
} from "react-icons/ai";
import { SliderPicker, SwatchesPicker } from "react-color";
import { fetchCanvasState, postCanvasLine } from "../services/GraffitiApi";
import useGraffitiSocket from "../hooks/useGraffitiSocket";
import TaggingModal from "./TaggingModal.js";

export default function GraffitiCanvas() {
  //built off of free-draw template from react-konva docs
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  const modeValue = useColorModeValue("white", "black");
  const [step, setStep] = React.useState(0);
  const [tool, setTool] = React.useState("pen");
  const [numSessionLines, setNumSessionLines] = React.useState(0);
  const [lines, setLines] = React.useState({ self: [] });
  const [color, setColor] = React.useState("#000000");
  const [hoveredTag, setHoveredTag] = React.useState("");
  const [userTag, setUserTag] = React.useState("");
  const isDrawing = React.useRef(false);
  const [day, setDay] = React.useState(today.toISOString().split("T")[0]);
  const stageScale = useBreakpointValue({
    base: window.innerWidth / 1000.0,
    md: 1,
  });
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socket = useGraffitiSocket(setLines);

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
          setDay(data.day.split(" ")[0]);
          setIsLoaded(true);
        }
      });
    },
    [lines]
  );

  const updateCanvasState = useCallback(() => {
    //in the backend, the canvas state is updated line by line
    let line = lines["self"][lines["self"].length - 1];
    if (line != null) {
      postCanvasLine(line);
    }
  }, [lines]);

  const handleMouseDown = (e) => {
    if (step === 0) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      const newLine = {
        tool,
        color: color.hex ?? color,
        points: [pos.x / stageScale, pos.y / stageScale],
        who: userTag,
      };
      setLines({ ...lines, self: [...lines["self"], newLine] });
      socket.emit("lineStarted", { peer: socket.id, line: newLine }); //send start of new line to peers
    }
  };

  const handleMouseMove = (e) => {
    e.evt.preventDefault(); //prevent scrolling when drawing on mobile
    // not drawing or not on current day - skipping
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const intersection = stage.getIntersection(point);
    if (
      intersection &&
      intersection.attrs.globalCompositeOperation !== "destination-out"
    ) {
      if (
        intersection.attrs.hasOwnProperty("who") &&
        intersection.attrs.who !== ""
      ) {
        setHoveredTag(intersection.attrs.who);
      } else {
        setHoveredTag("anonymous");
      }
    } else {
      setHoveredTag("");
    }
    if (!isDrawing.current || step !== 0) {
      return;
    }
    let lastLine = lines["self"][lines["self"].length - 1];
    // add point
    lastLine.points = lastLine.points.concat([
      point.x / stageScale,
      point.y / stageScale,
    ]);

    // replace last
    lines["self"].splice(lines["self"].length - 1, 1, lastLine);
    setLines({ ...lines });
    socket.emit("point", {
      peer: socket.id,
      point: { x: point.x / stageScale, y: point.y / stageScale },
    }); //send drawn point to peers
  };

  const handleMouseUp = () => {
    if (step === 0) {
      isDrawing.current = false;
      setNumSessionLines(numSessionLines + 1);
      save();
    }
  };

  const handleTagChange = (e) => {
    const newTag = e.target.value;
    setUserTag(newTag);
    localStorage.setItem("graffitiTag", newTag);
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
    //.then(res => callback());
  };

  React.useEffect(() => {
    getCanvasState(0);
    let savedUserTag = localStorage.getItem("graffitiTag");
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

  React.useEffect(() => {
    //my hacky way to set the color picker background to the correct color :( needs work
    document.querySelector(".swatches-picker div div").style.backgroundColor =
      modeValue;
  });
  return (
    <Box className="GraffitiContainer" w="100%">
      <TaggingModal isOpen={isOpen} onClose={onClose} />
      <Stack
        direction={{ base: "column", md: "row" }}
        w={"100%"}
        align={{ base: "center", md: "none" }}
      >
        <InputGroup
          size="md"
          w="95%"
          display={{ base: "block", md: "none" }}
          mt="2"
        >
          <Input
            pr="4.5rem"
            type={"text"}
            placeholder="Enter tag"
            maxLength={"20"}
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
        <Flex alignItems={"center"} w={"100%"}>
          <Stack
            flex={"1"}
            justify={"right"}
            align={"center"}
            direction={"row"}
          >
            <InputGroup
              size="md"
              w="400px"
              m="auto"
              display={{ base: "none", md: "block" }}
            >
              <Input
                pr="4.5rem"
                type={"text"}
                placeholder="Enter tag"
                maxLength={"20"}
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
            <IconButton
              size="sm"
              isRound="true"
              value="previousDay"
              variant="interact"
              icon={<AiFillCaretLeft />}
              onClick={back}
            ></IconButton>
          </Stack>
          <Heading my={"2"} mx={"2"}>
            {day}
          </Heading>
          <Box flex={"1"}>
            <IconButton
              size="sm"
              isRound="true"
              value="nextDay"
              variant="interact"
              icon={<AiFillCaretRight />}
              onClick={next}
            ></IconButton>
            {step > 0 ? (
              <IconButton
                position={"relative"}
                left={"0"}
                size="sm"
                isRound="true"
                value="fastForward"
                variant="interact"
                icon={<AiFillFastForward />}
                onClick={fastForward}
              ></IconButton>
            ) : null}
          </Box>
        </Flex>
      </Stack>
      <Flex direction={{ base: "column", md: "row" }}>
        <Box display={{ base: "none", md: "block" }} flex={"1"} align={"right"}>
          <SwatchesPicker
            color={color}
            height={1002 * stageScale}
            onChangeComplete={handleChangeComplete}
          />
        </Box>
        <Skeleton
          position={"relative"}
          isLoaded={isLoaded}
          zIndex={"5"}
          border="1px solid"
          borderBottom={{ base: "1px", md: "0px none" }}
        >
          <Text
            color={"black"}
            fontSize={"lg"}
            position={"absolute"}
            m={"2"}
            top={"0"}
            left={"0"}
          >
            {hoveredTag}
          </Text>
          <Stage
            style={{ backgroundColor: "white" }}
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
              {step === 0
                ? Object.entries(lines).map(
                    (
                      [, list] //if on latest wall, draw the lines for self AND peers, otherwise just draw lines for self since that's where the fetched wall state is placed
                    ) =>
                      list.map((line, i) => {
                        if (line == null) {
                          return null;
                        }
                        return (
                          <Line
                            key={i}
                            points={line.points}
                            stroke={line.color}
                            strokeWidth={line.tool === "eraser" ? 15 : 5}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                              line.tool === "eraser"
                                ? "destination-out"
                                : "source-over"
                            }
                            who={line.who}
                          />
                        );
                      })
                  )
                : lines["self"].map((line, i) => {
                    if (line == null) {
                      return null;
                    }
                    return (
                      <Line
                        key={i}
                        points={line.points}
                        stroke={line.color}
                        strokeWidth={line.tool === "eraser" ? 15 : 5}
                        tension={0.5}
                        lineCap="round"
                        globalCompositeOperation={
                          line.tool === "eraser"
                            ? "destination-out"
                            : "source-over"
                        }
                        who={line.who}
                      />
                    );
                  })}
            </Layer>
          </Stage>
        </Skeleton>
        <Box flex={"1"}>
          <Grid display={{ base: "none", md: "block" }}>
            <GridItem>
              <IconButton
                size="lg"
                isRound="true"
                m="2"
                value="pen"
                variant="interact"
                border={tool === "pen" ? "1px solid" : "1px solid transparent"}
                icon={<FaPen />}
                onClick={() => {
                  setTool("pen");
                }}
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
                  tool === "eraser" ? "1px solid" : "1px solid transparent"
                }
                icon={<FaEraser />}
                onClick={() => {
                  setTool("eraser");
                }}
              ></IconButton>
            </GridItem>
          </Grid>
          <Stack
            direction={"row"}
            display={{ base: "block", md: "none" }}
            p={1}
            mb={3}
          >
            <IconButton
              size="lg"
              my={2}
              isRound="true"
              value="pen"
              variant="interact"
              border={tool === "pen" ? "1px solid" : "1px solid transparent"}
              icon={<FaPen />}
              onClick={() => {
                setTool("pen");
              }}
            ></IconButton>
            <IconButton
              size="lg"
              my={2}
              isRound="true"
              value="eraser"
              variant="interact"
              border={tool === "eraser" ? "1px solid" : "1px solid transparent"}
              icon={<FaEraser />}
              onClick={() => {
                setTool("eraser");
              }}
            ></IconButton>
            <Box w={"auto"}>
              <SliderPicker
                color={color}
                onChangeComplete={handleChangeComplete}
              />
            </Box>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}
