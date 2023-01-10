import { ThemeProvider } from "@primer/react";
// import "@fontsource/manrope/400.css";
// import "@fontsource/manrope/700.css";
// import "@fontsource/sora/400.css";
// import "@fontsource/sora/700.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
