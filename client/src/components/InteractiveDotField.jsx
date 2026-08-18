import React from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { DARK_ACCENT, LIGHT_ACCENT } from '../styles/theme';

const DOT_SPACING = 20;
const DOT_RADIUS = 2;
const SPHERE_RADIUS = 78;
const SPHERE_RADIUS_SQUARED = SPHERE_RADIUS * SPHERE_RADIUS;
const SPHERE_DEPTH = 48;
const PERSPECTIVE_DISTANCE = 180;
const MAX_DEVICE_PIXEL_RATIO = 1.5;
const POINTER_SMOOTHING = 18;
const INFLUENCE_SMOOTHING = 10;
const SETTLED_THRESHOLD = 0.002;

const getFrameBlend = (speed, deltaSeconds) =>
  1 - Math.exp(-speed * deltaSeconds);

const InteractiveDotField = () => {
  const canvasRef = React.useRef(null);
  const dotColor = useColorModeValue(LIGHT_ACCENT, DARK_ACCENT);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      influence: 0,
      targetInfluence: 0,
    };
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let prefersReducedMotion = reducedMotionQuery.matches;
    let dots = [];
    let width = 0;
    let height = 0;
    let animationFrame = null;
    let previousFrameTime = 0;
    let isVisible = true;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.fillStyle = dotColor;
      context.beginPath();

      for (const dot of dots) {
        let x = dot.x;
        let y = dot.y;
        let radius = DOT_RADIUS;

        if (pointer.influence > SETTLED_THRESHOLD && !prefersReducedMotion) {
          const deltaX = dot.x - pointer.x;
          const deltaY = dot.y - pointer.y;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;

          if (distanceSquared < SPHERE_RADIUS_SQUARED) {
            const normalizedDistanceSquared =
              distanceSquared / SPHERE_RADIUS_SQUARED;
            const depth =
              Math.sqrt(1 - normalizedDistanceSquared) * SPHERE_DEPTH;
            const perspectiveScale =
              PERSPECTIVE_DISTANCE / (PERSPECTIVE_DISTANCE - depth);
            const projectedX = pointer.x + deltaX * perspectiveScale;
            const projectedY = pointer.y + deltaY * perspectiveScale;

            x += (projectedX - dot.x) * pointer.influence;
            y += (projectedY - dot.y) * pointer.influence;
            radius *= 1 + (perspectiveScale - 1) * pointer.influence;
          }
        }

        context.moveTo(x + radius, y);
        context.arc(x, y, radius, 0, Math.PI * 2);
      }

      context.fill();
    };

    const stopAnimation = () => {
      if (animationFrame === null) return;
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
      previousFrameTime = 0;
    };

    const animate = (frameTime) => {
      if (!isVisible || prefersReducedMotion) {
        stopAnimation();
        draw();
        return;
      }

      const deltaSeconds = previousFrameTime
        ? Math.min((frameTime - previousFrameTime) / 1000, 0.05)
        : 1 / 60;
      previousFrameTime = frameTime;

      const pointerBlend = getFrameBlend(POINTER_SMOOTHING, deltaSeconds);
      const influenceBlend = getFrameBlend(INFLUENCE_SMOOTHING, deltaSeconds);

      pointer.x += (pointer.targetX - pointer.x) * pointerBlend;
      pointer.y += (pointer.targetY - pointer.y) * pointerBlend;
      pointer.influence +=
        (pointer.targetInfluence - pointer.influence) * influenceBlend;

      draw();

      const pointerIsSettled =
        Math.abs(pointer.targetX - pointer.x) < SETTLED_THRESHOLD &&
        Math.abs(pointer.targetY - pointer.y) < SETTLED_THRESHOLD;
      const influenceIsSettled =
        Math.abs(pointer.targetInfluence - pointer.influence) <
        SETTLED_THRESHOLD;

      if (pointerIsSettled && influenceIsSettled) {
        pointer.influence = pointer.targetInfluence;
        animationFrame = null;
        previousFrameTime = 0;
        draw();
        return;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const requestDraw = () => {
      if (animationFrame !== null || !isVisible || prefersReducedMotion) {
        return;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        MAX_DEVICE_PIXEL_RATIO,
      );
      const nextWidth = bounds.width;
      const nextHeight = bounds.height;
      const nextCanvasWidth = Math.max(
        1,
        Math.round(nextWidth * pixelRatio),
      );
      const nextCanvasHeight = Math.max(
        1,
        Math.round(nextHeight * pixelRatio),
      );

      if (
        width === nextWidth &&
        height === nextHeight &&
        canvas.width === nextCanvasWidth &&
        canvas.height === nextCanvasHeight
      ) {
        return;
      }

      width = nextWidth;
      height = nextHeight;
      canvas.width = nextCanvasWidth;
      canvas.height = nextCanvasHeight;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      dots = [];
      for (let y = DOT_SPACING / 2; y < height; y += DOT_SPACING) {
        for (let x = DOT_SPACING / 2; x < width; x += DOT_SPACING) {
          dots.push({ x, y });
        }
      }

      draw();
    };

    const updatePointer = (event) => {
      if (prefersReducedMotion) return;

      const x = event.offsetX;
      const y = event.offsetY;

      if (pointer.influence <= SETTLED_THRESHOLD) {
        pointer.x = x;
        pointer.y = y;
      }

      pointer.targetX = x;
      pointer.targetY = y;
      pointer.targetInfluence = 1;
      requestDraw();
    };

    const releasePointer = () => {
      pointer.targetInfluence = 0;
      requestDraw();
    };

    const handleReducedMotionChange = (event) => {
      prefersReducedMotion = event.matches;
      pointer.influence = 0;
      pointer.targetInfluence = 0;
      stopAnimation();
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;

      if (!isVisible) {
        pointer.influence = 0;
        pointer.targetInfluence = 0;
        stopAnimation();
      } else {
        draw();
      }
    });

    resizeObserver.observe(container);
    intersectionObserver.observe(canvas);
    canvas.addEventListener('pointerenter', updatePointer, { passive: true });
    canvas.addEventListener('pointermove', updatePointer, { passive: true });
    canvas.addEventListener('pointerleave', releasePointer, { passive: true });
    canvas.addEventListener('pointercancel', releasePointer, { passive: true });
    window.addEventListener('blur', releasePointer);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
    resize();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener('pointerenter', updatePointer);
      canvas.removeEventListener('pointermove', updatePointer);
      canvas.removeEventListener('pointerleave', releasePointer);
      canvas.removeEventListener('pointercancel', releasePointer);
      window.removeEventListener('blur', releasePointer);
      reducedMotionQuery.removeEventListener(
        'change',
        handleReducedMotionChange,
      );
    };
  }, [dotColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        display: 'block',
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default InteractiveDotField;
