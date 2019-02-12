import React, { Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
    selectBoard
} from '../actions/navbarActions'

class Boards extends Component {
    render() {
        const { boards } = this.props
        return (
            <div className="boards">
                {
                    boards.map(board =>
                        <div
                            key={board.boardId}
                            class="board col-2"
                            onClick={() => { this.props.selectBoard(board) }}
                        >
                            <h3>{board.boardName}</h3>
                        </div>
                    )
                }
            </div>

        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        selectBoard: bindActionCreators(selectBoard, dispatch),
    };
}
export default connect(null, mapDispatchToProps)(Boards)