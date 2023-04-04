import Layout from '../components/layout.js';
import '../styles/fonts.css';
import '../styles/swatches.css';
import '../styles/pdf.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme.js';
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Head>
                <meta charset="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta
                name="dibiagg.io"
                content="Anthony Di Biaggio's personal website"
                />
                <link rel="apple-touch-icon" href="/logo192.png" />
                <link rel="manifest" href="/manifest.json" />
                <Script src="https://cdn.socket.io/4.5.0/socket.io.min.js" integrity="sha384-7EyYLQZgWBi67fBtVxw60/OWl1kjsfrPFcaU0pp0nAh+i8FD068QogUvg85Ewy1k" crossorigin="anonymous"></Script>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}
  