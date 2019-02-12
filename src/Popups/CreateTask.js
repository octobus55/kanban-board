import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
    createTask,
    infoChange
} from '../actions/taskAndColumnActions'

class CreateTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            red: false,
            blue: false,
            green: false,
            yellow: false
        }
    }

    createTask = () => {
        const { boardId, columnId, columnTitle, taskName, taskCounts, order, description, summary, comment } = this.props
        const {blue, green, red, yellow} = this.state
        var tags = []
        if(red === true){
            tags.push("red")
        }
        if(blue === true){
            tags.push("blue")
        }
        if(green === true){
            tags.push("green")
        }
        if(yellow === true){
            tags.push("yellow")
        }
        this.props.createTask(boardId, columnId, columnTitle, taskName, taskCounts[order - 1], description, tags, summary, comment)
        this.props.closePopup()
    }
    handleInputChange = (event) => {
        const name = event.target.name;
    
        this.setState({
          [name]: event.target.checked
        });
    }
    handleChange = (event, type) => {
        if(type === 'summary' && event.target.value.length > 25){
            return;
        }
        this.props.infoChange(event.target.value, type)
    }
    render() {
        return (
            <div className='form-popup'>
                <div className='form-container'>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input 
                            className="input"
                            type="text"
                            value={this.props.taskName}
                            onChange={(event) => this.handleChange(event, 'taskName')}
                            placeholder="Task Title"
                        />
                        <label>
                            Red:
                        <input
                                name="red"
                                type="checkbox"
                                checked={this.state.red}
                                onChange={this.handleInputChange} />
                        </label>
                        <label>
                            Blue:
                        <input
                                name="blue"
                                type="checkbox"
                                checked={this.state.blue}
                                onChange={this.handleInputChange} />
                        </label>
                        <label>
                            Green:
                        <input
                                name="green"
                                type="checkbox"
                                checked={this.state.green}
                                onChange={this.handleInputChange} />
                        </label>
                        <label>
                            Yellow:
                        <input
                                name="yellow"
                                type="checkbox"
                                checked={this.state.yellow}
                                onChange={this.handleInputChange} />
                        </label>
                        <textarea value={this.props.summary}
                            onChange={(event) => this.handleChange(event, 'summary')}
                            placeholder="Please write a summary for the task"
                            className="input"
                        />
                        <textarea value={this.props.description}
                            onChange={(event) => this.handleChange(event, 'description')}
                            placeholder="Please write description for the task"
                            className="input"
                            rows="3"
                        />
                        <textarea value={this.props.comment}
                            onChange={(event) => this.handleChange(event, 'comment')}
                            placeholder="Please write a comment if necessary"
                            className="input"
                            rows="3"
                        />
                    </form>
                    <button className="cancelButton" onClick={this.props.closePopup}>Cancel</button>
                    <button className="createButton" onClick={this.createTask}>Create</button>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = ({ TaskResponse }) => {
    const { taskName, taskCounts, description, summary, comment } = TaskResponse
    return {
        taskName,
        taskCounts,
        description,
        summary,
        comment
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createTask: bindActionCreators(createTask, dispatch),
        infoChange: bindActionCreators(infoChange, dispatch)
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(CreateTask)