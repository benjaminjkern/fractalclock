import React, { useContext, useEffect, useRef, useState } from "react";
import { matMult, rotationMatrix, vecAdd } from "./utils/mathUtils";
import { useWindowSize } from "./utils/hooks";
import { FractalSettingsContext } from "./FractalSettings";

const FractalCanvas = () => {
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    window.phoneScreen = windowHeight > windowWidth;
    document.body.style.fontSize = window.phoneScreen ? "24px" : "12px";

    const canvasRef = useRef();

    const {
        settings: { branchLengths, blurAmount, glowAmount, scale, maxDepth },
    } = useContext(FractalSettingsContext);

    const [drawLoop, setDrawLoop] = useState();

    const draw = () => {
        if (!canvasRef.current) return;

        const canvasContext = canvasRef.current.getContext("2d");

        canvasContext.lineCap = "round";

        const now = new Date();
        const seconds =
            now.getMilliseconds() / 1000 +
            now.getSeconds() +
            now.getMinutes() * 60 +
            now.getHours() * 60 * 60;

        // Background color
        // canvasContext.fillStyle = `${HSVToHex((180 * seconds) / 60 / 60, 100, 70)}${Math.floor(blurAmount*256).toString(16)}`
        canvasContext.fillStyle = `#ff0000${Math.floor((1 - blurAmount) * 256)
            .toString(16)
            .padStart(2, "0")}`;
        canvasContext.fillRect(0, 0, windowWidth, windowHeight);

        const smallerSide = Math.min(windowWidth, windowHeight);

        const maxLength = Math.max(...branchLengths);

        const startLength =
            scale *
            (maxLength === 1
                ? smallerSide / 2 / maxDepth
                : Math.min(
                      smallerSide / 2,
                      ((smallerSide / 2 / maxLength) * (1 - maxLength)) /
                          (1 - maxLength ** maxDepth)
                  ));

        const branches = [
            {
                start: [windowWidth / 2, windowHeight / 2 + startLength],
                vector: [0, -startLength],
                depth: 0,
            },
        ];
        const thetas = [
            seconds / 60,
            seconds / 60 / 60,
            seconds / 60 / 60 / 12,
        ].map((rot) => rot * 2 * Math.PI);
        const transformationMatrices = branchLengths.map((branchLength, i) =>
            rotationMatrix(thetas[i]).map((row) =>
                row.map((x) => x * branchLength)
            )
        );

        canvasContext.lineWidth = 0.3;
        canvasContext.strokeStyle = "#000000";
        canvasContext.beginPath();

        const tips = [];

        while (branches.length > 0) {
            const branch = branches.pop();
            const branchEnd = vecAdd(branch.start, branch.vector);
            branch.end = branchEnd;

            if (branch.depth >= maxDepth) {
                tips.push(branch);
                continue;
            }

            canvasContext.moveTo(...branch.start);
            canvasContext.lineTo(...branchEnd);

            for (const transformationMatrix of transformationMatrices) {
                branches.push({
                    start: branchEnd,
                    vector: matMult(transformationMatrix, branch.vector),
                    depth: branch.depth + 1,
                });
            }
        }

        canvasContext.stroke();

        // Glow
        canvasContext.lineWidth = glowAmount * 100;
        canvasContext.strokeStyle = "#ffffff01";
        canvasContext.beginPath();
        for (const branch of tips) {
            canvasContext.moveTo(...branch.start);
            canvasContext.lineTo(...branch.end);
        }
        canvasContext.stroke();

        // Tips
        canvasContext.lineWidth = 1;
        canvasContext.strokeStyle = `#00ffff`;
        canvasContext.beginPath();
        for (const branch of tips) {
            canvasContext.moveTo(...branch.start);
            canvasContext.lineTo(...branch.end);
        }
        canvasContext.stroke();
    };

    // useEffect(() => {
    //     setDrawLoop(setInterval(draw, 50));
    //     return () => clearInterval(drawLoop);
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(draw);

    return (
        <canvas
            ref={canvasRef}
            style={{ padding: 0 }}
            width={windowWidth}
            height={windowHeight}
        />
    );
};

export default FractalCanvas;
