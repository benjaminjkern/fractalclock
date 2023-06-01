let canvas;

const fps = 60;
const speed = 1;
const showHours = false;

let maxDepth;
let blurr;
let glow;
let r;
let scale;

$(document).ready(function () {
    Array.from(document.getElementsByTagName("input")).forEach((element) => {
        const value =
            ((element.value - element.min) / (element.max - element.min)) * 100;
        element.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
    });

    canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.phoneScreen = canvas.height > canvas.width;
    document.getElementById("chat").style.width = window.phoneScreen
        ? "100%"
        : "20%";
    document.getElementById("chat").style.height = canvas.height + "px";
    document.body.style.fontSize = window.phoneScreen ? "24px" : "12px";

    window.onresize = function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        window.phoneScreen = canvas.height > canvas.width;
        document.body.style.fontSize = window.phoneScreen ? "24px" : "12px";
        document.getElementById("chat").style.height = canvas.height + "px";
        document.getElementById("chat").style.width = window.phoneScreen
            ? "100%"
            : "20%";
        if (window.chatOpen) {
            document.getElementById("openChat").style.right = window.phoneScreen
                ? "20%"
                : "100%";
            document.getElementById("openChat").style.opacity =
                window.phoneScreen ? "0" : "1";
            document.getElementById("closeChat").style.opacity =
                window.phoneScreen ? "1" : "0";
        }
    };

    var slider = document.getElementById("slider");
    maxDepth = slider.value;

    slider.oninput = function () {
        maxDepth = this.value;
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
    };

    var blurslider = document.getElementById("blurslider");

    blurr = 255 - blurslider.value;
    blurslider.oninput = function () {
        blurr = 255 - this.value;
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
    };

    var glowslider = document.getElementById("glowslider");

    glow = glowslider.value;
    glowslider.oninput = function () {
        glow = this.value;
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
    };
    var scaledslider = document.getElementById("scaledslider");

    scale = scaledslider.value / 100;
    scaledslider.oninput = function () {
        scale = this.value / 100;
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
    };

    var sslider = document.getElementById("sslider");
    var mslider = document.getElementById("mslider");
    var hslider = document.getElementById("hslider");

    sslider.oninput = function () {
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
        r = Math.max(sslider.value, mslider.value, hslider.value) / 100;
    };
    mslider.oninput = function () {
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
        r = Math.max(sslider.value, mslider.value, hslider.value) / 100;
    };
    hslider.oninput = function () {
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
        r = Math.max(sslider.value, mslider.value, hslider.value) / 100;
    };

    r = Math.max(sslider.value, mslider.value, hslider.value) / 100;

    drawTree(ctx);
});

const drawTree = (ctx) => {
    const now = new Date();
    const theta =
        (-(
            now.getMilliseconds() +
            now.getSeconds() * 1000 +
            now.getMinutes() * 60 * 1000 +
            now.getHours() * 60 * 60 * 1000
        ) *
            2 *
            Math.PI *
            speed) /
        1000;
    // console.log(theta);

    const hue = ((Math.abs(theta) / Math.PI) * 180) / 60 / 60;
    // console.log(hue);
    ctx.fillStyle =
        colorsys.hsv_to_hex(hue, 100, 70) +
        (+blurr).toString(16).padStart(2, "0");
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const smallerSide = Math.min(canvas.height, canvas.width);

    const startLength =
        scale *
        (r === 1
            ? smallerSide / 2 / maxDepth
            : Math.min(
                  smallerSide / 2,
                  ((smallerSide / 2 / r) * (1 - r)) / (1 - r ** maxDepth)
              ));

    const start = [canvas.width / 2, canvas.height / 2 + startLength];
    const line0 = [0, -startLength];
    const line1 = matMult(rotationMatrix(theta), [0, startLength * r]);
    const line2 = matMult(rotationMatrix(theta / 60), [
        0,
        (startLength * document.getElementById("sslider").value) / 100,
    ]);
    const line3 = matMult(rotationMatrix(theta / 60 / 60), [
        0,
        (startLength * document.getElementById("mslider").value) / 100,
    ]);
    const line4 = matMult(rotationMatrix(theta / 60 / 60 / 12), [
        0,
        (startLength * document.getElementById("hslider").value) / 100,
    ]);

    const transMatrix1 = rotationMatrix(
        Math.atan2(line0[1], line0[0]) - Math.atan2(line1[1], line1[0])
    ).map((vector) => vector.map((x) => (x * length(line1)) / length(line0)));
    const transMatrix2 = rotationMatrix(
        Math.atan2(line0[1], line0[0]) - Math.atan2(line2[1], line2[0])
    ).map((vector) => vector.map((x) => (x * length(line2)) / length(line0)));
    const transMatrix3 = rotationMatrix(
        Math.atan2(line0[1], line0[0]) - Math.atan2(line3[1], line3[0])
    ).map((vector) => vector.map((x) => (x * length(line3)) / length(line0)));
    const transMatrix4 = rotationMatrix(
        Math.atan2(line0[1], line0[0]) - Math.atan2(line4[1], line4[0])
    ).map((vector) => vector.map((x) => (x * length(line4)) / length(line0)));

    ctx.lineCap = "round";

    const lines = [[start, add(start, line0), 0]];
    ctx.beginPath();

    const tipColor = colorsys.hsv_to_hex(hue + 180, 100, 70);

    while (lines.length > 0) {
        const line = lines.shift();
        ctx.beginPath();
        if (line[2] == maxDepth) {
            ctx.lineWidth = glow;
            ctx.strokeStyle = "#ffffff01";
            ctx.moveTo(line[0][0], line[0][1]);
            ctx.lineTo(line[1][0], line[1][1]);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = tipColor;
        } else {
            ctx.lineWidth = 0.3;
            ctx.strokeStyle = "#000000";
        }
        ctx.moveTo(line[0][0], line[0][1]);
        ctx.lineTo(line[1][0], line[1][1]);

        ctx.stroke();
        if (line[2] >= maxDepth) continue;

        // lines.push([line[1], add(line[1], matMult(transMatrix1, sub(line[0], line[1]))), line[2] + 1]);
        if (document.getElementById("sslider").value > 0)
            lines.push([
                line[1],
                add(line[1], matMult(transMatrix2, sub(line[0], line[1]))),
                line[2] + 1,
            ]);
        if (document.getElementById("mslider").value > 0)
            lines.push([
                line[1],
                add(line[1], matMult(transMatrix3, sub(line[0], line[1]))),
                line[2] + 1,
            ]);
        if (document.getElementById("hslider").value > 0)
            lines.push([
                line[1],
                add(line[1], matMult(transMatrix4, sub(line[0], line[1]))),
                line[2] + 1,
            ]);
    }

    setTimeout(() => {
        drawTree(ctx);
    }, 1000 / fps);
};

const length = (vector) => {
    return Math.sqrt(vector[0] ** 2 + vector[1] ** 2);
};

const rotationMatrix = (theta) => {
    return [
        [Math.cos(theta), -Math.sin(theta)],
        [Math.sin(theta), Math.cos(theta)],
    ];
};

const matMult = (A, B) => {
    return [A[0][0] * B[0] + A[0][1] * B[1], A[1][0] * B[0] + A[1][1] * B[1]];
};

const add = (A, B) => {
    return [A[0] + B[0], A[1] + B[1]];
};
const sub = (A, B) => {
    return [A[0] - B[0], A[1] - B[1]];
};
