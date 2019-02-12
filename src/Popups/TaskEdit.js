import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
    infoChange,
    editTask,
    removeTask
} from '../actions/taskAndColumnActions'

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            description: "",
            summary: "",
            title: "",
            comment: "",
            red: false,
            blue: false,
            green: false,
            yellow: false,
        }
    }
    componentWillMount() {
        const { task } = this.props
        this.setState({
            description: task.description,
            title: task.title,
            summary: task.summary,
            comment: task.comment,
        })
        if (task.tags && task.tags.includes("red")) {
            this.setState({
                red: true
            })
        }
        if (task.tags && task.tags.includes("blue")) {
            this.setState({
                blue: true
            })
        }
        if (task.tags && task.tags.includes("green")) {
            this.setState({
                green: true
            })
        }
        if (task.tags && task.tags.includes("yellow")) {
            this.setState({
                yellow: true
            })
        }
    }
    handleInputChange = (event) => {
        const target = event.target
        const value = target.checked
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    onDrag = (event, task) => {
        event.preventDefault();
        this.props.onDrag({ task })
    }
    handleChange = (event, type) => {
        this.setState({
            [type]: event.target.value
        })
    }
    editTask = () => {
        const { boardId, task } = this.props
        const { description, title, blue, green, red, yellow } = this.state
        const tags = []
        if (red === true) {
            tags.push("red")
        }
        if (blue === true) {
            tags.push("blue")
        }
        if (green === true) {
            tags.push("green")
        }
        if (yellow === true) {
            tags.push("yellow")
        }
        this.props.editTask(boardId, task.taskId, description, tags, title)
        this.props.closePopup()
    }
    removeTask = () => {
        const { boardId, task } = this.props
        this.props.removeTask(boardId, task.taskId, task.columnId)
        this.props.closePopup()
    }
    render() {
        const { task } = this.props
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div
                        className="task-edit"
                    >
                        <input
                            className="editInput"
                            type="text"
                            value={this.state.title}
                            onChange={(event) => this.handleChange(event, 'title')}
                            style={{ width: 200 }}
                        />
                        {
                            task.description &&
                            <textarea
                                className="editInput"
                                value={this.state.description}
                                onChange={(event) => this.handleChange(event, 'description')}
                                rows='10'
                            />
                        }
                        {
                            <textarea
                                className="editInput"
                                value={this.state.summary}
                                onChange={(event) => this.handleChange(event, 'summary')}
                                placeholder="Please write a summary for the task"
                            />
                        }
                        {
                            <textarea
                                className="editInput"
                                value={this.state.comment}
                                onChange={(event) => this.handleChange(event, 'comment')}
                                placeholder="Please write a comment if necessary"
                            />
                        }

                        <label style={{marginLeft: 11}}>
                            Red:
                        <input
                                name="red"
                                type="checkbox"
                                checked={this.state.red}
                                onChange={this.handleInputChange}
                                style={{marginLeft: 10}} />
                        </label>
                        <label style={{marginLeft: 11}}>
                            Blue:
                        <input
                                name="blue"
                                type="checkbox"
                                checked={this.state.blue}
                                onChange={this.handleInputChange}
                                style={{marginLeft: 10}} />
                        </label>
                        <label style={{marginLeft: 11}}>
                            Green:
                        <input
                                name="green"
                                type="checkbox"
                                checked={this.state.green}
                                onChange={this.handleInputChange}
                                style={{marginLeft: 10}} />
                        </label>
                        <label style={{marginLeft: 11}}>
                            Yellow:
                        <input
                                name="yellow"
                                type="checkbox"
                                checked={this.state.yellow}
                                onChange={this.handleInputChange}
                                style={{marginLeft: 10}} />
                        </label>

                        {
                            task.history.createdTime &&
                            <p style={{marginLeft: 11}}> Create Time {task.history.createdTime.hour} : {task.history.createdTime.minute}</p>
                        }
                        {
                            task.history.lastDragInfo &&
                            <p style={{marginLeft: 11}}>Task lastly moved from {task.history.lastDragInfo.columnTitle} to {task.columnTitle} at: {task.history.lastDragInfo.lastDragTime.hour} : {task.history.lastDragInfo.lastDragTime.minute}</p>
                        }
                    </div>
                    <button className="cancelButton" onClick={this.props.closePopup}>Cancel</button>
                    <button className="editButton" onClick={this.editTask}>Edit</button>
                    <button className="createButton" onClick={this.removeTask}>Remove</button>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        infoChange: bindActionCreators(infoChange, dispatch),
        editTask: bindActionCreators(editTask, dispatch),
        removeTask: bindActionCreators(removeTask, dispatch)
    };
}
export default connect(null, mapDispatchToProps)(TaskEdit);