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
