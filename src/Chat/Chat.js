import React, { useRef, useState } from "react";
import Panel from "./Panel";
import { useWindowSize } from "../utils/hooks";
import { findAll } from "../utils/stringUtils";
import { ReactiveDiv } from "../utils/components";

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
    /*
    .message {
        width: calc(100% - 20px);
    }

    .chatImage {
        width: calc(100% - 1.5em);
    }
    */

    const sendChat = () => {
        console.log(chatTextRef.current.value);
        chatTextRef.current.value = "";
    };

    //     window.onkeydown = function (e) {
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

    const chatTextRef = useRef();
    const [enterKeyDown, setEnterKeyDown] = useState(false);
    return (
        <Panel
            panelTitle="Chat"
            onToggleOpen={(panelOpen) => {
                if (panelOpen) chatTextRef.current.focus();
                else chatTextRef.current.blur();
            }}
        >
            <div
                style={{
                    overflowY: "scroll",
                    overflowX: "hidden",
                    margin: 10,
                    marginBottom: 0,
                    flex: 1,
                }}
            >
                <div
                    style={{
                        color: "darkgrey",
                        textAlign: "center",
                        justifyContent: "center",
                    }}
                >
                    {Array(100)
                        .fill()
                        .map(() => (
                            <span>There are no chats!</span>
                        ))}
                </div>
            </div>
            <div
                style={{
                    height: 40,
                    margin: 10,
                    backgroundColor: "#00000033",
                    borderRadius: 20,
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <input
                    style={{
                        border: "none",
                        height: 30,
                        width: 0,
                        outline: "none",
                        backgroundColor: "#00000000",
                        margin: "5px 10px",
                        flex: 1,
                        color: "white",
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setEnterKeyDown(true);
                            sendChat();
                        }
                    }}
                    onKeyUp={(e) => {
                        if (e.key === "Enter") setEnterKeyDown(false);
                    }}
                    ref={chatTextRef}
                    placeholder="Type a message"
                />
                <ReactiveDiv
                    onClick={sendChat}
                    style={{
                        width: 30,
                        height: 30,
                        margin: 5,
                        borderRadius: 15,
                        backgroundColor: enterKeyDown ? "#999999" : "#fff",
                        color: "#000",
                        textAlign: "center",
                        justifyContent: "center",
                        userSelect: "none",
                    }}
                    reactiveStyle={{
                        hover: { backgroundColor: "#bbbbbb" },
                        press: { backgroundColor: "#999999" },
                    }}
                >
                    &gt;
                </ReactiveDiv>
            </div>
        </Panel>
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
