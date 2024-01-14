const API_URL = 'https://dibiaggdotio.herokuapp.com';

export const fetchCanvasState = (step) => {
  return fetch(API_URL + '/graffiti?' + new URLSearchParams({ step: step }));
};

export const fetchMaxStep = () => {
  return fetch(API_URL + '/graffiti/maxstep')
    .then((response) => response.json())
    .then((data) => {
      // let count = parseInt(data.count);
      // count === 0 ? setMaxStep(0) : setMaxStep(count - 1);
      return data;
    });
};

export const postCanvasLine = (line) => {
  let data = { line: line };
  return fetch(API_URL + '/graffiti', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((data) => {
    return data;
  });
};
