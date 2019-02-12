import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
    readBoards,
} from '../actions/boardActions'
import {
    toggleRemoveColumn,
    toggleAddtask,
    toggleCreateBoard,
    toggleCreateColumn,
} from '../actions/navbarActions'

import KanbanBoard from './KanbanBoard'
import NavBar from './Navbar'
import MainPopup from '../Popups/MainPopup'
import Boards from './Boards'

class MainPage extends Component {
    componentWillMount() {
        this.props.readBoards()
    }

    render() {
        const { boards, columns, selectedBoard } = this.props
        return (
            <div>
                <div>
                    <NavBar
                        boards = {boards}
                        columns = {columns}
                    />
                    <div className="main-page">
                        {/*Show popup if condition is true*/}
                            <MainPopup/>
                        {!this.props.showBoard &&
                            <Boards
                            boards={boards}
                            />
                        }
                        
                        {this.props.showBoard &&
                            <KanbanBoard
                                key={selectedBoard.boardId}
                                initBoard={selectedBoard}
                            />
                        }
                    </div>
                </div>

            </div>
        )
    }

}
const mapStatetoProps = ({ BoardResponse, TaskResponse, NavbarResponse }) => {
    const { boards } = BoardResponse;
    const { columns, tasks, columnCount } = TaskResponse;
    const { showBoard, showAddTask, showRemoveColumn, showCreateColumn, showCreateBoard, selectedBoard, removeColumn, addColumn } = NavbarResponse
    return {
        boards,
        columns,
        tasks,
        columnCount,
        showBoard, 
        showAddTask, 
        showRemoveColumn, 
        showCreateColumn, 
        showCreateBoard,
        selectedBoard,
        removeColumn,
        addColumn
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        readBoards: bindActionCreators(readBoards, dispatch),
        toggleRemoveColumn: bindActionCreators(toggleRemoveColumn, dispatch),
        toggleAddtask: bindActionCreators(toggleAddtask, dispatch),
        toggleCreateBoard: bindActionCreators(toggleCreateBoard, dispatch),
        toggleCreateColumn: bindActionCreators(toggleCreateColumn, dispatch),
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(MainPage);
