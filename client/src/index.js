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
import DeathballAbout from './routes/deathballabout';
import Banner from './components/Banner';
import { FaGithub } from 'react-icons/fa';
import '@fontsource/roboto'
import ThreeSharp from './routes/threesharp';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <ColorModeScript />
      <Banner header={"DIBIAGG.IO is open source!"} action={"Check it out on Github."} buttonText={"Go"} buttonIcon={<FaGithub />} onClick={() => {window.open("https://github.com/anthonydibi/dibiagg.io")}}/>
      <Nav /> 
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="about" element={<About />} />
        <Route path="graffiti" element={<Graffiti />} />
        <Route path="resume" element={<Resume />} />
        <Route path='deathball/leaderboard' element={<DeathballLeaderboard />} />
        <Route path='deathball/about' element={<DeathballAbout />} />
        <Route path='threesharp' element={<ThreeSharp />} />
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
