import { MutableRefObject, PropsWithChildren, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '../components/Nav/Breadcrumbs';
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  { ssr: false },
);
const Port = dynamic(
  () => import('@react-three/drei').then((mod) => mod.View.Port),
  { ssr: false },
);

export default function MainLayout({ children }: PropsWithChildren) {
  const container = useRef() as MutableRefObject<HTMLElement>;

  return (
    <Box position="relative">
      {/* <Banner
        header={'DIBIAGG.IO is open source!'}
        action={'Check it out on Github.'}
        buttonText={'Go'}
        buttonIcon={<FaGithub />}
        onClick={() => {
          window.open('https://github.com/anthonydibi/dibiagg.io');
        }}
      /> */}
      <Breadcrumbs />
      <main ref={container}>
        <>
          {children}
          <Canvas
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              pointerEvents: 'none',
            }}
            eventSource={
              typeof window !== 'undefined'
                ? document.getElementById('__next') ?? undefined
                : undefined
            }
          >
            {/* @ts-ignore */}
            <Port />
          </Canvas>
        </>
      </main>
    </Box>
  );
}
