import { MutableRefObject, PropsWithChildren, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '../components/Nav/Breadcrumbs';

const ViewCanvas = dynamic(
  () => import('../components/threejs/helpers/ViewCanvas'),
  { ssr: false },
);

export default function MainLayout({ children }: PropsWithChildren) {
  const container = useRef() as MutableRefObject<HTMLDivElement>;
  const content = useRef() as MutableRefObject<HTMLDivElement>;

  return (
    <Box
      ref={container}
      position="relative"
      w="100%"
      h="100%"
      overflowY="auto"
      overflowX="hidden"
      sx={{ overscrollBehaviorY: 'none', touchAction: 'auto' }}
    >
      <Box ref={content} position="relative">
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
        <main>
          <>{children}</>
        </main>
      </Box>
      <ViewCanvas eventSource={container} scrollContent={content} />
    </Box>
  );
}
