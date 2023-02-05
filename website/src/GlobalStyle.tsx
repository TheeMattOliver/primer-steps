import { createGlobalStyle } from "styled-components";
import { themeGet } from "@primer/react";

export const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: ${themeGet("fonts.normal")};
  }
  body {
    background-color: ${themeGet("colors.canvas.default")};
    color: ${themeGet("colors.fg.default")};
  }
`;
