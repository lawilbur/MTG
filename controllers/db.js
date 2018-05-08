const { Client } = require('pg');

const client = new Client({
  user: 'lawilbur',
  host: 'localhost',
  database: 'mtg',
  port: 5432,
})

const connect = () =>{
    client.connect((err)=> {
        if(!err){
            client.query('Select * From users;', (err , res)=>{
                if(err){
                    console.log(err);
                }
                else {
                    console.log(res.rows);
                }

            })
        }else {
            console.log(err);
        }
    })
}

const getUsers = (cd) =>{
    client.query('Select * From users;', (err , res)=> {
        if(err){
            return cd(err);
        }else {
            cd(null, res.rows)
        }
    });
}

const createUser = (body, cd) =>{
    // console.log(body.username);
    client.query("Insert Into users (username, password) Values ($1, $2);",[body.username, body.password], (err , res)=> {
        if(err){
            return cd(err);
        }
        // console.log(res);
        cd(null, res.rows)

    });
}

const deleteUser = (id, cd) =>{
    console.log(id);
    client.query("Delete From users Where id = $1;",[id], (err , res)=> {
        if(err){
            return cd(err);
        }else {
            // console.log(res.rows);
            cd(null, res.rows)
        }
    });
}

module.exports = {connect, getUsers, createUser, deleteUser};
