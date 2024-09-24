import Layout from '../layouts/MainLayout';
import '../styles/fonts.css';
import '../styles/swatches.css';
import '../styles/cube.css';
import '../styles/global.css';
import '../styles/marquee.css';
import Head from 'next/head';
import { AppProps } from 'next/app.js';
import Chakra from '../components/Chakra';
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Chakra cookies={pageProps.cookies}>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="dibiagg.io"
          content="Anthony Di Biaggio's personal website"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </Chakra>
  );
}

export { getServerSideProps } from '../components/Chakra';
