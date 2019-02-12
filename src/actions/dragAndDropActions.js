import firebase from '../config/firebase'
import {
    ON_DRAG_TASK,
    ON_DROP,
    ON_DRAG_COLUMN,
    ON_DROP_COLUMN
} from './types'
import {
    incrementTaskCount,
    decrementTaskCount
} from './taskAndColumnActions'
export const onDrag = ({ task }) => (dispatch) => {
    dispatch({
        type: ON_DRAG_TASK,
        payload: task
    })
}

export const onDropTask = (boardId, columnId, columnTitle, draggedTask, taskCount) => (dispatch) => {
    var today = new Date();
    var day = today.getDay()
    var date = today.getDate()
    var month = today.getMonth()
    var year = today.getFullYear()
    var hour = today.getHours()
    var minute = today.getMinutes()
    var seconds = today.getSeconds()
    if (seconds < 10) {
        seconds = "0" + seconds.toString()
    }
    if (hour < 10) {
        hour = "0" + hour.toString()
    }
    if (minute < 10) {
        minute = "0" + minute.toString()
    }
    var milliseconds = today.getMilliseconds()
    var lastDragTime = {
        day: day,
        date: date,
        month: month,
        year: year,
        hour: hour,
        minute: minute,
        seconds: seconds,
        milliseconds: milliseconds
    }
    var lastDragInfo = {
        columnTitle: draggedTask.columnTitle,
        lastDragTime: lastDragTime
    }
    var taskIds = []
    var draggedColumnId = draggedTask.columnId
    var draggedtaskOrder = draggedTask.order
    firebase.database().ref(`Boards/${boardId}/Tasks/${draggedTask.taskId}`).update({
        columnId: columnId,
        columnTitle: columnTitle
    })
    .then(
        firebase.database().ref(`Boards/${boardId}/Tasks`).once('value', snapshot => {
            snapshot.forEach(snap => {
                if(snap.val().columnId === draggedColumnId && snap.val().order > draggedtaskOrder){
                    taskIds.push({ taskId: snap.key, order: snap.val().order })
                }
            })
        })
        .then(
            taskIds.forEach(task => {
                firebase.database().ref(`Boards/${boardId}/Tasks/${task.taskId}`).update({
                    order: task.order - 1
                })
            })
        )
    )
    .then(decrementTaskCount(boardId, draggedColumnId))
    .then(incrementTaskCount(boardId, columnId, taskCount))
    .then(
        firebase.database().ref(`Boards/${boardId}/Tasks/${draggedTask.taskId}/history`)
        .update({
            lastDragInfo
        })
    )
    .then(
        dispatch({
            type: ON_DROP,
            payload: draggedTask
        })
    )

}
export const onDragColumn = ({ column }) => (dispatch) => {
    dispatch({
        type: ON_DRAG_COLUMN,
        payload: column
    })
}

export const onDropColumn = ({ boardId, column, draggedColumn }) => (dispatch) => {
    const droppedOrder = column.order

    if (draggedColumn.order < column.order) {//if the dragging column's order is less than dropped Column's order
        firebase.database().ref(`Boards/${boardId}/Columns`)
            .orderByChild('order')
            .startAt(draggedColumn.order + 1)
            .endAt(column.order)
            .once('value', snapshot => {
                snapshot.forEach(snap => {
                    firebase.database().ref(`Boards/${boardId}/Columns/${snap.key}`).update({
                        order: snap.val().order - 1
                    })
                })
            })
            .then(
                firebase.database().ref(`Boards/${boardId}/Columns/${draggedColumn.columnId}`).update({
                    order: droppedOrder
                })
            )
            .then(
                dispatch({
                    type: ON_DROP_COLUMN,
                    payload: column.columnId
                })
            )
    }
    else {//if the dragging column's order is more than dropped Column's order
        firebase.database().ref(`Boards/${boardId}/Columns`)
            .orderByChild('order')
            .startAt(column.order)
            .endAt(draggedColumn.order - 1)
            .once('value', snapshot => {
                snapshot.forEach(snap => {
                    firebase.database().ref(`Boards/${boardId}/Columns/${snap.key}`).update({
                        order: snap.val().order + 1
                    })
                })
            })
            .then(
                firebase.database().ref(`Boards/${boardId}/Columns/${draggedColumn.columnId}`).update({
                    order: droppedOrder
                })
            )
            .then(
                dispatch({
                    type: ON_DROP_COLUMN,
                    payload: column.columnId
                })
            )
    }
}
export const taskDroptoTask = (boardId, task, draggedTask) => (dispatch) => {
    var newOrder = task.order
    var tasks = []
    if(task.columnId !== draggedTask.columnId){ // if the tasks are in different column
        firebase.database().ref(`Boards/${boardId}/Tasks`).once('value', snapshot => {
            snapshot.forEach(snap => {
                if(snap.val().columnId === task.columnId && snap.val().order >= task.order){
                    tasks.push({taskId: snap.key, order: snap.val().order})
                }
            })
        })
        .then(
            tasks.forEach(task => {
                firebase.database().ref(`Boards/${boardId}/Tasks/${task.taskId}`).update({
                    order: task.order + 1
                })
            })
        )
        .then(
            firebase.database().ref(`Boards/${boardId}/Tasks/${draggedTask.taskId}`).update({
                order: newOrder
            })
        )
    }
    else{// if the tasks are in the same column
        if(task.order > draggedTask.order)// if the dragging tasks order is less than the other
        {
            firebase.database().ref(`Boards/${boardId}/Tasks`).once('value', snapshot => {
                snapshot.forEach(snap => {
                    if(snap.val().columnId === task.columnId && 
                    snap.val().order <= task.order && 
                    snap.val().order > draggedTask.order){
                        tasks.push({taskId: snap.key, order: snap.val().order})
                    }
                })
            })
            .then(
                tasks.forEach(task => {
                    firebase.database().ref(`Boards/${boardId}/Tasks/${task.taskId}`).update({
                        order: task.order - 1
                    })
                })
            )
            .then(
                firebase.database().ref(`Boards/${boardId}/Tasks/${draggedTask.taskId}`).update({
                    order: newOrder
                })
            )
        }
        else{// if the dragging tasks order is more than the other
            firebase.database().ref(`Boards/${boardId}/Tasks`).once('value', snapshot => {
                snapshot.forEach(snap => {
                    if(snap.val().columnId === task.columnId && 
                    snap.val().order >= task.order && 
                    snap.val().order < draggedTask.order){
                        tasks.push({taskId: snap.key, order: snap.val().order})
                    }
                })
            })
            .then(
                tasks.forEach(task => {
                    firebase.database().ref(`Boards/${boardId}/Tasks/${task.taskId}`).update({
                        order: task.order + 1
                    })
                })
            )
            .then(
                firebase.database().ref(`Boards/${boardId}/Tasks/${draggedTask.taskId}`).update({
                    order: newOrder
                })
            )
        }
        
    }
    
}