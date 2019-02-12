import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import {
    readColumn,
    readTasks,
    readColumnCount,
    addColumn
} from '../actions/taskAndColumnActions'
import {
    finishInitiliaze
}from '../actions/boardActions'

import Column from './Column'


class KanbanBoard extends Component {
    componentWillMount() {
        const { selectedBoard } = this.props
        console.log(selectedBoard)
        if(!selectedBoard.initiliaze){
            this.props.addColumn(selectedBoard.boardId, "Todo", selectedBoard.columnCount)
            .then(this.props.addColumn(selectedBoard.boardId, "In Progress", selectedBoard.columnCount + 1))
            .then(this.props.addColumn(selectedBoard.boardId, "Done", selectedBoard.columnCount + 2))
            .then(this.props.finishInitiliaze(selectedBoard.boardId))
        }
        this.props.readColumn(selectedBoard.boardId)
        this.props.readTasks(selectedBoard.boardId)
        this.props.readColumnCount(selectedBoard.boardId)
    }
    

    render() {
        const { columns, tasks, selectedBoard } = this.props;
        return (
            <div>
                <div className="kanban-board">
                    
                    {columns &&
                        columns.map(column =>
                            <Column
                                key={column.columnId}
                                column={column}
                                title={column.title}
                                tasks={tasks}
                                boardId = {selectedBoard.boardId}
                            />
                        )
                    }

                </div>
            </div>

        );
    }
}
const mapStatetoProps = ({ TaskResponse, NavbarResponse }) => {
    const { columns, tasks } = TaskResponse;
    const { selectedBoard } = NavbarResponse
    return {
        columns,
        tasks,
        selectedBoard
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        readColumn: bindActionCreators(readColumn, dispatch),
        readTasks: bindActionCreators(readTasks, dispatch),
        readColumnCount: bindActionCreators(readColumnCount, dispatch),
        addColumn: bindActionCreators(addColumn, dispatch),
        finishInitiliaze: bindActionCreators(finishInitiliaze, dispatch)
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(KanbanBoard);
