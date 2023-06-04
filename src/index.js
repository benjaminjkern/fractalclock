import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";

import FractalControls from "./FractalControls";
import Chat from "./Chat/Chat";
import FractalCanvas from "./FractalCanvas";
import FractalSettingsProvider from "./FractalSettings";

ReactDOM.createRoot(document.getElementById("root")).render(
    <>
        <FractalSettingsProvider>
            <FractalControls />
            <FractalCanvas />
        </FractalSettingsProvider>
        <Chat />
    </>
);
