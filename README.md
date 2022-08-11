Welcome to the dibiagg.io source code!  
  
## Project Structure
```
├── client | Static files  
│   ├── public | Assets  
│   └── src  
│       ├── components | Reusable UI components and logic  
│       ├── index.js | React-router routes, React initialization  
│       ├── logo.svg  
│       ├── reportWebVitals.js  
│       ├── routes | Webpages  
│       │   ├── about.jsx  
│       │   ├── deathballabout.jsx  
│       │   ├── deathballleaderboard.jsx  
│       │   ├── graffiti.jsx  
│       │   └── resume.jsx  
│       ├── serviceWorker.js  
│       ├── setupTests.js  
│       ├── test-utils.js  
│       └── theme.js | Theming for Chakra components  
├── package.json  
├── README.md  
└── server  
|   └── api.js | Node.js API for deathball and graffiti  
```