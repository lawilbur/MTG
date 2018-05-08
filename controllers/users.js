const express = require('express');
const user = express.Router();
const db = require('./db.js');
db.connect();

user.get('/' , (req , res, next)=> {
    db.getUsers((err, usersresult)=> {
        if(err){
            return next(err);
        }
        res.send(usersresult);
    });
});

user.post('/' , (req , res)=>{
    // console.log(req.body);
    db.createUser(req.body, (err, createdUser)=>{
        if (err){
            res.send(err);
        }
        res.send(req.body)
    })

});

user.delete('/:id' , (req , res)=>{
    db.deleteUser(req.params.id, (err, deletedUser)=>{
        if (err){
            res.send(err);
        }
        res.send(req.params.id)
    })
});

user.put('/:id' , (req , res)=>{
    res.send('put')
});

module.exports = user;
