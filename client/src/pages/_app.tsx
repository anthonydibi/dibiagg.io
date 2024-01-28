import Layout from '../layouts/MainLayout';
import '../styles/fonts.css';
import '../styles/swatches.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme.js';
import Head from 'next/head';
import { AppProps } from 'next/app.js';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
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
      </Layout>
    </ChakraProvider>
  );
}
