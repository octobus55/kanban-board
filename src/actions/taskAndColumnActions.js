import firebase from '../config/firebase'
import {
    READ_TASK,
    READ_COLUMN,
    READ_COLUMN_COUNT,
    INFO_CHANGED,
    TASK_COUNT,
    COLUMN_REMOVE,
    CREATE_TASK,
    CREATE_COLUMN
} from './types'

export const createTask = (boardId, columnId, columnTitle, title, taskCount, description, tags, summary, comment) => (dispatch) => {
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
    var createdTime = {
        day: day,
        date: date,
        month: month,
        year: year,
        hour: hour,
        minute: minute,
        seconds: seconds,
        milliseconds: milliseconds,
        createdColumnTitle: columnTitle,
    }
    var history = {
        createdTime: createdTime
    }
    //Fri Dec 14 2018 19:35:49 GMT+0300 (GMT+03:00)
    firebase.database().ref(`Boards/${boardId}/Tasks`).push({
        title, columnTitle, columnId, description, history, tags, order: taskCount.taskCount + 1, summary, comment
    })
    .then(incrementTaskCount(boardId, columnId, taskCount.taskCount))
    .then(dispatch({ type: CREATE_TASK}))
    //.then() TODO: dispatch and make loading
}

export const incrementTaskCount = (boardId, columnId, taskCount) => {
    var temp = taskCount + 1
    firebase.database().ref(`Boards/${boardId}/Columns/${columnId}`).update({
        taskCount: temp
    })
}

export const decrementTaskCount = (boardId, columnId) => {
    var temp = 0;
    firebase.database().ref(`Boards/${boardId}/Columns/${columnId}`).once('value', snapshot => {
        temp = snapshot.val().taskCount - 1
    })
        .then(
            firebase.database().ref(`Boards/${boardId}/Columns/${columnId}`).update({
                taskCount: temp
            })
        )

}

export const readTaskCount = (boardId) => (dispatch) => {

    firebase.database().ref(`Boards/${boardId}/Columns`).orderByChild('order').on('value', snapshot => {
        var temp = []
        snapshot.forEach(snap => {
            const taskCount = { columnId: snap.key, taskCount: snap.val().taskCount, order: snap.val().order }
            temp.push(taskCount)
        })
        dispatch({
            type: TASK_COUNT,
            payload: temp
        })
    })
}

export const readColumnCount = (boardId) => (dispatch) => {
    firebase.database().ref(`Boards/${boardId}`).on('value', snapshot => {
        dispatch({
            type: READ_COLUMN_COUNT,
            payload: snapshot.val().columnCount
        })
    })
}
export const addColumn = (boardId, title, columnCount) => (dispatch) => {
    return new Promise((resolve => {
        var order = columnCount + 1;
        var taskCount = 0;
        firebase.database().ref(`Boards/${boardId}/Columns`).push({
            title,
            order,
            taskCount
        })
        .then(
            firebase.database().ref(`Boards/${boardId}`).update({
                columnCount: order
            })
        )
        .then(dispatch({
            type: CREATE_COLUMN
        }))
        .then(resolve())
    }))
        

}
export const readColumn = (boardId) => (dispatch) => {
    firebase.database().ref(`Boards/${boardId}/Columns`).orderByChild('order')
        .on('value', snapshot => {
            var columnArray = []
            snapshot.forEach(snap => {
                const column = {
                    title: snap.val().title,
                    columnId: snap.key,
                    order: snap.val().order,
                    taskCount: snap.val().taskCount
                }
                columnArray.push(column)
            })
            dispatch({
                type: READ_COLUMN,
                payload: columnArray
            })
        })
}

export const readTasks = (boardId) => (dispatch) => {
    firebase.database().ref(`Boards/${boardId}/Tasks`).orderByChild('order').on("value", snapshot => {
        var taskArray = []
        snapshot.forEach(snap => {
            const task = {
                title: snap.val().title,
                taskId: snap.key,
                columnId: snap.val().columnId,
                columnTitle: snap.val().columnTitle,
                description: snap.val().description,
                history: snap.val().history,
                tags: snap.val().tags,
                order: snap.val().order,
                summary: snap.val().summary,
                comment: snap.val().comment
            }
            taskArray.push(task)
        })
        dispatch({
            type: READ_TASK,
            payload: taskArray
        })
    })
}

export const infoChange = (value, props) => (dispatch) => {
    dispatch({
        type: INFO_CHANGED,
        payload: { value, props }
    });
}
export const removeColumn = (boardId, columnId, columnCount) => (dispatch) => {
    firebase.database().ref(`Boards/${boardId}/Columns/${columnId}`)
        .remove()
        .then(
            firebase.database().ref(`Boards/${boardId}`).update({
                columnCount: columnCount - 1
            })
        )
        .then(() => {
            var deletingTasks = []
            firebase.database().ref(`Boards/${boardId}/Tasks`).once('value', snapshot => {
                snapshot.forEach(snap => {
                    if (snap.val().columnId === columnId) {
                        deletingTasks.push(snap.key)
                    }
                })
            })
                .then(() => {
                    deletingTasks.forEach(task => {
                        firebase.database().ref(`Boards/${boardId}/Tasks/${task}`)
                        .remove()
                    })
                }
                )
        })
        .then(
            dispatch({
                type: COLUMN_REMOVE,
            })
        )
}
export const editTask = (boardId, taskId, description, tags, title) => (dispatch) => {
    firebase.database().ref(`Boards/${boardId}/Tasks/${taskId}`).update({
        description, tags, title
    })
}

export const removeTask = (boardId, taskId, columnId) => (dispatch) => {
    console.log(taskId)
    firebase.database().ref(`Boards/${boardId}/Tasks/${taskId}`)
    .remove()
    .then(decrementTaskCount(boardId, columnId))
}
