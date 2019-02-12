import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
    onDrag,
    taskDroptoTask
} from '../actions/dragAndDropActions'
import TaskEdit from '../Popups/TaskEdit'

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false
        }
    }
    onDrag = (event, task) => {
        event.preventDefault();
        this.props.onDrag({ task })
    }

    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    onDragOver = (event) => {
        event.preventDefault();
    }
    onDrop = (event) => {
        const { boardId, columnDragging, task, draggedTask } = this.props
        if (!columnDragging) {
            this.props.taskDroptoTask(boardId, task, draggedTask)
        }
    }
    render() {
        const { boardId, task } = this.props
        if (task === null) {
            return null
        }
        return (
            this.state.showPopup ?
                <TaskEdit
                    closePopup={this.togglePopup}
                    tags={task.tags}
                    task={task}
                    boardId={boardId}
                />
                :
                <Fragment>
                    <div
                        draggable
                        onDrag={(event) => this.onDrag(event, task)}
                        onDrop={event => this.onDrop(event)}
                        onDragOver={(event => this.onDragOver(event))}
                        onClick={this.togglePopup}
                        className="task"
                    >

                        <div className="tags">
                            {task.tags &&
                                task.tags.map(tag =>
                                    <div 
                                    key={task.taskId + tag}
                                    className={"task-" + tag} />
                                )
                            }
                            {
                                task.comment !== "" && task.comment ?
                                <div>C</div>
                                :
                                null
                            }
                        </div>

                        <h4>{task.title}</h4>
                        {
                            task.summary !== "" ?
                                <p>{task.summary}</p>
                                :
                                <p>{task.description.substring(0, 15)}...</p>
                        }
                        {
                            task.history.createdTime &&
                            <p>{task.history.createdTime.hour} : {task.history.createdTime.minute}</p>
                        }
                    </div>
                    <hr className="hr" />
                </Fragment>

        )
    }
}
const mapStatetoProps = ({ DragResponse }) => {
    const { columnDragging, draggedTask } = DragResponse
    return {
        columnDragging,
        draggedTask
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onDrag: bindActionCreators(onDrag, dispatch),
        taskDroptoTask: bindActionCreators(taskDroptoTask, dispatch)
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(Task);