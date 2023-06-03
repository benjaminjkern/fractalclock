import React, { createContext } from "react";

const FractalControls = () => {
    /*
    .slider {
            background: linear-gradient(to right, #82CFD0 0%, #82CFD0 50%, #fff 50%, #fff 100%);
            border: solid 1px #82CFD0;
            border-radius: 8px;
            height: 7px;
            width: 75px;
            outline: none;
            -webkit-appearance: none;
            appearance: none;
        }
        */

    /**
     *     Array.from(document.getElementsByTagName("input")).forEach((element) => {
        const value =
            ((element.value - element.min) / (element.max - element.min)) * 100;
        element.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
    });
     */
    /**
     * 
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
    };
    mslider.oninput = function () {
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
    };
    hslider.oninput = function () {
        var value = ((this.value - this.min) / (this.max - this.min)) * 100;
        this.style.background =
            "linear-gradient(to right, #82CFD0 0%, #82CFD0 " +
            value +
            "%, #fff " +
            value +
            "%, white 100%)";
    };
     */
    return (
        <div id="controls" style="opacity: 0">
            <p style="position: absolute; left: 0%; top: 2%; text-align:center; width: 5%;">
                Iterations
            </p>
            <input
                type="range"
                id="slider"
                min="1"
                max="18"
                value="7"
                style="position: absolute; left: 5%; top: 5%; foreground-color: red"
                class="slider"
            />

            <p style="position: absolute; left: 0%; top: 7%; text-align:center; width: 5%;">
                Blur
            </p>
            <input
                type="range"
                id="blurslider"
                min="0"
                max="255"
                value="220"
                style="position: absolute; left: 5%; top: 10%;"
                class="slider"
            />

            <p style="position: absolute; left: 0%; top: 12%; text-align:center; width: 5%;">
                Glow
            </p>
            <input
                type="range"
                id="glowslider"
                min="0"
                max="100"
                value="20"
                style="position: absolute; left: 5%; top: 15%;"
                class="slider"
            />

            <p style="position: absolute; left: 0%; top: 17%; text-align:center; width: 5%;">
                Second Hand
            </p>
            <input
                type="range"
                id="sslider"
                min="0"
                max="100"
                value="66"
                style="position: absolute; left: 5%; top: 20%;"
                class="slider"
            />

            <p style="position: absolute; left: 0%; top: 22%; text-align:center; width: 5%;">
                Minute Hand
            </p>
            <input
                type="range"
                id="mslider"
                min="0"
                max="100"
                value="60"
                style="position: absolute; left: 5%; top: 25%;"
                class="slider"
            />

            <p style="position: absolute; left: 0%; top: 27%; text-align:center; width: 5%;">
                Hour Hand
            </p>
            <input
                type="range"
                id="hslider"
                min="0"
                max="100"
                value="50"
                style="position: absolute; left: 5%; top: 30%;"
                class="slider"
            />

            <p style="position: absolute; left: 0%; top: 32%; text-align:center; width: 5%;">
                Scale
            </p>
            <input
                type="range"
                id="scaledslider"
                min="50"
                max="1000"
                value="100"
                style="position: absolute; left: 5%; top: 35%;"
                class="slider"
            />
        </div>
    );
};

export default FractalControls;
