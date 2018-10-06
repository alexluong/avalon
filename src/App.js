import React from "react"
import { Router } from "@reach/router"
import { ToastContainer, Zoom, toast } from "react-toastify"
// Contexts
import { NameProvider } from "contexts/Name"
// Pages
import GameView from "view/Game"
import HomeView from "view/Home"

class App extends React.Component {
  componentDidCatch(error, info) {
    console.log(error, info)
  }

  render() {
    return (
      <NameProvider>
        <React.Fragment>
          <Router>
            <HomeView path="/" />
            <GameView path="/game/:roomName" />
          </Router>

          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.BOTTOM_CENTER}
            transition={Zoom}
            type={toast.TYPE.ERROR}
          />
        </React.Fragment>
      </NameProvider>
    )
  }
}

export default App
