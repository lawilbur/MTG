const { Client } = require('pg');

const client = new Client(process.env.DATABASE_URL || 'postgresql://localhost:5432/mtg');


const connect = () =>{
    client.connect((err)=> {
        if(!err){ //this should be removed
            client.query('Select * From users;', (err , res)=>{
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

const getUser = (body, cd) =>{
    // console.log(body);
    client.query('Select * From users Where username = $1;',[body.username], (err , res)=> {
        if(err){
            return cd(err);
        } else if (res.rowCount === 0){
            cd(null, null)
        }else {
            // console.log(res);
            cd(null, res.rows)
        }
    });
}

const createUser = (body, cd) =>{
    // console.log(body.username);
    client.query("Insert Into users (username, password) Values ($1, $2) Returning id, username, password;",[body.username, body.password], (err , res)=> {
        if(err){
            return cd(err);
        }
        // console.log(res);
        cd(null, res.rows)

    });
}

const updateUser = (body, id, cd) =>{
    // console.log(id);
    client.query("Update users Set username=$1, password=$2 Where id=$3 Returning id, username, password;",[body.username, body.password, id], (err , res)=> {
        if(err){
            return cd(err);
        }
        // console.log(res);
        cd(null, res.rows)

    });
}

const deleteUser = (id, cd) =>{
    // console.log(id);
    client.query("Delete From users Where id = $1;",[id], (err , res)=> {
        if(err){
            return cd(err);
        }else {
            // console.log(res.rows);
            cd(null, {deleted: true})
        }
    });
}

module.exports = {connect, getUser, createUser, deleteUser, updateUser};
