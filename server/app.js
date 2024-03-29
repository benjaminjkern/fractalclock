const express = require("express");
const cors = require("cors");
const databaseCalls = require("./databaseCalls");
const app = express();

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
    });
    next();
});

const PAGESIZE = 100;
const MAX_CHAT_LENGTH = 140;
const MAX_USER_LENGTH = 20;

app.post("/", async (req, res) => {
    if (req.body.msg.length >= MAX_CHAT_LENGTH)
        return res
            .status(400)
            .send(`Messages must be less than ${MAX_CHAT_LENGTH} characters!`);
    if (req.body.user && req.body.user.length >= MAX_USER_LENGTH)
        return res
            .status(400)
            .send(`User name must be less than ${MAX_CHAT_LENGTH} characters!`);

    const chat = {
        time: new Date().getTime(),
        user: req.body.user,
        msg: req.body.msg,
        clientId: req.body.clientId,
    };
    databaseCalls.addChat(chat);
    res.send(chat);
});

app.get("/", async (req, res) => {
    let page = +req.query.page || 1;
    let since = +req.query.since;
    let chats = await databaseCalls.allChats();
    if (since) chats = chats.filter((chat) => chat.time > since);

    chats.sort((a, b) => a.time - b.time);

    page = Math.min(page, Math.ceil(chats.length / PAGESIZE));
    res.send({
        chats: chats.slice(
            Math.max(0, chats.length - page * PAGESIZE),
            Math.max(0, chats.length - (page - 1) * PAGESIZE)
        ),
        page,
    });
});

module.exports = app;
