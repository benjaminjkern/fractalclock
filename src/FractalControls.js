import React, { useContext } from "react";
import { CONTROLS, FractalSettingsContext } from "./FractalSettings";
import { useMouseHover, useWindowSize } from "./utils/hooks";

const FractalControls = () => {
    const { settingsInputValues, setSettingsInputValues } = useContext(
        FractalSettingsContext
    );
    const { hover: showingControls, hoverElementProps } = useMouseHover();
    const { width: windowWidth, height: windowHeight } = useWindowSize();

    const getSettingsValue = ({ key, listKey, listIndex }) => {
        if (key) return settingsInputValues[key];
        console.log(listKey, listIndex);
        return settingsInputValues[listKey][listIndex];
    };
    const setSettingsValue = ({ key, listKey, listIndex }, value) => {
        if (key)
            setSettingsInputValues((settings) => ({
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

    return (
        <div
            style={{
                opacity: showingControls ? 1 : 0,
                position: "absolute",
                top: 0,
                left: 0,
                width: windowWidth / 4,
                height: windowHeight / 2,
            }}
            {...hoverElementProps}
        >
            {CONTROLS.map((control, i) => {
                const { name, min, max } = control;
                const hueValue =
                    ((getSettingsValue(control) - min) / (max - min)) * 100;
                return (
                    <>
                        <p
                            style={{
                                position: "absolute",
                                left: 0,
                                top: `${2 + i * 5}%`,
                                textAlign: "center",
                                width: "5%",
                            }}
                        >
                            {name}
                        </p>
                        <input
                            type="range"
                            min={min}
                            max={max}
                            value={getSettingsValue(control)}
                            onChange={(e) =>
                                setSettingsValue(control, e.target.value)
                            }
                            style={{
                                position: "absolute",
                                left: "5%",
                                top: `${(i + 1) * 5}%`,
                                foregroundColor: "red",
                                background: `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${hueValue}%, #fff ${hueValue}%, white 100%)`,
                                border: "solid 1px #82CFD0",
                                borderRadius: 8,
                                height: 7,
                                width: 75,
                                outline: "none",
                                WebkitAppearance: "none",
                                appearance: "none",
                            }}
                        />
                    </>
                );
            })}
        </div>
    );
};

export default FractalControls;
