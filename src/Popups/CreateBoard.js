import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
    createBoard,
    onBoardNameChange
} from '../actions/boardActions'

class CreateBoard extends Component {

    createBoard = () => {
        console.log("createBoard")
        const { boardName } = this.props
        this.props.createBoard(boardName)
        this.props.closePopup()
    }
    handleChange = (event) => {
        this.props.onBoardNameChange(event.target.value)
    }
    render() {
        return (
            <div className='form-popup'>
                <div className='form-container'>
                    <form className="form" onSubmit={this.handleSubmit}>
                        <input 
                            className="input"
                            type="text"
                            value={this.props.boardName}
                            onChange={(event) => this.handleChange(event)}
                            placeholder="Board Name"
                        />
                    </form>
                    <button className="cancelButton" onClick={this.props.closePopup}>Cancel</button>
                    <button className="createButton" onClick={this.createBoard}>Create</button>
                </div>
            </div>
        );
    }
}
const mapStatetoProps = ({ BoardResponse }) => {
    const { boardName } = BoardResponse
    return {
        boardName
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createBoard: bindActionCreators(createBoard, dispatch),
        onBoardNameChange: bindActionCreators(onBoardNameChange, dispatch)
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(CreateBoard)