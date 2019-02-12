import {
    BOARD_NAME_CHANGED,
    READ_BOARDS
} from '../actions/types';

const INITIAL_STATE = {
    boardName: "",
    boards: []
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BOARD_NAME_CHANGED:
            return{...state, boardName : action.payload}
        case READ_BOARDS:
            return{...state, boards : action.payload}
        default:
            return state;
    }
}