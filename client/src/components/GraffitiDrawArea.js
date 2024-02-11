import { Stage, Layer, Line } from 'react-konva';
import useGraffitiSocket from '../hooks/useGraffitiSocket';
import React from 'react';
import { Box, Skeleton, Text, useBreakpointValue } from '@chakra-ui/react';

export default function GraffitiDrawArea(props) {
  const lines = props.lines;
  const setLines = props.setLines;
  const tool = props.tool;
  const isLoaded = props.isLoaded;
  const userTag = props.userTag;
  const color = props.color;
  const step = props.step;
  const save = props.save;
  const canvasDimension = props.canvasDimension;
  const [numSessionLines, setNumSessionLines] = React.useState(0);
  const [hoveredTag, setHoveredTag] = React.useState('');
  const isDrawing = React.useRef(false);
  const socket = useGraffitiSocket(setLines);

  const handleMouseDown = (e) => {
    if (step === 0) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      const newLine = {
        tool,
        color: color.hex ?? color,
        points: [
          pos.x / (canvasDimension / 1000),
          pos.y / (canvasDimension / 1000),
        ],
        who: userTag,
      };
      setLines({ ...lines, self: [...lines['self'], newLine] });
      socket.emit('lineStarted', { peer: socket.id, line: newLine }); //send start of new line to peers
    }
  };

  const handleMouseMove = (e) => {
    e.evt.preventDefault(); //prevent scrolling when drawing on mobile

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const intersection = stage.getIntersection(point);
    if (
      intersection &&
      intersection.attrs.globalCompositeOperation !== 'destination-out'
    ) {
      if (
        intersection.attrs.hasOwnProperty('who') &&
        intersection.attrs.who !== ''
      ) {
        setHoveredTag(intersection.attrs.who);
      } else {
        setHoveredTag('anonymous');
      }
    } else {
      setHoveredTag('');
    }

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
      setNumSessionLines(numSessionLines + 1);
      save();
    }
  };

  return (
    <Skeleton
      position={'relative'}
      isLoaded={isLoaded}
      zIndex={'5'}
      border="1px solid"
      borderBottom={{ base: '1px', lg: '0px none' }}
    >
      <Text
        color={'black'}
        fontSize={'lg'}
        position={'absolute'}
        m={'2'}
        top={'0'}
        left={'0'}
      >
        {hoveredTag}
      </Text>
      <Stage
        style={{ background: '#f0f0f0' }}
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
                        who={line.who}
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
                    who={line.who}
                  />
                );
              })}
        </Layer>
      </Stage>
    </Skeleton>
  );
}
