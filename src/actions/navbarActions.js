import {
    TOGGLE_CREATE_BOARD,
    TOGGLE_CREATE_COLUMN,
    TOGGLE_REMOVE_COLUMN,
    TOGGLE_ADD_TASK,
    SELECT_BOARD,
} from './types'

export const toggleCreateBoard = () => (dispatch) =>{
    dispatch({
        type: TOGGLE_CREATE_BOARD,
    })
}

export const toggleCreateColumn = () => (dispatch) =>{
    dispatch({
        type: TOGGLE_CREATE_COLUMN,
    })
}

export const toggleRemoveColumn = (column) => (dispatch) =>{
    dispatch({
        type: TOGGLE_REMOVE_COLUMN,
        payload: column,
    })
}

export const toggleAddtask = (column) => (dispatch) =>{
    dispatch({
        type: TOGGLE_ADD_TASK,
        payload: column,
    })
}

export const selectBoard = (board) => (dispatch) => {
    dispatch({
        type: SELECT_BOARD,
        payload: board
    })
}