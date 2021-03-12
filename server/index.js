const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

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

// app.listen(port, () => {
//     console.log("Server listening on port: " + port);
// });

module.exports.handler = serverless(app);