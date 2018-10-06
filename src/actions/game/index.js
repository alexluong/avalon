import firebase from "firebase/app"
const db = firebase.database()

export function getRoomRef(roomName) {
  return db.ref(`/game/${roomName}`)
}

export function startGame(roomName) {
  db.ref(`/game/${roomName}/stage`).set("playing")
}
