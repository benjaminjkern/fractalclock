import React, { useRef, useState } from "react";
import { findAll } from "./utils/stringUtils";
import ChatOpenButton from "./Chat/ChatOpenButton";
import ChatCloseButton from "./ChatCloseButton";

const ANONYMOUS = `<span style="color:darkgray"> (Anonymous) </span>`;

const SPECIALS = {
    ":coffee:": `<img src="https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG" class="chatImage"/>`,
    crowdventure: `<a href="http://crowdventure.me/">crowdventure</a>`,
    ":love:": `<img src="https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2018/04/whatislove-960x640.jpg" class="chatImage"/>`,
    josh: `<span style="color: red">chad</span>`,
    ben: `<span style="color: red">chad</span>`,
    dom: `<span style="color: red">chad</span>`,
    evan: `<span style="color: red">chad</span>`,
    soph: `<span style="color: red">chad</span>`,
    diego: `<span style="color: red">chad</span>`,
    marissa: `<span style="color: red">chad</span>`,
    herb: `<span style="color: red">chad</span>`,
    andrew: `<span style="color: red">chad</span>`,
    ":dylan:": `<img src="https://resizing.flixster.com/Gc8BERNydw7dUYBPSG0-BFNk5SA=/506x652/v2/https://flxt.tmsimg.com/v9/AllPhotos/166890/166890_v9_bb.jpg" class="chatImage"/>`,
    wally: `<span style="color: blue; text-shadow: 5px 5px white;">thad</span>`,
};

const API_URL = "https://4r52fybt27.execute-api.us-east-1.amazonaws.com/dev/";
const MAX_CHAT_LENGTH = 140;
const MAX_USER_LENGTH = 20;

const replaceSpecials = (message) => {
    const replaceSet = {};
    for (let string of Object.keys(SPECIALS)) {
        for (let index of findAll(message, string)) {
            replaceSet[index] = [index, string.length, SPECIALS[string]];
        }
    }
    // Should replace in order of importance
    for (let replacement of Object.keys(replaceSet)
        .map((index) => replaceSet[index])
        .sort((a, b) => b[0] - a[0])) {
        message =
            message.slice(0, replacement[0]) +
            replacement[2] +
            message.slice(replacement[0] + replacement[1]);
    }
    return message;
};

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [chatOpen, setChatOpen] = useState(false);
    /*
    .message {
        width: calc(100% - 20px);
    }

    .chatImage {
        width: calc(100% - 1.5em);
    }
    */

    // const handleButtons = () => {

    //     const sendButton = document.getElementById("send");

    //     sendButton.onmouseover = function () {
    //         sendButton.style.backgroundColor = "#bbbbbb";
    //     };
    //     sendButton.onmouseout = function () {
    //         sendButton.style.backgroundColor = "#ffffff";
    //     };
    //     sendButton.onmousedown = function () {
    //         sendButton.style.backgroundColor = "#999999";
    //     };
    //     sendButton.onmouseup = function () {
    //         sendButton.style.backgroundColor = "#bbbbbb";
    //         sendChat(undefined, document.getElementById("text").value);
    //     };

    //     sendButton.ontouchstart = sendButton.onmousedown;
    //     sendButton.ontouchend = sendButton.onmouseup;

    //     window.onkeydown = function (e) {
    //         if (
    //             e.key === "Enter" &&
    //             window.chatOpen &&
    //             document.getElementById("text") == document.activeElement
    //         ) {
    //             sendChat(undefined, document.getElementById("text").value);
    //             sendButton.style.backgroundColor = "#999999";
    //         }
    //         if (
    //             e.key === "ArrowLeft" &&
    //             window.chatOpen &&
    //             document.getElementById("text").selectionStart === 0
    //         ) {
    //             setChatState(false);
    //         }
    //         if (e.key === "ArrowUp" && window.chatOpen) {
    //             document.getElementById("text").value = last;
    //             document.getElementById("text").selectionStart = last.length;
    //         }
    //         if (e.key === "ArrowRight" && !window.chatOpen) {
    //             document.getElementById("text").selectionStart =
    //                 document.getElementById("text").value.length;
    //             setChatState(true);
    //         }
    //     };

    //     window.onkeyup = function (e) {
    //         if (e.key === "Enter") {
    //             sendButton.style.backgroundColor = "#ffffff";
    //         }
    //     };

    // };

    const chatTextRef = useRef();
    return (
        <>
            <div
                id="chat"
                style={{
                    position: "absolute",
                    height: "100vh",
                    width: "20%",
                    right: 0,
                    backgroundColor: "#00000033",
                    opacity: 0,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "max(40px, 2em)",
                        backgroundColor: "#00000033",
                        textAlign: "center",
                        lineHeight: "max(40px, 2em)",
                    }}
                >
                    Chat
                    <ChatCloseButton setChatOpen={setChatOpen} />
                </div>
                <div
                    id="chatBox"
                    style={{
                        overflowY: "scroll",
                        overflowX: "hidden",
                        height: "calc(100% - max(110px, 5.5em))",
                        width: "calc(100% - max(20px, 1em))",
                        position: "absolute",
                        top: "max(50px, 2.5em)",
                        left: "max(10px, 0.5em)",
                    }}
                >
                    <div
                        style={{
                            color: "darkgrey",
                            lineHeight: "calc(100vh - max(120px, 6em))",
                            textAlign: "center",
                        }}
                    >
                        There are no chats!
                    </div>
                </div>
                <div
                    style={{
                        position: "absolute",
                        width: "calc(100% - max(20px, 1em))",
                        height: "max(40px, 2em)",
                        bottom: "max(10px, 0.5em)",
                        left: "max(10px,0.5em)",
                        backgroundColor: "#00000033",
                        borderRadius: "max(20px, 1em)",
                    }}
                >
                    <input
                        style={{
                            border: "none",
                            height: "max(30px, 1.5em)",
                            fontSize: "1em",
                            outline: "none",
                            backgroundColor: "#00000000",
                            marginTop: "max(5px, 0.25em)",
                            marginLeft: "max(10px, 0.5em)",
                            width: "calc(100% - max(50px, 2.5em))",
                            color: "white",
                        }}
                        placeholder="Type a message"
                    />
                    <div
                        onClick={() => {}}
                        style={{
                            position: "absolute",
                            width: "max(30px, 1.5em)",
                            height: "max(30px, 1.5em)",
                            right: "max(5px, 0.25em)",
                            top: "max(5px, 0.25em)",
                            borderRadius: "max(15px, 0.75em)",
                            backgroundColor: "#fff",
                            color: "#000",
                            lineHeight: "max(30px, 1.5em)",
                            textAlign: "center",
                            userSelect: "none",
                        }}
                    >
                        &gt;
                    </div>
                </div>
            </div>
            <ChatOpenButton
                setChatOpen={(open) => {
                    setChatOpen(open);
                    if (open) chatTextRef.current.focus();
                    else chatTextRef.current.blur();
                }}
            />
        </>
    );
};

