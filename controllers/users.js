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
    const response = []
    client.connect()
    client.query('Select * From users;', (err, query)=>{
        response = query.rows;
        console.log(query.rows)
        client.end()
    })
    res.json(query)

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
