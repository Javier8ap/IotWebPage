const express = require('express');
const app = express();
const randomize = require('randomatic'); //Numeros aleatorios
const fs = require('fs');
const port = process.env.PORT ||3000;

let users = JSON.parse(fs.readFileSync('users.json'));

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.send('Iot Camarones WebPage');
})

//Login
//2 Login
app.post('/api/login', (req,res) =>{

    console.log(users.json);
    const validUser = users.find( e => e.email === req.body.email &&  e.password === req.body.password);
    

    if(!(validUser)){
        res.status(401).send("Error");
    }else{
        if(validUser.token)
            res.status('200').send(`Welcome back ${validUser.email}, here is your token ${validUser.token}`);
        else{
            const token = randomize('Aa0','10')+"-"+validUser.id;
            res.status('200').send(`Welcome! ${validUser.email}, here is your new token: ${token}`);
            var index = users.indexOf(validUser);
            users[index].token = token;
            fs.writeFileSync('users.json',JSON.stringify(users));
        }      
    }

});



const server = app.listen(port, () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });