import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import HomeRoute from "./routes/HomeRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomeRoute />
    {import.meta.env.BRANCH == 'dev' && (
      <div
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          fontSize: "30px",
          textAlign: "right",
          color: "#6c757d",
        }}
      >
        dev branch
      </div>
    )}
  </StrictMode>
);
