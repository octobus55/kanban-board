import {
    BOARD_NAME_CHANGED,
    READ_BOARDS
} from './types'
import firebase from "../config/firebase"

export const createBoard = (boardName) => (dispatch) => {
    var columnCount = 0
    var initiliaze = false
    firebase.database().ref(`Boards`).push({
        boardName, columnCount, initiliaze
    })
}
export const readBoards = () => (dispatch) => {

    firebase.database().ref(`Boards`).on('value', snapshot => {
        var boards = []
        snapshot.forEach(snap => {
            boards.push({
                boardId: snap.key,
                boardName: snap.val().boardName,
                columnCount: snap.val().columnCount,
                initiliaze: snap.val().initiliaze
            })
        })
        dispatch({
            type: READ_BOARDS,
            payload: boards
        })
    })
}
export const finishInitiliaze = (boardId) => (dispatch) => {
    firebase.database().ref(`Boards/${boardId}`).update({
        initiliaze: true
    })
}
export const onBoardNameChange = (value) => (dispatch) => {
    dispatch({
        type: BOARD_NAME_CHANGED,
        payload: value
    });
}
/*export const giveJSON = (boardId) => (dispatch) => {
    firebase.database().ref(`Boards/${boardId}`).once('value', snapshot => {
        console.log(JSON.stringify(snapshot.val()))
        
    })
}*/
