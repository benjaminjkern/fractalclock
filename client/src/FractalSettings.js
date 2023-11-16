import React, { createContext, useEffect, useState } from "react";
import { useWindowSize } from "./utils/hooks";
import { HSVtoHEX, getNowSeconds } from "./utils/mathUtils";

export const FractalSettingsContext = createContext();
export const ColorContext = createContext();

export const CONTROLS = [
    { name: "Iterations", min: 1, max: 18, defaultValue: 10, key: "maxDepth" },
    {
        name: "Blur",
        min: 0,
        max: 255,
        defaultValue: 220,
        key: "blurAmount",
        getValue: (value) => value / 255,
    },
    // {
    //     name: "Glow",
    //     min: 0,
    //     max: 100,
    //     defaultValue: 20,
    //     key: "glowAmount",
    //     getValue: (value) => value / 100,
    // },
    {
        name: "Second Hand",
        min: 0,
        max: 100,
        defaultValue: 66,
        listKey: "branchLengths",
        listIndex: 0,
        getValue: (value) => value / 100,
    },
    {
        name: "Minute Hand",
        min: 0,
        max: 100,
        defaultValue: 60,
        listKey: "branchLengths",
        listIndex: 1,
        getValue: (value) => value / 100,
    },
    {
        name: "Hour Hand",
        min: 0,
        max: 100,
        defaultValue: 50,
        listKey: "branchLengths",
        listIndex: 2,
        getValue: (value) => value / 100,
    },
    {
        name: "Scale",
        min: 50,
        max: 1000,
        defaultValue: 100,
        key: "scale",
        getValue: (value) => value / 100,
    },
    {
        name: "Constant Colors",
        min: 0,
        max: 1,
        defaultValue: 0,
        key: "constantColors",
        getValue: (value) => Math.round(value),
    },
];

// Generate this outside of the function

const DEFAULT_INPUT_VALUES = {};

for (const { key, listKey, listIndex, defaultValue } of CONTROLS) {
    if (key) {
        DEFAULT_INPUT_VALUES[key] = defaultValue;
        continue;
    }
    if (!DEFAULT_INPUT_VALUES[listKey]) DEFAULT_INPUT_VALUES[listKey] = [];
    DEFAULT_INPUT_VALUES[listKey][listIndex] = defaultValue;
}

const FractalSettingsProvider = ({ children }) => {
    const [settingsInputValues, setSettingsInputValues] =
        useState(DEFAULT_INPUT_VALUES);

    const settings = {};
    for (const { key, listKey, listIndex, getValue = (x) => x } of CONTROLS) {
        if (key) {
            settings[key] = getValue(settingsInputValues[key]);
            continue;
        }
        if (!settings[listKey]) settings[listKey] = [];
        settings[listKey][listIndex] = getValue(
            settingsInputValues[listKey][listIndex]
        );
    }
    return (
        <FractalSettingsContext.Provider
            value={{ settings, settingsInputValues, setSettingsInputValues }}
        >
            <ColorContextProvider>{children}</ColorContextProvider>
        </FractalSettingsContext.Provider>
    );
};

const getNowColors = () => {
    const seconds = getNowSeconds();
    return [
        `#${HSVtoHEX(seconds / 60 / 60, 1, 0.8)}`, // background color
        `#${HSVtoHEX(seconds / 60 / 60 + 0.5, 1, 0.8)}`, // foreground color
    ];
};

const ColorContextProvider = ({ children }) => {
    const { windowWidth, windowHeight } = useWindowSize();

    const [colors, setNewColors] = useState(getNowColors());

    // Refresh loop is done here as well
    useEffect(() => {
        const drawLoop = setInterval(() => setNewColors(getNowColors()), 1);
        return () => clearInterval(drawLoop);
    }, [windowHeight, windowWidth]);

    return (
        <ColorContext.Provider value={{ colors }}>
            {children}
        </ColorContext.Provider>
    );
};

export default FractalSettingsProvider;
