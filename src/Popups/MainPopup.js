import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
    toggleRemoveColumn,
    toggleAddtask,
    toggleCreateBoard,
    toggleCreateColumn
} from '../actions/navbarActions'
import CreateBoard from './CreateBoard'
import AddColumn from './AddColumn'
import RemoveColumn from './RemoveColumn'
import CreateTask from './CreateTask'
class MainPopup extends Component {
    render() {
        const { columnCount, selectedBoard, addColumn } = this.props
        return(
            <div>
                 {/*Show popup if condition is true*/}
                 {this.props.showCreateBoard &&
                            <CreateBoard
                                closePopup={this.props.toggleCreateBoard}
                            />
                        }

                        {this.props.showCreateColumn &&
                            <AddColumn
                                closePopup={this.props.toggleCreateColumn}
                                columnCount={columnCount}
                                boardId={selectedBoard.boardId}
                            />
                        }
                        {this.props.showRemoveColumn &&
                            <RemoveColumn
                                closePopup={this.props.toggleRemoveColumn}
                                columnCount={columnCount}
                                column={this.props.removeColumn}
                                boardId={selectedBoard.boardId}
                            />
                        }
                        {this.props.showAddTask &&
                            <CreateTask
                                key={addColumn.columnId}
                                columnId={addColumn.columnId}
                                columnTitle={addColumn.title}
                                order={addColumn.order}
                                closePopup={this.props.toggleAddtask}
                                boardId={selectedBoard.boardId}
                            />
                        }
            </div>
        )
    }
}
const mapStatetoProps = ({ TaskResponse, NavbarResponse }) => {
    const { columnCount } = TaskResponse;
    const { showAddTask, showRemoveColumn, showCreateColumn, showCreateBoard, selectedBoard, removeColumn, addColumn } = NavbarResponse
    return {
        columnCount,
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
        toggleRemoveColumn: bindActionCreators(toggleRemoveColumn, dispatch),
        toggleAddtask: bindActionCreators(toggleAddtask, dispatch),
        toggleCreateBoard: bindActionCreators(toggleCreateBoard, dispatch),
        toggleCreateColumn: bindActionCreators(toggleCreateColumn, dispatch),
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(MainPopup)