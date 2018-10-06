// TODO: Split to actions

import React from "react"
import { css } from "react-emotion"
import { toast } from "react-toastify"
import { Input, Button } from "react-onsenui"
import { Transition, animated } from "react-spring"
import { withName } from "contexts/Name"
import firebase from "firebase/app"

const db = firebase.database()

class HomeView extends React.Component {
  state = { roomName: "", name: "", askingName: false, creatingRoom: false }

  isValidRoomName() {
    const { roomName } = this.state

    if (!roomName) {
      toastEmptyRoomName()
    } else if (roomName.length < 2) {
      toastInvalidRoomName(roomName)
    } else {
      return true
    }

    return false
  }

  chooseEnterRoom = async e => {
    if (!this.isValidRoomName()) {
      return
    }

    const { roomName } = this.state

    const room = await (await db.ref(`/game/${roomName}`).once("value")).val()
    if (room) {
      this.setState({ askingName: true })
    } else {
      toastNoRoomFound(roomName)
    }
  }

  chooseCreateRoom = e => {
    this.setState({ creatingRoom: true, askingName: true })
  }

  createRoom = async e => {
    // TODO: Validate  username
    const { name } = this.state
    const roomName = await generateRoomName()
    const ref = db.ref(`/game/${roomName}`)
    const key = ref.child("players").push().key
    ref.update({
      "/name": roomName,
      [`/players/${key}`]: name,
      "/stage": "lobby",
    })
    this.props.setName(name)
    this.props.navigate(`/game/${roomName}`)
  }

  enterRoom = e => {
    const { roomName, name } = this.state

    // TODO: Check if name is already taken
    db.ref(`/game/${roomName}/players`).push(name)
    this.props.setName(name)
    this.props.navigate(`game/${this.state.roomName}`)
  }

  render() {
    const { roomName, name, askingName, creatingRoom } = this.state
    console.log(this.props)

    return (
      <Transition
        from={{ opacity: 0, transform: "translate3d(100%,0,0)" }}
        enter={{ opacity: 1, transform: "translate3d(0%,0,0)" }}
        leave={{ opacity: 0, transform: "translate3d(-50%,0,0)" }}
        native
      >
        {!askingName
          ? styles => (
              <animated.div className={containerCss} style={styles}>
                <div className={mainContainerCss}>
                  <Input
                    modifier="material"
                    placeholder="Room Name"
                    value={roomName}
                    onChange={e => this.setState({ roomName: e.target.value })}
                    onKeyDown={e =>
                      e.key === "Enter" && this.chooseEnterRoom(e)
                    }
                    style={{ marginBottom: 10 }}
                  />
                  <Button modifier="material" onClick={this.chooseEnterRoom}>
                    Enter
                  </Button>
                </div>

                <div style={{ margin: "0 20px" }}>OR</div>

                <div>
                  <Button modifier="material" onClick={this.chooseCreateRoom}>
                    Create New Game
                  </Button>
                </div>
              </animated.div>
            )
          : styles => (
              <animated.div className={containerCss} style={styles}>
                <div className={mainContainerCss}>
                  <Input
                    modifier="material"
                    placeholder="Name"
                    value={name}
                    onChange={e => this.setState({ name: e.target.value })}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        if (creatingRoom) {
                          this.createRoom()
                        } else {
                          this.enterRoom()
                        }
                      }
                    }}
                    style={{ marginBottom: 10 }}
                  />
                  <Button
                    modifier="material"
                    onClick={creatingRoom ? this.createRoom : this.enterRoom}
                  >
                    {creatingRoom ? "Create Room" : "Enter Room"}
                  </Button>
                </div>
              </animated.div>
            )}
      </Transition>
    )
  }
}

export default withName(HomeView)

async function generateRoomName() {
  let roomName = Math.floor(1000 + Math.random() * 9000)
  const room = await (await db.ref(`/game/${roomName}`).once("value")).val()
  if (room) {
    roomName = await generateRoomName()
  } else {
    return roomName
  }
}

function toastEmptyRoomName() {
  toast.error("Please enter a room name.")
}

function toastInvalidRoomName(roomName) {
  toast.error(`"${roomName}" is not a valid room name.`)
}

function toastNoRoomFound(roomName) {
  toast.error(`"${roomName}" room is not created.`)
}

const containerCss = css`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const mainContainerCss = css`
  display: flex;
  flex-direction: column;
`
