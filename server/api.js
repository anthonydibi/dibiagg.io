const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socketio = require('socket.io')
const port = process.env.PORT || 3003;
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
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

io.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id)
    socket.on('lineStarted', (data) => socket.broadcast.emit('lineStarted', data))
    socket.on('point', (data) => socket.broadcast.emit('point', data))
    socket.on('disconnect', () => console.log('Client has disconnected'))
})

const getLatest = (callback) => {
  client.query("SELECT * FROM graffiti ORDER BY day DESC LIMIT 1", (err, res) => {
    if(err) console.log(err);
    callback(res);
  });
}

app.get('/graffiti', (request, response) => {
    let step = parseInt(request.query.step);
    client.query('SELECT * FROM graffiti ORDER BY day DESC LIMIT 1 OFFSET $1', [step], (err, res1) => {
        if(err) console.log(error);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        getLatest((latestRes) => {
          let latest = new Date(latestRes.rows[0].day.replace(' ', 'T'));
          if(latest < today){
            if(step === 0){
              response.json({day: today.toISOString().split('T')[0], lines: []});
            }
            else{
              client.query('SELECT * FROM graffiti ORDER BY day DESC LIMIT 1 OFFSET $1', [step - 1], (err, res2) => {
                if(err) console.log(err);
                if(res2.rows.length === 0){
                  response.sendStatus(404);
                }
                response.json(res2.rows[0]);
              });
            }
          }
          else{
            if(res1.rows.length === 0){
               response.sendStatus(404);
            }
            else{
              response.json(res1.rows[0]);
            }
          }
        });
    });
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
    client.query("SELECT DENSE_RANK () OVER (ORDER BY elo DESC) AS rank, name, wins, losses, elo FROM (SELECT name, wins, losses, wins::decimal + 5 + AVG(wins::decimal/(wins::decimal+losses::decimal))/(wins::decimal + losses::decimal + 5) as elo FROM deathballplayers GROUP BY name, wins, losses) as alias ORDER BY rank OFFSET $1 LIMIT $2;", [request.query.start, request.query.stop], (err, res) => { //ranks players by a simple elo calculation which weights each player's performance by their win ratio and number of games compared to the average global win ratio
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

app.post('/deathball/games', (request, response) => { //TODO: really need to condense this chain of queries somehow
    let today = new Date();
    client.query('INSERT INTO deathballplayers(name) SELECT $1::varchar WHERE NOT EXISTS(SELECT name FROM deathballplayers WHERE name=$1::varchar);', [request.body.winner], (err, res) => {
        if(err) console.log(err);
        client.query('INSERT INTO deathballplayers(name) SELECT $1::varchar WHERE NOT EXISTS(SELECT name FROM deathballplayers WHERE name=$1::varchar);', [request.body.loser], (err, res) => {
            if(err) console.log(err);
            client.query(' UPDATE deathballplayers SET wins=wins+1 WHERE name=$1;', [request.body.winner], (err, res) => {
                if(err) console.log(err);
                client.query('UPDATE deathballplayers SET losses=losses+1 WHERE name=$1', [request.body.loser], (err, res) => {
                    if(err) console.log(err);
                    client.query("INSERT INTO deathballgames(winner, loser, winnerscore, loserscore, date) VALUES((SELECT id FROM deathballplayers WHERE name = $1::varchar), (SELECT id FROM deathballplayers WHERE name = $2::varchar), $3, $4, $5)", [request.body.winner, request.body.loser, request.body.winnerscore, request.body.loserscore, today], (err, res) => {
                        if(err) console.log(err);
                        response.sendStatus(200);
                    });
                });
            });
        });
    });
})

server.listen(port, () => {
    console.log(`App running on port ${port}.`)
})