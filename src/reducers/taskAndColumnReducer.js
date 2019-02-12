import {
    READ_TASK,
    READ_COLUMN,
    INFO_CHANGED,
    READ_COLUMN_COUNT,
    TASK_COUNT,
    CREATE_COLUMN,
    CREATE_TASK
} from '../actions/types';

const INITIAL_STATE = {
    columns: [],
    tasks: [],
    title: "",
    taskName: "",
    columnCount: -1,
    taskCounts: [],
    description: "",
    summary: "",
    comment: "",
    boardName: ""
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case READ_COLUMN:
            return{...state, columns: action.payload}
        case READ_TASK:
            return{...state, tasks: action.payload}
        case INFO_CHANGED:
            return{...state, [action.payload.props]: action.payload.value}
        case READ_COLUMN_COUNT:
            return{...state, columnCount: action.payload}
        case TASK_COUNT:
            return{...state, taskCounts: action.payload}
        case CREATE_TASK:
            return{...state, summary: "", comment: "", description: "", taskName: ""}
        case CREATE_COLUMN:
            return{...state, title: ""}
        default:
            return state;
    }
}