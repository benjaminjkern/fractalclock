export const vecLength = (vector) => {
    return Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
};

export const rotationMatrix = (theta) => {
    return [
        [Math.cos(theta), -Math.sin(theta)],
        [Math.sin(theta), Math.cos(theta)],
    ];
};

export const matMult = (A, B) => {
    return [A[0][0] * B[0] + A[0][1] * B[1], A[1][0] * B[0] + A[1][1] * B[1]];
};

export const vecAdd = (A, B) => {
    return [A[0] + B[0], A[1] + B[1]];
};
export const vecSub = (A, B) => {
    return [A[0] - B[0], A[1] - B[1]];
};

export const HSVtoHEX = (h, s, v) => {
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;

    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
        default:
            throw "What";
    }
    return [r, g, b].map((x) => scaleToHex(x)).join("");
};

export const scaleToHex = (scale) =>
    Math.floor(scale * 255)
        .toString(16)
        .padStart(2, "0");
