import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Task from './Task'

import {
    createTask,
    readTasks,
    readTaskCount
} from '../actions/taskAndColumnActions'
import {
    onDropTask,
    onDragColumn,
    onDropColumn
} from '../actions/dragAndDropActions'
import {
    toggleAddtask
} from '../actions/navbarActions'

import '../index.css'

class Column extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            width: 0,
        }
    }
    componentWillMount() {
        this.props.readTaskCount(this.props.boardId)
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth });
    };

    createTask = () => {
        const { column, boardId } = this.props
        this.props.createTask(boardId, column.columnId)
    }
    onDragOver = (event) => {
        event.preventDefault();
    }
    onDrop = (event) => {
        const { boardId, draggedTask, columnDragging, column, draggedColumn } = this.props
        console.log(column)
        if (!columnDragging && draggedTask.columnId !== column.columnId) {
            this.props.onDropTask(boardId, column.columnId, column.title, draggedTask, column.taskCount)
        }
        else if (columnDragging) {
            this.props.onDropColumn({ boardId, column, draggedColumn })
        }

    }
    onDragColumn = (event) => {
        const { column } = this.props
        this.props.onDragColumn({ column })
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    render() {
        const { boardId, title, tasks, column } = this.props
        return (
            <div
                onDrop={event => this.onDrop(event)}
                onDragOver={(event => this.onDragOver(event))}
                style={{ minWidth: this.state.width / 5 }}
            >
                <div className="column">
                    <div
                        key={column.columnId}
                        draggable
                        onDrag={event => this.onDragColumn(event)}
                        className="header">
                        <h3>{title}({column.taskCount})</h3>
                    </div>
                    <hr className="hr-header" />
                    {tasks &&
                        tasks.map(task =>
                            <Task
                                key={task.taskId}
                                task={task.columnId === column.columnId ? task : null}
                                columnId={column.columnId} 
                                taskCount={column.taskCount}
                                boardId={boardId}
                                />
                        )
                    }
                    <div>
                        <button className="columnAdd" onClick={() => {this.props.toggleAddtask(column)}}>
                            Create Task
                        </button>
                    </div>
                </div>

            </div>
        )
    }
}

const mapStatetoProps = ({ DragResponse }) => {
    const { draggedTask, columnDragging, draggedColumn } = DragResponse;
    return {
        draggedTask,
        columnDragging,
        draggedColumn
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createTask: bindActionCreators(createTask, dispatch),
        readTasks: bindActionCreators(readTasks, dispatch),
        onDropTask: bindActionCreators(onDropTask, dispatch),
        onDragColumn: bindActionCreators(onDragColumn, dispatch),
        onDropColumn: bindActionCreators(onDropColumn, dispatch),
        readTaskCount: bindActionCreators(readTaskCount, dispatch),
        toggleAddtask: bindActionCreators(toggleAddtask, dispatch)
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(Column)