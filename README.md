# dibiagg.io

This is a repository which holds all of the code related to dibiagg.io, my personal website. The exception is my web-based **[Deathball clone]**, which links from my site but has its own repository. I am always looking to refactor and improve my code so let me know if you have any ideas or find any issues!

[Deathball clone]: https://github.com/anthonydibi/deathball-clone
  
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