const express = require('express');
const user = express.Router();
const { Client } = require('pg');
const client = new Client({
  user: 'lawilbur',
  host: 'localhost',
  database: 'mtg',
  port: 5432,
})

user.get('/' , (req , res)=>{
    client.connect()

    client.query('Select * From users;', (err, res)=>{
        console.log(err, res)
        client.end()
    })
    res.send('index')
});

user.post('/' , (req , res)=>{
    res.send('post')
});

user.delete('/:id' , (req , res)=>{
    res.send('delete')
});

user.put('/:id' , (req , res)=>{
    res.send('put')
});

module.exports = user;
