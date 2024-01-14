const API_URL = 'https://dibiaggdotio.herokuapp.com';

export const fetchStandings = (page, entriesPerPage) => {
  let start = page === 0 ? page * entriesPerPage : page * entriesPerPage + 1;
  let stop =
    page === 0 ? (page + 1) * entriesPerPage + 1 : (page + 1) * entriesPerPage;
  return fetch(
    `${API_URL}/deathball/standings?${new URLSearchParams({
      start: start,
      stop: stop,
    })}`,
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};
