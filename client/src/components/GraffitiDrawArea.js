import { Stage, Layer, Line } from 'react-konva';
import useGraffitiSocket from '../hooks/useGraffitiSocket';
import React from 'react';
import { Box, Flex, Spinner } from '@chakra-ui/react';

const getToolCursor = (tool) => {
  const hotspot = tool === 'eraser' ? '8 22' : '4 24';
  const svg =
    tool === 'eraser'
      ? `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><g transform="rotate(180 14 14)"><path d="M4 19 17.5 5.5a3 3 0 0 1 4.2 0l1 1a3 3 0 0 1 0 4.2L9.4 24H4v-5Z" fill="#f0f0f0" stroke="#202020" stroke-width="2" stroke-linejoin="round"/><path d="m14.7 8.3 6 6" stroke="#FF5F1F" stroke-width="3"/></g></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28"><path d="M4 19 17.5 5.5a3 3 0 0 1 4.2 0l1 1a3 3 0 0 1 0 4.2L9.4 24H4v-5Z" fill="#f0f0f0" stroke="#202020" stroke-width="2" stroke-linejoin="round"/><path d="m14.7 8.3 6 6" stroke="#FF5F1F" stroke-width="3"/></svg>`;

  return `url("data:image/svg+xml,${encodeURIComponent(
    svg,
  )}") ${hotspot}, crosshair`;
};

export default function GraffitiDrawArea(props) {
  const lines = props.lines;
  const setLines = props.setLines;
  const tool = props.tool;
  const isLoaded = props.isLoaded;
  const color = props.color;
  const step = props.step;
  const save = props.save;
  const onDrawingChange = props.onDrawingChange;
  const canvasDimension = props.canvasDimension;
  const [numSessionLines, setNumSessionLines] = React.useState(0);
  const isDrawing = React.useRef(false);
  const socket = useGraffitiSocket(setLines);
  const toolCursor = React.useMemo(() => getToolCursor(tool), [tool]);

  const handleMouseDown = (e) => {
    if (step === 0) {
      isDrawing.current = true;
      onDrawingChange?.(true);
      const pos = e.target.getStage().getPointerPosition();
      const newLine = {
        tool,
        color: color.hex ?? color,
        points: [
          pos.x / (canvasDimension / 1000),
          pos.y / (canvasDimension / 1000),
        ],
      };
      setLines({ ...lines, self: [...lines['self'], newLine] });
      socket.emit('lineStarted', { peer: socket.id, line: newLine }); //send start of new line to peers
    }
  };

  const handleMouseMove = (e) => {
    e.evt.preventDefault(); //prevent scrolling when drawing on mobile

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (!isDrawing.current || step !== 0) {
      return;
    }
    let lastLine = lines['self'][lines['self'].length - 1];
    // add point
    lastLine.points = lastLine.points.concat([
      point.x / (canvasDimension / 1000),
      point.y / (canvasDimension / 1000),
    ]);

    // replace last
    lines['self'].splice(lines['self'].length - 1, 1, lastLine);
    setLines({ ...lines });
    socket.emit('point', {
      peer: socket.id,
      point: {
        x: point.x / (canvasDimension / 1000),
        y: point.y / (canvasDimension / 1000),
      },
    }); //send drawn point to peers
  };

  const handleMouseUp = () => {
    if (step === 0) {
      isDrawing.current = false;
      onDrawingChange?.(false);
      setNumSessionLines(numSessionLines + 1);
      save();
    }
  };

  return (
    <Box w="min-content" position={'relative'} zIndex={'0'}>
      {!isLoaded && (
        <Flex
          position="absolute"
          inset="0"
          zIndex="1"
          align="center"
          justify="center"
          bg="var(--light)"
        >
          <Spinner color="var(--dark)" />
        </Flex>
      )}
      <Stage
        style={{
          background: '#f0f0f0',
          cursor: step === 0 ? toolCursor : 'default',
        }}
        width={canvasDimension}
        height={canvasDimension}
        scaleX={canvasDimension / 1000}
        scaleY={canvasDimension / 1000}
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
                  [, list], //if on latest wall, draw the lines for self AND peers, otherwise just draw lines for self since that's where the fetched wall state is placed
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
                        strokeWidth={line.tool === 'eraser' ? 15 : 5}
                        tension={0.5}
                        lineCap="round"
                        globalCompositeOperation={
                          line.tool === 'eraser'
                            ? 'destination-out'
                            : 'source-over'
                        }
                      />
                    );
                  }),
              )
            : lines['self'].map((line, i) => {
                if (line == null) {
                  return null;
                }
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
                  />
                );
              })}
        </Layer>
      </Stage>
    </Box>
  );
}
