Welcome to the dibiagg.io source code!  
  
## Project Structure
```
├── client --> Static files  
│   ├── public --> Assets  
│   └── src  
│       ├── components --> Reusable UI components and logic  
│       ├── index.js --> React-router routes, React initialization  
│       ├── reportWebVitals.js  
│       ├── routes --> Webpages  
|       ├── hooks --> Custom React hooks
│       ├── serviceWorker.js  
│       ├── setupTests.js  
│       ├── test-utils.js  
│       └── theme.js --> Theming for Chakra components  
├── server  
|    └── api.js --> Node.js API for deathball and graffiti, and WebSocket server
└── README.md  
```