const API_URL = 'https://dibiaggdotio.herokuapp.com';

export const fetchStandings = (page, entriesPerPage) => {
    console.log(API_URL);
    return fetch(`${API_URL}/deathball/standings?${new URLSearchParams({start: page * entriesPerPage, stop: ((page + 1) * entriesPerPage) - 1})}`)
        .then(response => response.json())
        .then((data) => { return data; })
}

