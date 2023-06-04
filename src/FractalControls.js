import React, { useContext } from "react";
import {
    CONTROLS,
    ColorContext,
    FractalSettingsContext,
} from "./FractalSettings";
import { useMouseHover } from "./utils/hooks";

const FractalControls = () => {
    const { settingsInputValues, setSettingsInputValues } = useContext(
        FractalSettingsContext
    );
    const { hover: showingControls, hoverElementProps } = useMouseHover();

    const getSettingsValue = ({ key, listKey, listIndex }) => {
        if (key) return settingsInputValues[key];
        return settingsInputValues[listKey][listIndex];
    };
    const setSettingsValue = ({ key, listKey, listIndex }, value) => {
        if (key)
            return setSettingsInputValues((settings) => ({
                ...settings,
                [key]: +value,
            }));

        setSettingsInputValues((prevSettingsInputValues) => {
            const newList = prevSettingsInputValues[listKey];
            newList[listIndex] = +value;
            return {
                ...prevSettingsInputValues,
            };
        });
    };

    const { colors } = useContext(ColorContext);

    const color = colors[1];
    const radius = 3.5;
    const width = 75;

    return (
        <div
            style={{
                opacity: showingControls ? 1 : 0,
                position: "absolute",
                top: 0,
                left: 0,
                padding: 10,
            }}
            {...hoverElementProps}
        >
            <style>{`
                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: ${radius * 2}px;
                    height: ${radius * 2}px;
                    border-radius: 50%;
                    cursor: pointer;
                    background: ${color};
                }
            `}</style>
            {CONTROLS.map((control, i) => {
                const { name, min, max } = control;
                const value =
                    ((((getSettingsValue(control) - min) / (max - min)) *
                        (width - 2 * radius) +
                        radius) /
                        width) *
                    100;

                return (
                    <div
                        key={i}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {name}
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={getSettingsValue(control)}
                            onChange={(e) =>
                                setSettingsValue(control, e.target.value)
                            }
                            className="slider"
                            style={{
                                background: `linear-gradient(to right, ${color} ${value}%, #fff0 ${value}%)`,
                                border: "none",
                                borderRadius: 2 * radius,
                                height: 2 * radius,
                                width: width,
                                outline: "none",
                                WebkitAppearance: "none",
                                appearance: "none",
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default FractalControls;
