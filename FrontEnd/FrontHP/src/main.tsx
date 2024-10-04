import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BackgroundMusic from "./components/BackgroundMusic";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BackgroundMusic />
    <App />
  </StrictMode>
);
