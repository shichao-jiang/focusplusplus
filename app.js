const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const lowDB = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
//const modelData = require('./tfjsmodel');
var bodyParser=require("body-parser");

var urls = '';

const userData = lowDB(new FileSync('userData.json'))
userData.defaults({data: []}).write();

const urlSent = lowDB(new FileSync('url.json'))
urlSent.defaults({url: []}).write();


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   next();
});

app.use(express.json())

app.use('/static', express.static('tfbook'));
app.use('/fd', express.static('tfphone'));



app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/history", (req, res) => {
    res.send(userData);
})

app.get("/lastpomo", (req, res) => {
    let allData = userData.get("data").value();
    let lastPomoID = allData.length - 1;
    let lastPomoData = allData[lastPomoID];
    res.send(lastPomoData);
})

// app.get("/model", (req, res) => {
//     res.send(modelData);
// })

app.post('/update', (req, res) => {
    let pp = req.body;
    res.send(pp);
    userData.get("data").push(pp).write();

})

app.post('/url', (req, res) => {//edit
    let pp = req.body.url;
    res.send(pp);
    urls = pp;
   // console.log(urls);
    urlSent.get("url").push(pp).write();

})

app.get("/url", (req, res) => {
    // let urlData = urlSent.get("url").value();
    // let lastURL = urlSent.length - 1;
    // let latestURL = urlData[lastURL];
    console.log(urls);
    res.send(urls);
    
})