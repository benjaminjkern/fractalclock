let chats = [];

const anonymous = `<span style="color:darkgray"> (Anonymous) </span>`;

const specials = {
    ":coffee:": `<img src="https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG" class="chatImage"/>`,
    "crowdventure": `<a href="http://crowdventure.me/">crowdventure</a>`,
    ":love:": `<img src="https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2018/04/whatislove-960x640.jpg" class="chatImage"/>`,
    "josh": `<span style="color: red">chad</span>`,
    "ben": `<span style="color: red">chad</span>`,
    "dom": `<span style="color: red">chad</span>`,
    "evan": `<span style="color: red">chad</span>`,
    "soph": `<span style="color: red">chad</span>`,
    "diego": `<span style="color: red">chad</span>`,
    "marissa": `<span style="color: red">chad</span>`,
    "herb": `<span style="color: red">chad</span>`,
    "andrew": `<span style="color: red">chad</span>`,
    ":dylan:": `<img src="data:image/jpeg;base64,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" class="chatImage"/>`,
    "wally": `<span style="color: blue; text-shadow: 5px 5px white;">thad</span>`,
    "__": `<i>`,
    "**": `<b>`

}

const url = 'https://4r52fybt27.execute-api.us-east-1.amazonaws.com/dev/';
const maxChatLength = 140;
const maxUserLength = 20;

$(document).ready(function() {
    handleButtons();
    receiveChats();
});

let hasNewPage = false;

const receiveChats = () => {
    let keepTrying = true;

    let page = 1;
    let newPage = false;

    const chatBox = document.getElementById('chatBox');

    const checkChats = () => {
        // alert("Checking for chats");
        fetch(url + '?page=' + page)
            .then(response =>
                response.json()
            )
            .then(data => {
                chats = data.chats;
                if (page > data.page) {
                    page = data.page;
                    hasNewPage = false;
                } else if (newPage) {
                    page++;
                    newPage = false;
                    hasNewPage = true;
                }
                drawChat();
            }).catch(() => {
                keepTrying = false;
            });
        if (keepTrying) setTimeout(checkChats, 1000);
    };

    chatBox.onscroll = function() {
        console.log(chatBox.offsetHeight);
        if (chatBox.scrollTop <= 0 && chatBox.scrollHeight > chatBox.offsetHeight) {
            newPage = true;
        }
    }
    setTimeout(() => chatBox.scrollTop = chatBox.scrollHeight - chatBox.offsetHeight, 1000);

    checkChats();
}

let verified = 0;

const diff = (A, B) => {
    if (A.length === 0) return [];
    if (B.length === 0) return A;
    if (A[0].msg === B[0].msg) return diff(A.slice(1), B.slice(1));
    return [A[0], ...diff(A.slice(1), B)];
}

let last = "";

const emoji = /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+$/;

const chatRegex = /^[\w :]+$/;


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
    if (message.slice(0, string.length).toLowerCase() === string.toLowerCase()) return [i, ...findAll(message.slice(string.length), string, i + string.length)];
    return findAll(message.slice(1), string, i + 1);
}

const sendChat = (user, message) => {
    if (message.length > 0) {
        if (message.length > maxChatLength) {
            alert("Chats must be less than " + maxChatLength + " characters long!");
            return;
        }
        const newChat = {};
        if (user) newChat.user = user;
        newChat.msg = message.replace(/</g, "&lt;");
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newChat)
        });
        chats.push(newChat);

        drawChat();

        last = document.getElementById('text').value;
        document.getElementById('text').value = '';
        const chatBox = document.getElementById('text');
        setTimeout(() => chatBox.scrollTop = chatBox.scrollHeight - chatBox.offsetHeight, 500);
        receiveChats();
    }
}

let oldHeight = 0;

const drawChat = () => {
    if (chats.length === 0) return;
    const chatBox = document.getElementById('chatBox');

    const isAtBottom = chatBox.scrollTop >= chatBox.scrollHeight - chatBox.offsetHeight;
    chatBox.innerHTML = chats.map(({ user, msg }) => `<div style="padding-left: 1.5em;text-indent:-1.5em; padding-bottom: 0.5em;" class="message">${user || anonymous} > <span style="color:lightgray;">${replaceSpecials(msg)}</span></div>`).join("");

    if (isAtBottom) chatBox.scrollTop = chatBox.scrollHeight - chatBox.offsetHeight;
    else if (hasNewPage) {
        // alert('newpage');

        oldHeight = chatBox.scrollHeight;
        setTimeout(() => {
            chatBox.scrollTop += chatBox.scrollHeight - oldHeight - 100;
        }, 1000);
        hasNewPage = false;
    }
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
        if (closeButton.style.opacity === '1') setChatState(false);
    }

    closeButton.ontouchstart = closeButton.onmousedown;
    closeButton.ontouchend = closeButton.onmouseup;

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
        sendChat(undefined, document.getElementById('text').value);
    }


    sendButton.ontouchstart = sendButton.onmousedown;
    sendButton.ontouchend = sendButton.onmouseup;

    window.onkeydown = function(e) {
        if (e.key === 'Enter' && window.chatOpen && document.getElementById('text') == document.activeElement) {
            sendChat(undefined, document.getElementById('text').value);
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


    chatOpenButton.ontouchstart = chatOpenButton.onmousedown;
    chatOpenButton.ontouchend = chatOpenButton.onmouseup;

    const wait = 1000;

    window.onmousedown = function() {
        mouseEvent();
    }

    window.onmousemove = function(e) {
        mouseEvent();

        if (e.x < canvas.width / 4 && e.y < canvas.height / 2 && (!window.chatOpen || !window.phoneScreen)) {
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
            chatOpenButton.style.right = window.phoneScreen ? "100%" : "20%";
            chatOpenButton.innerHTML = "&gt;";
            document.getElementById("chat").style.height = canvas.height + "px";
            document.getElementById('chat').style.opacity = "1";
            if (!window.phoneScreen) document.getElementById('text').focus();
            else document.getElementById('chatBox').focus();
        } else {
            chatOpenButton.style.right = "0";
            chatOpenButton.innerHTML = "&lt;";
            document.getElementById('chat').style.opacity = "0";
            document.getElementById('text').blur();
        }
        window.chatOpen = state;
    }
}