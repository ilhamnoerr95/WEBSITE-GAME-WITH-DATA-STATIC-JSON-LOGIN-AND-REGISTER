const express = require('express');
const expressLayout = require("express-ejs-layouts");
const fs = require('fs')
const chalk = require("chalk");
// const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
// const bcrypt = require('bcrypt')

const app = express();

const readJson = fs.readFileSync('./data/user.json')
let data = JSON.parse(readJson);

//load env vars
dotenv.config({
    path: './config/config.env'
})

//Dev loggin middleware 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//bodyparser
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

//static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))


app.use(expressLayout);
//template view engine
app.set("layout", "./layouts/masterhomepage.ejs")
app.set("views", "./views")
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/game', (req, res) => {
    res.render('games')
})
app.get('/signup', (req, res) => {
    //BUAT REQUEST QUERY NOTIF
    let status = req.query.notif;
    res.render('register', {
        notif: status
    })
})

app.post('/signup', (req, res) => {
    // let data = JSON.parse(fs.readFileSync(__dirname + '/data/user.json'))
    // {name,email,password} = req.body; 
    //* CARA SATU
    // let dataUser = fs.readFileSync(__dirname + '/data/user.json')
    // let userLogin = JSON.parse(dataUser)
    // let regisData = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // }

    // userLogin.push(regisData)
    // dataregisJson = JSON.stringify(userLogin, null, 4)
    // fs.writeFileSync(__dirname + "/data/user.json", dataregisJson)

    //* CARA 2
    const {name,email,password} = req.body;

    data.push({
        ID: data.length+1,
        name: name,
        email: email,
        password: password
    })

    //WRITE A NEW DATA FROM FORM REGISTER DATA LALU DIUBAH MENUJU KE JSON
    fs.writeFileSync('./data/user.json', JSON.stringify(data, null, 4))
    res.redirect("/signup?notif=berhasildisimpan")
})

app.get('/login', (req, res) => {
    let status = req.query.notif
    res.render('login',
    {
        notif: status
    })
})

app.post('/login', (req, res) => {
    const {email,password} = req.body

    //*Cara 2
    // let emailUser = req.body.email;
    // let passwordUser = req.body.password;
    // let userData = fs.readFileSync('./data/user.json')
    // let dataUser = JSON.parse(userData)
    // let dataUser = JSON.parse(fs.readFileSync(__dirname + '/data/user.json'))
    // for (let i= 0; i< data.length+1; i++){
    //     let datauserLogin = data[i];
    //     if (email === datauserLogin.email && password === datauserLogin.password) {
    //         console.log('masuk')
    //         res.redirect("/game")
    //     } 
    // }
    // if (dataUser.email != email && dataUser.password != password ){
        //         res.render("login", {
        //             status: "fail"
        //         })
        //     }
  data.forEach(datas=> {
    
    if(datas.email == email &&  datas.password == password){
        console.log(datas);
        res.redirect('/game')
    } 
  });

  if (data.email != email && data.password != password ){
    res.redirect("/login?notif=dataSalah")

    console.log(chalk.red('Email & Password Invalid!'))
}
})

// end point if server has dont have the requested end point
app.use((req, res, next) => {
    res.status(404).render("error", {
        headTitle: "Not Found!",
        title: "404 Not Found",
        subtitle: "Go To Main Page",
        location: "/"
    });
    next()
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(chalk.keyword('orange')(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))
})
