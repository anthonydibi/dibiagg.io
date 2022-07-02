const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;
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
    let step = request.query.step;
    client.query('SELECT * FROM graffiti ORDER BY day DESC LIMIT 1 OFFSET $1', [step], (err, res) => {
        if(err) throw err;
        if(res.rows.length == 0){
            response.json({day: today.toISOString().split('T')[0], lines: []});
        }
        else{
            let latestDate = new Date(res.rows[0].day);
            latestDate.setHours(0, 0, 0, 0);
            if(latestDate.getTime() !== today.getTime()){
                client.query("INSERT INTO graffiti(day, lines) VALUES($1, $2)", [today, JSON.stringify([])], (err, res) => {
                    if(err) throw err;
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
        if(err) throw err;
        response.json({count: parseInt(res.rows[0].count)});
    })
})

app.post('/graffiti', (request, response) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    client.query('SELECT * FROM graffiti ORDER BY day DESC LIMIT 1', (err, res) => {
        if(err) throw err;
        if(res.rows.length != 0){
            let latest = new Date(res.rows[0].day.replace(' ', 'T'));
            if(latest >= today){
                client.query("UPDATE graffiti set lines = $1 where day = (SELECT MAX(day) from graffiti)", [JSON.stringify(request.body.lines)], (err, res) => {
                    if(err) throw err;
                    response.status(200);
                })
            }
            else{
                client.query("INSERT INTO graffiti(day, lines) VALUES($1, $2)", [today, JSON.stringify(request.body.lines)], (err, res) => {
                    if(err) throw err;
                    response.status(200);
                });
            }
        }
        else{
            client.query("INSERT INTO graffiti(day, lines) VALUES($1, $2)", [today, JSON.stringify(request.body.lines)], (err, res) => {
                if(err) throw err;
                response.status(200);
            });
        }
    });
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})