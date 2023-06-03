import React, { createContext, useState } from "react";

export const FractalSettingsContext = createContext();

const FractalSettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        maxDepth: 9,
        blurAmount: 220 / 255,
        glowAmount: 20 / 100,
        branchLengths: [66 / 100, 60 / 100, 50 / 100],
        scale: 1.25,
    });
    return (
        <FractalSettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </FractalSettingsContext.Provider>
    );
};

export default FractalSettingsProvider;
