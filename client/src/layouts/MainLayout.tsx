import { MutableRefObject, PropsWithChildren, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Breadcrumbs from '../components/Nav/Breadcrumbs';

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
        <>{children}</>
      </main>
    </Box>
  );
}
