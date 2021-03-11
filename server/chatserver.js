const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 8192;


const key = fs.readFileSync(__dirname + '/../certs/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/../certs/selfsigned.crt');
const options = {
    key,
    cert
};


app.use(cors());
app.use(express.json());


const chats = [];
const proper = /^[\w :]+$/;
const PAGESIZE = 100;
const MAXCHATLENGTH = 140;
const MAXUSERLENGTH = 20;

app.post('/', (req, res) => {
    if (proper.test(req.body.msg) && proper.test(req.body.user) && req.body.msg.length < MAXCHATLENGTH && (!req.body.user || req.body.user.length < MAXUSERLENGTH)) {
        const message = { time: new Date().getTime(), user: req.body.user, msg: req.body.msg };
        chats.push(message);
        // console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        console.log(message);
    }
})

app.get('/', (req, res) => {
    const page = req.query.page || 1;
    res.send({
        chats: chats.length >= page * PAGESIZE ? chats.slice(chats.length - page * PAGESIZE) : chats,
        page: Math.min(page, Math.ceil(chats.length / PAGESIZE))
    });
});

https.createServer(options, app).listen(port, () => {
    console.log("Server listening on port: " + port)
});