const port = 3000
const express = require('express');
const conn = require('./models/index')
const app = express();
const db = require("./models")
const addUser = require('./routes/userRoutes/addUser')
app.use(express.json());

app.use('/add',addUser)


// app.post('/user', (req, res)=>{
//     db.users.create({name:'abc', email:'asbsd'});
//     res.send();
// })

app.listen(port,()=>{
    console.log(`listing at http://localhost:${port}`);
})



