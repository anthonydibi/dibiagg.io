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
    let lastMonday = new Date();
    lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay() + 6) % 7);
    let step = request.query.step;
    client.query('SELECT * FROM graffiti ORDER BY week_of DESC LIMIT 1 OFFSET $1', [step], (err, res) => {
        if(err) throw err;
        if(res.rows.length == 0){
            response.json({week_of: lastMonday.getDate().toString(), lines: []});
        }
        else{
            response.json(res.rows[0]);
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
    let lastMonday = new Date();
    lastMonday.setHours(0, 0, 0, 0);
    lastMonday.setDate(lastMonday.getDate() - (lastMonday.getDay() + 6) % 7);
    client.query('SELECT * FROM graffiti ORDER BY week_of DESC LIMIT 1', (err, res) => {
        if(err) throw err;
        if(res.rows.length != 0){
            let latest = new Date(res.rows[0].week_of.replace(' ', 'T'));
            if(latest >= lastMonday){
                client.query("UPDATE graffiti set lines = $1 where week_of = (SELECT MAX(week_of) from graffiti)", [JSON.stringify(request.body.lines)], (err, res) => {
                    if(err) throw err;
                    return;
                })
            }
            else{
                client.query("INSERT INTO graffiti(week_of, lines) VALUES($1, $2)", [lastMonday, JSON.stringify(request.body.lines)], (err, res) => {
                    if(err) throw err;
                });
            }
        }
        else{
            client.query("INSERT INTO graffiti(week_of, lines) VALUES($1, $2)", [lastMonday, JSON.stringify(request.body.lines)], (err, res) => {
                if(err) throw err;
            });
        }
    });
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})