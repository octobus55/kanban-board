import {
    TOGGLE_CREATE_BOARD,
    TOGGLE_CREATE_COLUMN,
    TOGGLE_REMOVE_COLUMN,
    TOGGLE_ADD_TASK,
    SELECT_BOARD,
} from '../actions/types';

const INITIAL_STATE = {
    showCreateBoard : false,
    showCreateColumn: false,
    showRemoveColumn: false,
    showAddTask: false,
    showBoard: false,
    removeColumn: {},
    addColumn: {},
    selectedBoard: {},
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_CREATE_BOARD:
            return{...state, showCreateBoard: !state.showCreateBoard, showCreateColumn: false, showAddTask: false,}
        case TOGGLE_CREATE_COLUMN:
            return{...state, showCreateColumn: !state.showCreateColumn, showCreateBoard: false, showAddTask: false,}
        case TOGGLE_REMOVE_COLUMN:
            return{...state, showRemoveColumn: !state.showRemoveColumn, removeColumn: action.payload }
        case TOGGLE_ADD_TASK:
            return{...state, showAddTask: !state.showAddTask, addColumn: action.payload, showCreateBoard: false, showCreateColumn: false }
        case SELECT_BOARD:
            return{...state, selectedBoard: action.payload, showBoard: true }
        default:
            return state;
    }
}