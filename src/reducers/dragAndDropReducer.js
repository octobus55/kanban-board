
import {
    ON_DRAG_TASK,
    ON_DROP,
    ON_DRAG_COLUMN,
    ON_DROP_COLUMN
} from '../actions/types';

const INITIAL_STATE = {
    draggedTask: {},
    columnDragging: false,
    draggedColumn: {},
    originColumnId: -1
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ON_DRAG_TASK:
            return{...state, draggedTask: action.payload, originColumnId: action.payload.columnId}
        case ON_DROP:
            return{...state, draggedTask: {}, originColumnId: -1}
        case ON_DRAG_COLUMN:
            return{...state, draggedColumn: action.payload, columnDragging: true}
        case ON_DROP_COLUMN:
            return{...state, draggedColumn: {}, columnDragging: false}
        default:
            return state;
    }
}