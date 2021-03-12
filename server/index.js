const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const databaseCalls = require('./databaseCalls');
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header({
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': true,
    });
    next();
})

const proper = /^[\w :]+$/;
const PAGESIZE = 100;
const MAXCHATLENGTH = 140;
const MAXUSERLENGTH = 20;

let chats = [];

app.post('/', async(req, res) => {
    if (proper.test(req.body.msg) && proper.test(req.body.user) && req.body.msg.length < MAXCHATLENGTH && (!req.body.user || req.body.user.length < MAXUSERLENGTH)) {
        const chat = { time: new Date().getTime(), user: req.body.user, msg: req.body.msg };
        // console.log(req.headers['x-forwarded-for'] || req.connection.remoteAddress);
        console.log(chat);
        databaseCalls.addChat(chat);
    }
});

app.get('/', async(req, res) => {
    const page = req.query.page || 1;
    res.send({
        chats: chats.length >= page * PAGESIZE ? chats.slice(chats.length - page * PAGESIZE) : chats,
        page: Math.min(page, Math.ceil(chats.length / PAGESIZE))
    });

    chats = await databaseCalls.allChats();
});

// const port = 8192
// app.listen(port, () => {
//     console.log("Server listening on port: " + port);
// });

module.exports.handler = serverless(app);