import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
    addColumn,
    infoChange
} from '../actions/taskAndColumnActions'

class AddColumn extends Component {
    addColumn = () => {
        const { boardId, title, columnCount } = this.props
        this.props.addColumn(boardId, title, columnCount)
        this.props.closePopup()
    }
    handleChange = (event, type) => {
        this.props.infoChange(event.target.value, type)
    }
    render() {
        return (
            <div className='form-popup'>
                <div className='form-container'>
                    <form>
                        <input
                            className="input"
                            type="text"
                            value={this.props.title}
                            onChange={(event) => this.handleChange(event, 'title')}
                            placeholder="Column Title" />
                    </form>
                    <button className="cancelButton" onClick={this.props.closePopup}>Cancel</button>
                    <button className="createButton" onClick={this.addColumn}>Create</button>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = ({ TaskResponse }) => {
    const { title } = TaskResponse
    return {
        title,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        addColumn: bindActionCreators(addColumn, dispatch),
        infoChange: bindActionCreators(infoChange, dispatch)
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(AddColumn)