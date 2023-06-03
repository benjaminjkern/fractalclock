import React, { useEffect, useState } from "react";

import { useMouseHover, useMousePress } from "../utils/hooks";

const WAIT = 1000;

const ChatOpenButton = ({ chatOpen, setChatOpen }) => {
    const { hover, hoverElementProps } = useMouseHover();
    const { press, pressElementProps } = useMousePress();

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
        <div
            onClick={() => setChatOpen((currChatOpen) => !currChatOpen)}
            {...hoverElementProps}
            {...pressElementProps}
            style={{
                position: "absolute",
                width: "max(20px, 1em)",
                height: "max(40px, 2em)",
                opacity: visible,
                right: chatOpen ? (phoneScreen ? "100%" : "20%") : 0,
                top: "calc(50% - max(20px, 1em))",
                backgroundColor: press
                    ? "#00000099"
                    : hover
                    ? "#00000066"
                    : "#00000033",
                borderRadius: "max(10px, 0.5em) 0 0 max(10px, 0.5em)",
                textAlign: "center",
                lineHeight: "max(40px, 2em)",
                userSelect: "none",
            }}
        >
            {chatOpen ? "&gt;" : "&lt;"}
        </div>
    );
};

export default ChatOpenButton;
