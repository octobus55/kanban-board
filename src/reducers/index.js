import { combineReducers } from 'redux';
import dragReducer from './dragAndDropReducer';
import taskAndColumnReducer from './taskAndColumnReducer'
import boardReducer from './boardReducer'
import navbarReducer from './navbarReducer'

const reducers = combineReducers({
    DragResponse: dragReducer,
    TaskResponse: taskAndColumnReducer,
    BoardResponse: boardReducer,
    NavbarResponse: navbarReducer,
});

export default reducers;