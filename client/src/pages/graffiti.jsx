import { Center } from '@chakra-ui/react';
import GraffitiModal from '../components/GraffitiModal';
import { useEffect } from 'react';
import SEO from '../components/seo';
import Script from 'next/script';
import GraffitiCanvas from '../components/GraffitiCanvas';

export default function Graffiti() {
  let showModal = false;

  useEffect(() => {
    let hasVisitedGraffiti = localStorage.getItem('hasVisitedGraffiti');
    if (hasVisitedGraffiti !== '1') {
      localStorage.setItem('hasVisitedGraffiti', '1');
      showModal = true;
    }
  }, []);

  return (
    <>
      <SEO
        description="Graffiti - a page where you can make your mark"
        title="Graffiti"
        siteTitle="dibiagg.io"
      />
      <Script
        src="https://cdn.socket.io/4.5.0/socket.io.min.js"
        integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k"
        crossorigin="anonymous"
      ></Script>
      <Center>
        {showModal && <GraffitiModal />}
        <GraffitiCanvas />
      </Center>
    </>
  );
}
