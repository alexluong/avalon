import React from "react"
import { css } from "react-emotion"
import { List, ListItem, Button } from "react-onsenui"
import { withName } from "contexts/Name"
import { startGame } from "actions/game"

class Lobby extends React.Component {
  startGame = e => {
    startGame(this.props.roomName)
  }

  render() {
    const { roomName, name, players } = this.props
    const isOwner = players && players[0] === name

    return (
      <div className={containerCss}>
        <div>
          <h1 className={h1Css}>Avalon</h1>
          <h2 className={h2Css}>Game Number: {roomName}</h2>
          <List
            style={{ minWidth: 150 }}
            dataSource={players}
            renderRow={player => <ListItem key={player}>{player}</ListItem>}
          />
          {isOwner && (
            <Button modifier="material" onClick={this.startGame}>
              Start
            </Button>
          )}
        </div>
      </div>
    )
  }
}

export default withName(Lobby)

const containerCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  & > div {
    transform: translateY(-15vh);
  }
`

const h1Css = css`
  font-size: 3.6rem;
`

const h2Css = css`
  font-size: 2.4rem;
`
