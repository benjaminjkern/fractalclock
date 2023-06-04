import { useState } from "react";
import { ReactiveDiv } from "../utils/components";
import { useWindowSize } from "../utils/hooks";

const Panel = ({ children, panelTitle, onToggleOpen }) => {
    const [panelOpen, setPanelOpen] = useState(false);

    const { windowWidth, windowHeight } = useWindowSize();
    const isMobile = windowWidth < windowHeight;

    const panelWidth = isMobile ? windowWidth : windowWidth / 4;

    return (
        <>
            <div
                style={{
                    position: "absolute",
                    height: windowHeight,
                    width: panelWidth,
                    right: panelOpen ? 0 : -panelWidth,
                    backgroundColor: "#00000033",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        width: panelWidth,
                        height: 40,
                        backgroundColor: "#00000033",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {panelTitle}
                    {isMobile && (
                        <ReactiveDiv
                            onClick={() => setPanelOpen(false)}
                            style={{
                                position: "absolute",
                                width: 40,
                                height: 40,
                                right: 0,
                                top: 0,
                                backgroundColor: "#ff000077",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                                userSelect: "none",
                            }}
                            reactiveStyle={{
                                hover: { backgroundColor: "#bb000077" },
                                press: { backgroundColor: "#99000077" },
                            }}
                        >
                            X
                        </ReactiveDiv>
                    )}
                </div>
                {children}
            </div>
            <ReactiveDiv
                onClick={() => {
                    setPanelOpen(!panelOpen);
                    onToggleOpen(!panelOpen);
                }}
                style={{
                    position: "absolute",
                    width: 20,
                    height: 40,
                    // opacity: visible,
                    top: windowHeight / 2 - 20,
                    right: panelOpen ? panelWidth : 0,
                    backgroundColor: "#00000033",
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    userSelect: "none",
                }}
                reactiveStyle={{
                    hover: { backgroundColor: "#00000066" },
                    press: { backgroundColor: "#00000099" },
                }}
            >
                {panelOpen ? ">" : "<"}
            </ReactiveDiv>
        </>
    );
};

// const WAIT = 1000;

//     const mouseEvent = () => {
//         const timeSinceMove = new Date().getTime();
//         setVisible(true);
//         setTimeout(() => {
//             if (chatOpen) return;
//             if (new Date().getTime() - timeSinceMove > WAIT)
//                 setVisible(false);
//         }, WAIT);
//     };
//     window.addEventListener("onmousedown", mouseEvent);
//     window.addEventListener("onmouseup", mouseEvent);
//     window.addEventListener("onmousemove", mouseEvent);
//     return () => {
//         window.removeEventListener("onmousedown", mouseEvent);
//         window.removeEventListener("onmouseup", mouseEvent);
//         window.removeEventListener("onmousemove", mouseEvent);
//     };
// }, []);

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

export default Panel;
