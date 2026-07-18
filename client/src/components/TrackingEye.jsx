import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

const EYE_CENTER = { x: 20, y: 14 };
const PUPIL_RANGE = { x: 6, y: 3.5 };

const TrackingEye = () => {
  const eyeRef = useRef(null);
  const pupilRef = useRef(null);
  const animationFrameRef = useRef(null);
  const pointerRef = useRef(null);

  useEffect(() => {
    const updatePupil = () => {
      animationFrameRef.current = null;

      if (!eyeRef.current || !pupilRef.current || !pointerRef.current) return;

      const bounds = eyeRef.current.getBoundingClientRect();
      const eyeX = bounds.left + bounds.width / 2;
      const eyeY = bounds.top + bounds.height / 2;
      const angle = Math.atan2(
        pointerRef.current.y - eyeY,
        pointerRef.current.x - eyeX,
      );
      const distance = Math.min(
        1,
        Math.hypot(pointerRef.current.x - eyeX, pointerRef.current.y - eyeY) /
          80,
      );
      const x = Math.cos(angle) * PUPIL_RANGE.x * distance;
      const y = Math.sin(angle) * PUPIL_RANGE.y * distance;

      pupilRef.current.setAttribute(
        'transform',
        `translate(${x.toFixed(2)} ${y.toFixed(2)})`,
      );
    };

    const followPointer = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };

      if (animationFrameRef.current === null) {
        animationFrameRef.current = requestAnimationFrame(updatePupil);
      }
    };

    window.addEventListener('pointerdown', followPointer, { passive: true });
    window.addEventListener('pointermove', followPointer, { passive: true });

    return () => {
      window.removeEventListener('pointerdown', followPointer);
      window.removeEventListener('pointermove', followPointer);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={eyeRef}
      as="span"
      title="Eye see you"
      display="inline-block"
      width="1.55em"
      height="1.1em"
      ml="0.12em"
      verticalAlign="-0.18em"
      lineHeight="1"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 40 28"
        width="100%"
        height="100%"
      >
        <path
          d="M2 14C7.7 5.6 13.9 2.5 20 2.5S32.3 5.6 38 14c-5.7 8.4-11.9 11.5-18 11.5S7.7 22.4 2 14Z"
          fill="#f8f7f3"
          stroke="#493a32"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <g ref={pupilRef}>
          <circle
            cx={EYE_CENTER.x}
            cy={EYE_CENTER.y}
            r="7"
            fill="var(--accent)"
          />
          <circle cx={EYE_CENTER.x} cy={EYE_CENTER.y} r="4.25" fill="#171311" />
          <circle cx="18.4" cy="12.2" r="1.45" fill="white" opacity="0.9" />
        </g>
      </svg>
    </Box>
  );
};

export default TrackingEye;
