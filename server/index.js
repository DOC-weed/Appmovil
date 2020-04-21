const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const { mongoose} = require('./database');

//Settings
app.set('port', process.env.PORT || 3000);

//Middleswares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:8100'}));
// app.use((req, res, next)=>
// {
//    /* Allow access from any requesting client */
//    res.setHeader('Access-Control-Allow-Origin', '*');

//    /* Allow access for any of the following Http request types */
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

//    /* Set the Http request header */
//    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//     next();
// });

//Routes
app.use('/users',require('./routes/users.routes'));
app.use('/courses',require('./routes/courses.routes'));
app.use('/homeworks',require('./routes/homeworks.routes'));


app.listen(3000, ()=> {
    console.log("Server On Port ", app.get('port'))
});
