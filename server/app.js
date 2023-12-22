const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
app.use(cookieParser()) ;



//dotenv is used to secure your connection password when it pushed into github
dotenv.config({path:'./config.env'});

require('./db/conn');

app.use(express.json()); //to convert tha data type into json

//we link the router files to make our route easy
app.use(require('./router/auth'));


const PORT = process.env.PORT;

//Middleware :- it checks whether the user is login or not before redirecting any pages its like a barrier



//Routes
// app.get('/', (req,res) => {
//     res.send('Helloo world from the server');
// });
// app.get('/profile', middleware, (req,res) => {
// res.send('im your profile')
// });
// app.get('/signin', (req,res) => {
//     //res.cookie("Test", 'sunita')
//     res.send('helloo im a signin')
// });
// app.get('/signup', (req,res) => {
//     res.send('helloo im a signup')
// })

//PORT


app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`)
})