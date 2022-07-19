const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3001;
var cors = require('cors')

const { Client, types } = require('pg');
const { json } = require('express')

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(cors())

types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

app.get('/graffiti', (request, response) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let step = parseInt(request.query.step);
    client.query('SELECT * FROM graffiti ORDER BY day DESC LIMIT 1 OFFSET $1', [step], (err, res) => {
        if(err) console.log(error);
        if(res.rows.length == 0){
            response.json({day: today.toISOString().split('T')[0], lines: []});
        }
        else{
            let latestDate = new Date(res.rows[0].day);
            latestDate.setHours(0, 0, 0, 0);
            if(step === 0 && latestDate.getTime() !== today.getTime()){
                client.query("INSERT INTO graffiti(day, lines) VALUES($1, $2)", [today, JSON.stringify([])], (err, res) => {
                    if(err) console.log(err);
                    response.json({day: today.toISOString().split('T')[0], lines: []});
                });
            }
            else{
                response.json(res.rows[0]);
            }
        }
    });
})

app.get('/graffiti/maxstep', (request, response) => {
    client.query('SELECT COUNT(*) as count from graffiti', (err, res) => {
        if(err) console.log(err);
        response.json({count: parseInt(res.rows[0].count)});
    })
})

app.post('/graffiti', (request, response) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    client.query('SELECT * FROM graffiti ORDER BY day DESC LIMIT 1', (err, res) => {
        if(err) console.log(err);
        if(res.rows.length != 0){
            let latest = new Date(res.rows[0].day.replace(' ', 'T'));
            if(latest >= today){
                client.query("UPDATE graffiti SET lines = lines || $1::jsonb where day = (SELECT MAX(day) from graffiti)", [JSON.stringify([request.body.line])], (err, res) => {
                    if(err) console.log(err);
                    response.sendStatus(200);
                })
            }
            else{
                client.query("INSERT INTO graffiti(day, lines) VALUES($1, $2::jsonb)", [today, JSON.stringify([request.body.line])], (err, res) => {
                    if(err) console.log(err);
                    response.sendStatus(200);
                });
            }
        }
        else{
            client.query("INSERT INTO graffiti(day, lines) VALUES($1, $2::jsonb)", [today, JSON.stringify([request.body.line])], (err, res) => {
                if(err) console.log(err);
                response.sendStatus(200);
            });
        }
    });
})

app.get('/deathball/standings', (request, response) => {
    let start = parseInt(request.query.start);
    let end = parseInt(request.query.end);
    client.query("SELECT RANK () OVER (ORDER BY elo DESC) AS rank, name, elo FROM (SELECT name, wins::decimal + 5 + AVG(wins::decimal/(wins::decimal+losses::decimal))/(wins::decimal + losses::decimal + 5) as elo FROM deathballplayers GROUP BY name, wins, losses) as alias ORDER BY rank OFFSET $1 LIMIT $2;", [request.query.start, request.query.stop], (err, res) => { //ranks players by a simple elo calculation which weights each player's performance by their win ratio and number of games compared to the average global win ratio
        if(err) console.log(err);
        response.json(res.rows);
    })
})

app.get('/deathball/standings/count', (request, response) => {
    client.query("SELECT COUNT(*) as count FROM deathballplayers;", (err, res) => {
        if(err) console.log(err);
        response.json({count: res.rows[0].count});
    })
})

app.get('/deathball/games', (request, response) => {
    client.query("SELECT * FROM deathballgames", (err, res) => {
        if(err) console.log(err);
        response.json(res.rows);
    });
})

app.post('/deathball/games', (request, response) => {
    let today = new Date();
    client.query('INSERT INTO deathballplayers(name) SELECT $1::varchar WHERE NOT EXISTS(SELECT name FROM deathballplayers WHERE name=$1::varchar); INSERT INTO deathballplayers(name) SELECT $2::varchar WHERE NOT EXISTS(SELECT name FROM deathballplayers WHERE name=$2::varchar); UPDATE deathballplayers SET wins=wins+1 WHERE name=$1; UPDATE deathballplayers SET losses=losses+1 WHERE name=$2', [request.body.winner, request.body.loser], (err, res) => {
        if(err) console.log(err);
        client.query("INSERT INTO deathballgames(winner, loser, winnerscore, loserscore, date) VALUES((SELECT id FROM deathballplayers WHERE name = $1::varchar), (SELECT id FROM deathballplayers WHERE name = $2::varchar), $3, $4, $5)", [request.body.winner, request.body.loser, request.body.winnerscore, request.body.loserscore, today], (err, res) => {
            if(err) console.log(err);
            response.sendStatus(200);
        });
    });
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})