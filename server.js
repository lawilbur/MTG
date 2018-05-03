const express = require('express');
const app = express();
const { Client } = require('pg');

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}))

const userController = require('./controllers/users.js');
app.use('/' , userController);



const client = new Client({
  user: 'lawilbur',
  host: 'localhost',
  database: 'mtg',
  port: 5432,
})
client.connect()

client.query('Select * From users;', (err, res)=>{
    console.log(err, res)
    client.end()
})



const port = 3000;
app.listen(port , ()=>{
    console.log('Listening');
})
