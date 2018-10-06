import React from "react"

import { getRoomRef } from "actions/game"
import LoadingScreen from "components/LoadingScreen"
import Lobby from "./Lobby"
import Playing from "./Playing"

class GameView extends React.Component {
  state = {
    noRoom: false,
    room: undefined,
  }

  componentDidMount() {
    const ref = getRoomRef(this.props.roomName)
    ref.on("value", snapshot => {
      const room = snapshot.val()
      if (!room) {
        return this.setState({ noRoom: true })
      } else {
        this.setState({ room })
      }
    })
  }

  render() {
    const { noRoom, room } = this.state

    if (!room && !noRoom) {
      return <LoadingScreen />
    }

    if (noRoom) {
      return <p>No Room</p>
    }

    if (room.stage === "lobby") {
      return (
        <Lobby players={Object.values(room.players)} roomName={room.name} />
      )
    }

    if (room.stage === "playing") {
      return <Playing />
    }

    return null
  }
}

export default GameView
