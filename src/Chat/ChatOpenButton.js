import React, { useEffect, useState } from "react";
import { ReactiveDiv } from "../utils/components";

const WAIT = 1000;

const ChatOpenButton = ({ chatOpen, onClick }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const mouseEvent = () => {
            const timeSinceMove = new Date().getTime();
            setVisible(true);
            setTimeout(() => {
                if (chatOpen) return;
                if (new Date().getTime() - timeSinceMove > WAIT)
                    setVisible(false);
            }, WAIT);
        };
        window.addEventListener("onmousedown", mouseEvent);
        window.addEventListener("onmouseup", mouseEvent);
        window.addEventListener("onmousemove", mouseEvent);
        return () => window.removeEventListener("onmousedown", mouseEvent);
    }, []);

    // window.onmouseout = function (e) {
    //     if (
    //         !window.chatOpen &&
    //         !window.phoneScreen &&
    //         (e.x > window.innerWidth ||
    //             e.x < 0 ||
    //             e.y > window.innerHeight ||
    //             e.y < 0)
    //     )
    //         chatOpenButton.style.opacity = "0";
    // };

    // if (window.chatOpen) {
    //     document.getElementById("openChat").style.right = window.phoneScreen
    //         ? "20%"
    //         : "100%";
    //     document.getElementById("openChat").style.opacity =
    //         window.phoneScreen ? "0" : "1";
    // }

    const phoneScreen = false;

    return (
        <ReactiveDiv
            onClick={onClick}
            style={{
                position: "absolute",
                width: "max(20px, 1em)",
                height: "max(40px, 2em)",
                opacity: visible,
                right: chatOpen ? (phoneScreen ? "100%" : "20%") : 0,
                top: "calc(50% - max(20px, 1em))",
                backgroundColor: "#00000033",
                borderRadius: "max(10px, 0.5em) 0 0 max(10px, 0.5em)",
                textAlign: "center",
                lineHeight: "max(40px, 2em)",
                userSelect: "none",
            }}
            reactiveStyle={{
                hover: { backgroundColor: "#00000066" },
                press: { backgroundColor: "#00000099" },
            }}
        >
            {chatOpen ? "&gt;" : "&lt;"}
        </ReactiveDiv>
    );
};

export default ChatOpenButton;
