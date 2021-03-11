const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());


const chats = [];
const proper = /^[\w :]+$/;
const PAGESIZE = 100;

app.post('/', (req, res) => {
    if (proper.test(req.body.msg) && proper.test(req.body.user)) {
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

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})