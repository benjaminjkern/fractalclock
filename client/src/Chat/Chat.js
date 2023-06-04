import React, { useEffect, useRef, useState } from "react";
import Panel from "./Panel";
import { ReactiveDiv } from "../utils/components";
import { replaceSpecials } from "./ChatSpecials";
import { useWindowSize } from "../utils/hooks";

const API_URL = "https://4r52fybt27.execute-api.us-east-1.amazonaws.com/dev/";
const MAX_CHAT_LENGTH = 140;
const MAX_USER_LENGTH = 20;

const Chat = () => {
    const [chats, setChats] = useState();
    const { windowWidth, windowHeight } = useWindowSize();
    const isMobile = windowWidth < windowHeight;

    useEffect(() => {
        fetch(`${API_URL}?page=${1}`)
            .then((response) => response.json())
            .then((data) => {
                setChats(data.chats);
                console.log("page number", data.page);
            })
            .catch((err) => {
                console.error(err);
                setChats([]);
            });
    }, []);

    let user = undefined;

    const sendChat = () => {
        const message = chatTextRef.current.value;

        if (message.length === 0) return;
        if (message.length > MAX_CHAT_LENGTH) {
            alert(
                "Chats must be less than " +
                    MAX_CHAT_LENGTH +
                    " characters long!"
            );
            return;
        }

        const newChat = {};
        if (user) newChat.user = user;
        newChat.msg = message;

        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newChat),
        });
        setChats((chats) => [...chats, newChat]);
        scrollChatToBottom();

        chatTextRef.current.value = "";
    };

    const scrollChatToBottom = () => {
        if (scrollRef.current)
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
    const scrollRef = useRef();
    const [enterKeyDown, setEnterKeyDown] = useState(false);

    return (
        <Panel
            panelTitle="Chat"
            onToggleOpen={(panelOpen) => {
                if (panelOpen) {
                    if (!isMobile) chatTextRef.current.focus();
                    scrollChatToBottom();
                } else chatTextRef.current.blur();
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
                ref={scrollRef}
            >
                <div
                    style={{
                        color: "darkgrey",
                        textAlign: "center",
                        justifyContent: chats?.length ? "start" : "center",
                        minHeight: "100%",
                    }}
                >
                    {!chats
                        ? "Loading..."
                        : chats.length === 0
                        ? "There are no chats!"
                        : chats.map(({ user, msg }, i) => (
                              <div
                                  key={i}
                                  style={{
                                      display: "block",
                                      textAlign: "left",
                                      paddingLeft: 15,
                                      textIndent: -15,
                                      paddingBottom: 5,
                                      //   marginRight: 20,
                                      wordWrap: "break-word",
                                  }}
                              >
                                  {user || <AnonymousUser />} &gt;{" "}
                                  <span style={{ color: "lightgray" }}>
                                      {replaceSpecials(msg)}
                                  </span>
                              </div>
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

const AnonymousUser = () => (
    <span style={{ color: "darkgray" }}> (Anonymous) </span>
);
