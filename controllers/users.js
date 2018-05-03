const express = require('express');
const user = express.Router();

user.get('/' , (req , res)=>{
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
