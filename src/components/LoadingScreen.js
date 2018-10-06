import React from "react"
import { css } from "react-emotion"

const LoadingScreen = () => <div className={loadingCss}>Loading</div>

export default LoadingScreen

const loadingCss = css`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`
