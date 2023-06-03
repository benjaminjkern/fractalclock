import React from "react";
import { useMouseHover, useMousePress } from "../utils/hooks";

const ChatCloseButton = ({ setChatOpen }) => {
    const { hover, hoverElementProps } = useMouseHover();
    const { press, pressElementProps } = useMousePress();

    return (
        <div
            onClick={() => setChatOpen(false)}
            {...hoverElementProps}
            {...pressElementProps}
            style={{
                position: "absolute",
                width: "max(40px, 2em)",
                height: "max(40px, 2em)",
                right: 0,
                top: 0,
                backgroundColor: press
                    ? "#99000077"
                    : hover
                    ? "#bb000077"
                    : "#ff000077",
                textAlign: "center",
                lineHeight: "max(40px, 2em)",
                userSelect: "none",
            }}
        >
            X
        </div>
    );
};

export default ChatCloseButton;
