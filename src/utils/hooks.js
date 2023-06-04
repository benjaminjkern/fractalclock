import { useEffect, useState } from "react";

export const useWindowSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    useEffect(() => {
        const updateSize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};

export const useMouseHover = (stopPropagation = true) => {
    const [hover, setHover] = useState(false);
    return {
        hover,
        hoverElementProps: {
            onMouseOver: (e) => {
                if (stopPropagation) e.stopPropagation();
                setHover(true);
            },
            onMouseOut: (e) => {
                if (stopPropagation) e.stopPropagation();
                setHover(false);
            },
        },
    };
};

export const useMousePress = (stopPropagation = true) => {
    const [press, setPress] = useState(false);
    return {
        press,
        pressElementProps: {
            onMouseDown: (e) => {
                if (stopPropagation) e.stopPropagation();
                setPress(true);
            },
            onMouseUp: (e) => {
                if (stopPropagation) e.stopPropagation();
                setPress(false);
            },
        },
    };
};
