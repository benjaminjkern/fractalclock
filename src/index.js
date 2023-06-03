import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";

import FractalControls from "./FractalControls";
import Chat from "./Chat";
import FractalCanvas from "./FractalCanvas";
import FractalSettingsProvider from "./FractalSettings";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <FractalSettingsProvider>
            <FractalControls />
            <FractalCanvas />
        </FractalSettingsProvider>
        {/* <Chat /> */}
    </React.StrictMode>
);
