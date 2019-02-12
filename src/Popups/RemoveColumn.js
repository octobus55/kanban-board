import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import {
    removeColumn
} from '../actions/taskAndColumnActions'

class RemoveColumn extends Component {
    removeColumn = () => {
        const { boardId, column, columnCount} = this.props
        console.log(column)
        this.props.removeColumn(boardId, column.columnId, columnCount) 
        this.props.closePopup() 
    }
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div>
                        <p> Warning</p>
                        <p>If you remove this column all the cards belonging that column will ve also removed</p>
                    </div>
                    <button className="cancelButton" onClick={this.props.closePopup}>Cancel</button>
                    <button className="createButton" onClick={this.removeColumn}>Remove</button>
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removeColumn: bindActionCreators(removeColumn, dispatch)
    };
}
export default connect(null, mapDispatchToProps)(RemoveColumn)