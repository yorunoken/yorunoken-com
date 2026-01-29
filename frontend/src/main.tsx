import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// @ts-expect-error dumb
import "@fontsource/geist-sans";
// @ts-expect-error dumb
import "@fontsource/geist-mono";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
