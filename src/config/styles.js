import "onsenui/css/onsenui.css"
import "onsenui/css/onsen-css-components.css"
import "react-toastify/dist/ReactToastify.css"

import { injectGlobal } from "react-emotion"

injectGlobal`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    z-index: 1;
    font-size: inherit;
  }
  html,
  body {
    height: 100%;
    width: 100%;
  }
  html {
    font-size: 62.5%; /* defines 1rem = 10px */
    -webkit-font-smoothing: antialiased;
  }
  body {
    box-sizing: border-box;
    font-family: sans-serif;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.7;
    color: #000;
  }

  #root {
    &,
    & > div:first-of-type {
      height: 100%;
      width: 100%;
    }
  }
`
