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

user.post('/signup' , (req , res)=>{
    // console.log(req.body);
    db.createUser(req.body, (err, createdUser)=>{
        if (err){
            res.send(err);
        }
        res.send(createdUser)
    })

});

user.post('/login' , (req , res)=>{
    db.getUser(req.body, (err, gottenUser)=>{
        if (err){
            res.send(err);
        } else if(gottenUser === null){
            res.status(404).json({
                    status: 404,
                    message: "Username not on record."
            })
        }else {
            res.send(gottenUser)
        }

    })

});

user.delete('/:id' , (req , res)=>{
    console.log("got to delete");
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
