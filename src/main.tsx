import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";
import { IntersectingProjectCP } from "./Context/IntersectingProjectCP";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <IntersectingProjectCP>
        <App />
      </IntersectingProjectCP>
    </ThemeProvider>
  </React.StrictMode>
);
