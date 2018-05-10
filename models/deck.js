const { Client } = require('pg');

const client = new Client({
  user: 'lawilbur',
  host: 'localhost',
  database: 'mtg',
  port: 5432,
})

const connect = () =>{
    client.connect((err)=> {
        if(!err){ //this should be removed
            client.query('Select * From decks;', (err , res)=>{
                if(err){
                    console.log(err);
                }
                else {
                    // console.log(res.rows);
                }

            })
        }else {
            console.log(err);
        }
    })
}

const getDeck = (cd) =>{
    client.query('Select * From decks2;', (err , res)=> {
        if(err){
            return cd(err);
        }else {
            cd(null, res.rows)
        }
    });
}

const createDeck = (body, cd) =>{
    console.log(body.cards);
    client.query("Insert Into decks2 (name, user_id, cards) Values ($1, $2, $3) Returning id, name, user_id, cards;",[body.name, body.user_id, body.cards], (err , res)=> {
        if(err){
            return cd(err);
        }
        // console.log(res);
        cd(null, res.rows)

    });
}

const updateDeck = (body, id, cd) =>{
    // console.log(id);
    client.query("Update decks2 Set name=$1, user_id=$2, cards=$3 Where id=$4 Returning id, name, user_id, cards;",[body.name, body.user_id, body.cards, id], (err , res)=> {
        if(err){
            return cd(err);
        }
        // console.log(res);
        cd(null, res.rows)

    });
}

const deleteDeck = (id, cd) =>{
    // console.log(id);
    client.query("Delete From decks2 Where id = $1;",[id], (err , res)=> {
        if(err){
            return cd(err);
        }else {
            // console.log(res.rows);
            cd(null, {deleted: true})
        }
    });
}

module.exports = {connect, getDeck, createDeck, deleteDeck, updateDeck};