export default Chat;

/**
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

// $(document).ready(function () {
//     handleButtons();
//     receiveChats();
// });

// let hasNewPage = false;

// const receiveChats = () => {
//     let keepTrying = true;

//     let page = 1;
//     let newPage = false;

//     const chatBox = document.getElementById("chatBox");

//     const checkChats = () => {
//         // alert("Checking for chats");
//         fetch(url + "?page=" + page)
//             .then((response) => response.json())
//             .then((data) => {
//                 chats = data.chats;
//                 if (page > data.page) {
//                     page = data.page;
//                     hasNewPage = false;
//                 } else if (newPage) {
//                     page++;
//                     newPage = false;
//                     hasNewPage = true;
//                 }
//                 drawChat();
//             })
//             .catch(() => {
//                 keepTrying = false;
//             });
//         if (keepTrying) setTimeout(checkChats, 1000);
//         else setTimeout(checkChats, 10000);
//     };

//     chatBox.onscroll = function () {
//         if (
//             chatBox.scrollTop <= 0 &&
//             chatBox.scrollHeight > chatBox.offsetHeight
//         ) {
//             newPage = true;
//         }
//     };
//     setTimeout(
//         () => (chatBox.scrollTop = chatBox.scrollHeight - chatBox.offsetHeight),
//         1000
//     );

//     checkChats();
// };

// let verified = 0;

// const diff = (A, B) => {
//     if (A.length === 0) return [];
//     if (B.length === 0) return A;
//     if (A[0].msg === B[0].msg) return diff(A.slice(1), B.slice(1));
//     return [A[0], ...diff(A.slice(1), B)];
// };

// let last = "";

// const emoji =
//     /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+$/;

// const chatRegex = /^[\w :]+$/;

// const sendChat = (user, message) => {
//     if (message.length > 0) {
//         if (message.length > maxChatLength) {
//             alert(
//                 "Chats must be less than " + maxChatLength + " characters long!"
//             );
//             return;
//         }
//         const newChat = {};
//         if (user) newChat.user = user;
//         newChat.msg = message.replace(/</g, "&lt;");
//         fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newChat),
//         });
//         chats.push(newChat);

//         drawChat();

//         last = document.getElementById("text").value;
//         document.getElementById("text").value = "";
//         const chatBox = document.getElementById("text");
//         setTimeout(
//             () =>
//                 (chatBox.scrollTop =
//                     chatBox.scrollHeight - chatBox.offsetHeight),
//             500
//         );
//         receiveChats();
//     }
// };

// let oldHeight = 0;

// const drawChat = () => {
//     if (chats.length === 0) return;
//     const chatBox = document.getElementById("chatBox");

//     const isAtBottom =
//         chatBox.scrollTop >= chatBox.scrollHeight - chatBox.offsetHeight;
//     chatBox.innerHTML = chats
//         .map(
//             ({ user, msg }) =>
//                 `<div style="padding-left: 1.5em;text-indent:-1.5em; padding-bottom: 0.5em;" class="message">${
//                     user || anonymous
//                 } > <span style="color:lightgray;">${replaceSpecials(
//                     msg
//                 )}</span></div>`
//         )
//         .join("");

//     if (isAtBottom)
//         chatBox.scrollTop = chatBox.scrollHeight - chatBox.offsetHeight;
//     else if (hasNewPage) {
//         // alert('newpage');

//         oldHeight = chatBox.scrollHeight;
//         setTimeout(() => {
//             chatBox.scrollTop += chatBox.scrollHeight - oldHeight - 100;
//         }, 1000);
//         hasNewPage = false;
//     }
// };

// document.getElementById("chat").style.width = window.phoneScreen
// ? "100%"
// : "20%";
// document.getElementById("chat").style.height = canvas.height + "px";

// window.onresize = function () {
// document.getElementById("chat").style.height = canvas.height + "px";
// document.getElementById("chat").style.width = window.phoneScreen
//     ? "100%"
//     : "20%";
// };
