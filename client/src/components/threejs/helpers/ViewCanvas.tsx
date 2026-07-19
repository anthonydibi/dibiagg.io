import { addEffect, Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import Lenis from 'lenis';
import { useRouter } from 'next/router';
import { MutableRefObject, useEffect } from 'react';
import viewTunnel from './ViewTunnel';

interface ViewCanvasProps {
  eventSource: MutableRefObject<HTMLElement>;
  scrollContent: MutableRefObject<HTMLElement>;
}

const ViewCanvas = ({ eventSource, scrollContent }: ViewCanvasProps) => {
  const router = useRouter();

  useEffect(() => {
    if (
      !eventSource.current ||
      !scrollContent.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const lenis = new Lenis({
      wrapper: eventSource.current,
      content: scrollContent.current,
      autoRaf: false,
      syncTouch: true,
    });
    const removeEffect = addEffect((time) => lenis.raf(time));
    const resetScroll = () => {
      lenis.scrollTo(0, { immediate: true, force: true });
    };

    router.events.on('routeChangeComplete', resetScroll);

    return () => {
      router.events.off('routeChangeComplete', resetScroll);
      removeEffect();
      lenis.destroy();
    };
  }, [eventSource, router.events, scrollContent]);

  return (
    <Canvas
      aria-hidden="true"
      dpr={[1, 1.5]}
      eventSource={eventSource}
      eventPrefix="client"
      gl={{ alpha: true, antialias: true }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <viewTunnel.Out />
      <Preload all />
    </Canvas>
  );
};

export default ViewCanvas;
