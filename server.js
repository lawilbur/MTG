const express = require('express');
const app = express();


app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}))

const userController = require('./controllers/users.js');
app.use('/user' , userController);




const port = 3000;
app.listen(port , ()=>{
    console.log('Listening');
})