import React, { useContext, useEffect, useRef } from "react";
import {
    HSVtoHEX,
    getNowSeconds,
    matMult,
    rotationMatrix,
    scaleToHex,
    vecAdd,
} from "./utils/mathUtils";
import { useWindowSize } from "./utils/hooks";
import { ColorContext, FractalSettingsContext } from "./FractalSettings";

const FractalCanvas = () => {
    const { windowWidth, windowHeight } = useWindowSize();

    const canvasRef = useRef();

    const { settings } = useContext(FractalSettingsContext);
    const { colors } = useContext(ColorContext);

    useEffect(() => {
        if (!canvasRef.current) return;

        const {
            branchLengths,
            blurAmount,
            glowAmount,
            scale,
            maxDepth: maxDepthRaw,
            constantColors,
        } = settings;

        const maxDepth = Math.ceil((maxDepthRaw * (constantColors + 3)) / 4);

        const canvasContext = canvasRef.current.getContext("2d");

        canvasContext.lineCap = "round";

        const seconds = getNowSeconds();

        // Background color
        canvasContext.fillStyle = `${colors[0]}${scaleToHex(1 - blurAmount)}`;
        canvasContext.fillRect(0, 0, windowWidth, windowHeight);

        const smallerSide = Math.min(windowWidth, windowHeight);

        const maxLength = Math.max(...branchLengths);

        const startLength =
            (scale * smallerSide) /
            2 /
            (maxLength === 1
                ? maxLength * maxDepth
                : (1 - maxLength ** (maxDepth + 1)) / (1 - maxLength) - 1);

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

        let firstBranch = true;

        while (branches.length > 0) {
            const branch = branches.pop();
            const branchEnd = vecAdd(branch.start, branch.vector);
            branch.end = branchEnd;

            if (branch.depth >= maxDepth) {
                tips.push(branch);
                continue;
            }

            if (!firstBranch) {
                canvasContext.moveTo(...branch.start);
                canvasContext.lineTo(...branchEnd);
            } else firstBranch = false;

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
        // canvasContext.lineWidth = glowAmount * 100;
        // canvasContext.strokeStyle = "#ffffff";
        // canvasContext.beginPath();
        // for (const branch of tips) {
        //     canvasContext.moveTo(...branch.start);
        //     canvasContext.lineTo(...branch.end);
        // }
        // canvasContext.stroke();

        // Tips
        canvasContext.lineWidth = 1;
        if (constantColors) {
            canvasContext.strokeStyle = colors[1];
            canvasContext.beginPath();
        }
        const DT = 1 / tips.length;
        for (let t = 0; t < tips.length; t++) {
            const branch = tips[t];
            if (!constantColors) {
                canvasContext.strokeStyle = `#${HSVtoHEX(
                    (t * DT) / 4 + seconds / 10,
                    1,
                    0.8
                )}`;
                canvasContext.beginPath();
            }
            canvasContext.moveTo(...branch.start);
            canvasContext.lineTo(...branch.end);
            if (!constantColors) canvasContext.stroke();
        }
        if (constantColors) canvasContext.stroke();
    });

    return (
        <canvas
            ref={canvasRef}
            style={{ padding: 0, zIndex: -1 }}
            width={windowWidth}
            height={windowHeight}
        />
    );
};

export default FractalCanvas;
