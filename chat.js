let chats = [];

const defaultAccount = `<span style="color:darkgray"> (Anonymous) </span>`;
const maxChat = 100;

$(document).ready(function() {

    handleButtons();

});

let last = "";

const emoji = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+$/;

const chatRegex = /^[\w :]+$/;

const specials = {
    ":coffee:": `<img src="https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG" class="chatImage"/>`
}

const replaceSpecials = (message) => {
    const replaceSet = {};
    for (let string of Object.keys(specials)) {
        for (let index of findAll(message, string)) {
            replaceSet[index] = [index, string.length, specials[string]];
        }
    }
    for (let replacement of Object.keys(replaceSet).map(index => replaceSet[index]).sort((a, b) => b[0] - a[0])) {
        message = message.slice(0, replacement[0]) + replacement[2] + message.slice(replacement[0] + replacement[1]);

    }
    return message;
}

const findAll = (message, string, i = 0) => {
    if (string.length > message.length) return [];
    if (message.slice(0, string.length) === string) return [i, ...findAll(message.slice(string.length), string, i + string.length)];
    return findAll(message.slice(1), string, i + 1);
}

const sendChat = (account, message) => {
    if (message.length > 0) {
        if (chatRegex.test(message) || emoji.test(message)) {
            chats.push(`${account} > <span style="color:lightgray;">${replaceSpecials(message)}</span>`);
            if (chats.length > maxChat) chats = chats.slice(maxChat);

            drawChat();
        } else {
            alert("Chats can only contain alphanumeric characters and spaces! Sorry!");
        }

        last = document.getElementById('text').value;
        document.getElementById('text').value = '';
    }
}

const drawChat = () => {
    const chatBox = document.getElementById('chatBox');
    const isAtBottom = chatBox.scrollTop === (chatBox.scrollHeight - chatBox.offsetHeight)
    chatBox.innerHTML = chats.map(chat => `<div style="padding-left: 1.5em;text-indent:-1.5em; padding-bottom: 0.5em;" class="message">${chat}</div>`).join("");
    if (isAtBottom) chatBox.scrollTop = chatBox.scrollHeight - chatBox.offsetHeight;
}

const handleButtons = () => {
    window.chatOpen = false;
    let timeSinceMove = null;

    const closeButton = document.getElementById('closeChat');

    closeButton.onmouseover = function() {
        closeButton.style.backgroundColor = "#bb000077";
    }
    closeButton.onmouseout = function() {
        closeButton.style.backgroundColor = "#ff000077";
    }
    closeButton.onmousedown = function() {
        closeButton.style.backgroundColor = "#99000077";
    }
    closeButton.onmouseup = function() {
        closeButton.style.backgroundColor = "#bb000077";
        setChatState(false);
    }

    const sendButton = document.getElementById('send');

    sendButton.onmouseover = function() {
        sendButton.style.backgroundColor = "#bbbbbb";
    }
    sendButton.onmouseout = function() {
        sendButton.style.backgroundColor = "#ffffff";
    }
    sendButton.onmousedown = function() {
        sendButton.style.backgroundColor = "#999999";
    }
    sendButton.onmouseup = function() {
        sendButton.style.backgroundColor = "#bbbbbb";
        sendChat(defaultAccount, document.getElementById('text').value);
    }

    window.onkeydown = function(e) {
        if (e.key === 'Enter' && window.chatOpen && document.getElementById('text') == document.activeElement) {
            sendChat(defaultAccount, document.getElementById('text').value);
            sendButton.style.backgroundColor = "#999999";
        }
        if (e.key === 'ArrowLeft' && window.chatOpen && document.getElementById('text').selectionStart === 0) {
            setChatState(false);
        }
        if (e.key === 'ArrowUp' && window.chatOpen) {
            document.getElementById('text').value = last;
            document.getElementById('text').selectionStart = last.length;
        }
        if (e.key === 'ArrowRight' && !window.chatOpen) {
            document.getElementById('text').selectionStart = document.getElementById('text').value.length;
            setChatState(true);
        }
    }

    window.onkeyup = function(e) {
        if (e.key === 'Enter') {
            sendButton.style.backgroundColor = "#ffffff";
        }
    }

    const chatOpenButton = document.getElementById('openChat');

    chatOpenButton.onmouseover = function() {
        chatOpenButton.style.backgroundColor = "#00000066";
    }
    chatOpenButton.onmouseout = function() {
        chatOpenButton.style.backgroundColor = "#00000033";
    }
    chatOpenButton.onmousedown = function() {
        chatOpenButton.style.backgroundColor = "#00000099";
    }
    chatOpenButton.onmouseup = function() {
        chatOpenButton.style.backgroundColor = "#00000033";
        setChatState(!window.chatOpen);
    }

    const wait = 1000;

    window.onmousedown = function() {
        mouseEvent();
    }

    window.onmousemove = function(e) {
        mouseEvent();

        if (e.x < canvas.width / 4 && e.y < canvas.height / 4 && (!window.chatOpen || !window.phoneScreen)) {
            document.getElementById('controls').style.opacity = "1";
        } else {
            document.getElementById('controls').style.opacity = "0";
        }
    }

    window.onmouseout = function(e) {
        if (!window.chatOpen && !window.phoneScreen && (e.x > window.innerWidth || e.x < 0 || e.y > window.innerHeight || e.y < 0)) chatOpenButton.style.opacity = "0";
    };

    const mouseEvent = () => {
        timeSinceMove = new Date().getTime();
        if (!window.chatOpen || window.phoneScreen) chatOpenButton.style.opacity = "1";
        setTimeout(() => {
            if (new Date().getTime() - timeSinceMove > wait && chatOpenButton.style.backgroundColor === "rgba(0, 0, 0, 0.2)" && !window.chatOpen && !window.phoneScreen) {
                chatOpenButton.style.opacity = "0";
            }
        }, wait);
    }

    const setChatState = (state) => {
        mouseEvent();
        if (state) {
            document.getElementById("closeChat").style.opacity = window.phoneScreen ? "1" : "0";
            chatOpenButton.style.opacity = window.phoneScreen ? "0" : "1";
            chatOpenButton.style.right = "20%";
            chatOpenButton.innerHTML = "&gt;";
            document.getElementById("chat").style.height = canvas.height + "px";
            document.getElementById('chat').style.opacity = "1";
            if (!window.phoneScreen) document.getElementById('text').focus();
        } else {
            chatOpenButton.style.right = "0";
            chatOpenButton.innerHTML = "&lt;";
            document.getElementById('chat').style.opacity = "0";
            document.getElementById('text').blur();
        }
        window.chatOpen = state;
    }
}