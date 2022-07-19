import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import About from "./routes/about";
import Graffiti from "./routes/graffiti"
import Nav from './components/Nav'
import Resume from './routes/resume'
import DeathballLeaderboard from './routes/deathballleaderboard';
import theme from './theme'
import ContactFooter from './components/ContactFooter';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Nav/>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="graffiti" element={<Graffiti />} />
        <Route path="resume" element={<Resume />} />
        <Route path='deathball/leaderboard' element={<DeathballLeaderboard />} />
      </Routes>
      <ContactFooter/>
    </ChakraProvider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
