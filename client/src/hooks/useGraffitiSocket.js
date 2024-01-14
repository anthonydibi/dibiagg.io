import { useEffect, useRef } from 'react';
const io = require('socket.io-client');

export default function useGraffitiSocket(setLines) {
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect('wss://dibiaggdotio.herokuapp.com'); //connect to websocket API

    socket.current.on('lineStarted', (data) => {
      setLines((lines) => {
        if (!lines.hasOwnProperty(data.peer)) {
          lines[data.peer] = [];
        }
        lines[data.peer].push({
          ...data.line,
          points: [data.line.points[0], data.line.points[1]],
        }); //add new line to this peer's portion of the lines
        return { ...lines };
      });
    });

    socket.current.on('point', (data) => {
      setLines((lines) => {
        if (!lines.hasOwnProperty(data.peer)) {
          lines[data.peer] = [];
        }
        let lastLine = lines[data.peer][lines[data.peer].length - 1];
        lastLine.points = lastLine.points.concat([data.point.x, data.point.y]); //concatenate new point onto the peer's current line
        return { ...lines };
      });
    });
  }, [setLines]);

  return socket.current;
}
