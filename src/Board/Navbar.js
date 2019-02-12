import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
    selectBoard,
    toggleRemoveColumn,
    toggleAddtask,
    toggleCreateBoard,
    toggleCreateColumn
} from '../actions/navbarActions'

class NavBar extends Component {

    render() {
        const { boards, columns, showBoard } = this.props
        return (
            <div className="topnav"> {/*Navbar*/}
                <div className="brand">Kanban Board</div>
                <div>
                    <button onClick={() => { this.props.toggleCreateBoard() }}>Create Board</button>
                </div>
                {
                    boards.length !== 0 ?
                        <div className="dropdown">

                            <button className="dropbtn">Choose Board</button>
                            <div className="dropdown-content">
                                {boards &&
                                    boards.map(board =>
                                        <button
                                            key={board.boardId}
                                            onClick={() => { this.props.selectBoard(board) }}>{board.boardName}</button>
                                    )
                                }
                            </div>
                        </div>
                        : null
                }

                {
                    showBoard &&
                    <Fragment>
                        <div onClick={() => { this.props.toggleCreateColumn() }}> Create Column</div>
                        <div className="dropdown">
                            <button className="dropbtn">Remove Column</button>
                            <div className="dropdown-content">
                                {columns &&
                                    columns.map(column =>
                                        <button
                                            key={column.columnId}
                                            onClick={() => { this.props.toggleRemoveColumn(column) }}>{column.title}</button>
                                    )
                                }
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="dropbtn">Create Task</button>
                            <div className="dropdown-content">
                                {columns &&
                                    columns.map(column =>
                                        <button
                                            key={column.columnId}
                                            onClick={() => { this.props.toggleAddtask(column) }}>{column.title}</button>
                                    )
                                }
                            </div>
                        </div>
                    </Fragment>

                }
            </div>
        );
    }
}
const mapStatetoProps = ({ NavbarResponse }) => {
    const { showBoard } = NavbarResponse;
    return {
        showBoard,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        selectBoard: bindActionCreators(selectBoard, dispatch),
        toggleRemoveColumn: bindActionCreators(toggleRemoveColumn, dispatch),
        toggleAddtask: bindActionCreators(toggleAddtask, dispatch),
        toggleCreateBoard: bindActionCreators(toggleCreateBoard, dispatch),
        toggleCreateColumn: bindActionCreators(toggleCreateColumn, dispatch)
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(NavBar)