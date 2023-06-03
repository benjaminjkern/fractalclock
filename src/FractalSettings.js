import React, { createContext, useState } from "react";

export const FractalSettingsContext = createContext();

export const CONTROLS = [
    { name: "Iterations", min: 1, max: 18, defaultValue: 9, key: "maxDepth" },
    {
        name: "Blur",
        min: 0,
        max: 255,
        defaultValue: 220,
        key: "blurAmount",
        getValue: (value) => value / 255,
    },
    { name: "Glow", min: 0, max: 100, defaultValue: 20, key: "glowAmount" },
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
        defaultValue: 125,
        key: "scale",
        getValue: (value) => value / 100,
    },
];

const FractalSettingsProvider = ({ children }) => {
    const startInputValues = {};
    for (const { key, listKey, listIndex, defaultValue } of CONTROLS) {
        if (key) startInputValues[key] = defaultValue;
        if (!startInputValues[listKey]) startInputValues[listKey] = [];
        startInputValues[listKey][listIndex] = defaultValue;
    }
    const [settingsInputValues, setSettingsInputValues] =
        useState(startInputValues);

    const settings = {};
    for (const { key, listKey, listIndex, getValue = (x) => x } of CONTROLS) {
        if (key) settings[key] = getValue(settingsInputValues[key]);
        if (!settings[listKey]) settings[listKey] = [];
        settings[listKey][listIndex] = getValue(
            settingsInputValues[listKey][listIndex]
        );
    }
    return (
        <FractalSettingsContext.Provider
            value={{ settings, settingsInputValues, setSettingsInputValues }}
        >
            {children}
        </FractalSettingsContext.Provider>
    );
};

export default FractalSettingsProvider;
