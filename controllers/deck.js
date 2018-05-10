const express = require('express');
const deck = express.Router();
const db = require('../models/deck.js');
db.connect();

deck.get('/' , (req , res, next)=> {
    db.getDeck((err, deckresult)=> {
        if(err){
            return next(err);
        }
        res.send(deckresult);
    });
});

deck.post('/' , (req , res)=>{
    // console.log(req.body);
    db.createDeck(req.body, (err, createdDeck)=>{
        if (err){
            res.send(err);
        }
        res.send(createdDeck)
    })

});

deck.delete('/:id' , (req , res)=>{
    db.deleteUser(req.params.id, (err, deletedUser)=>{
        if (err){
            res.send(err);
        }
        res.send(deletedUser)
    })
});

deck.put('/:id' , (req , res)=>{
    db.updateUser(req.body, req.params.id, (err, updatedUser)=>{
        if (err){
            res.send(err);
        }
        res.send(updatedUser)
    })
});

module.exports = deck;
