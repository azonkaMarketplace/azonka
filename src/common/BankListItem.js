import React, { Component } from 'react';

class BankListItem extends Component {
    _handleRowClick = (id) => {
        this.props.handleRowClick(id)
    }
    render() {
        return (
            <tr>
                <td>{this.props.bank}</td>
                <td>{this.props.accountName}</td>
                <td>{this.props.accountNumber}</td>
                <td>{this.props.createdAt}</td>
                <td onClick={() => this._handleRowClick(this.props.id)}>
                    <div className="x-delete">
                        <span className="badge badge-danger">
                            <i className="fas fa-pen"></i>
                        </span>
                    </div>
                    
                </td>
            </tr>
        );
    }
}

export default BankListItem;