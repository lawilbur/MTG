const express = require('express');
const user = express.Router();
const db = require('../models/users.js');
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
        res.send(createdUser)
    })

});

user.delete('/:id' , (req , res)=>{
    db.deleteUser(req.params.id, (err, deletedUser)=>{
        if (err){
            res.send(err);
        }
        res.send(deletedUser)
    })
});

user.put('/:id' , (req , res)=>{
    db.updateUser(req.body, req.params.id, (err, updatedUser)=>{
        if (err){
            res.send(err);
        }
        res.send(updatedUser)
    })
});

module.exports = user;
