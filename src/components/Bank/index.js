import React, { Component, forwardRef } from 'react';
import UserLayout from "../HOC/UserLayout";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import * as actions from "../../actions";

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

class Bank extends Component {
    state = {
        inValidElments: [],
        validationMessage: []
    }
    handleInputChange = e => {

    }
    componentDidMount(){
        this.props.switchActiveLink('bank')
    }
    render() {
        return (
            <UserLayout>
                <div style={{}}>
                    <div className="container">
                        <div className="row cards">
                            <div className="col-sm-12 col-md-6">
                                <div className="card card-container wallet">
                                    <div className="card-box-details">
                                        <div>
                                            <div className="money">
                                                &#x20a6; 25000
                                            </div>
                                            <div className="card-title-money">
                                               Total Balance
                                            </div>
                                        </div>
                                        <div>
                                            <span className="card-icon"><i class="fas fa-wallet"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="card card-container loyalty">
                                <div className="card-box-details">
                                        <div>
                                            <div className="money">
                                                25000
                                            </div>
                                            <div className="card-title-money">
                                               Azonka Credits
                                            </div>
                                        </div>
                                        <div>
                                            <span className="card-icon"><i class="fas fa-coins"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="add-bank">
                    <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif',
                            marginLeft: 20
                        }}>Add Bank</h4>
                        <hr className="line-separator" />
                        <form>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="bankName" className="rl-label">Bank Name</label>
                                            <select name="bankName" 
                                                className={`${this.state.inValidElments.includes('bankName') ? 'invalid' : '' }`}
                                                value={this.state.bankName} onChange={this.handleInputChange}>
                                                <option value="">Select Bank</option>
                                                <option value="0">first Bank</option>
                                                <option value="1">Access Bank</option>
                                            </select>
                                        {
                                                this.state.inValidElments.includes('bankName') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['bankName']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="accountName" className="rl-label">Account Name</label>
                                        <input type="text" id="password5" 
                                            className={`${this.state.inValidElments.includes('accountName') ? 'invalid' : '' }`} 
                                            value={this.state.accountName} onChange={this.handleInputChange} 
                                            name="accountName" placeholder="Account Name" />
                                        {
                                                this.state.inValidElments.includes('bankName') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['bankName']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="accountNumber" className="rl-label">Account Number</label>
                                        <input type="text" id="password5" 
                                            className={`${this.state.inValidElments.includes('accountNumber') ? 'invalid' : '' }`} 
                                            value={this.state.accountNumber} onChange={this.handleInputChange} 
                                            name="accountNumber" placeholder="Account NUmber" />
                                        {
                                                this.state.inValidElments.includes('accountNumber') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['accountNumber']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                </div>
                                <div className="row" style={{padding: '20px 0 10px'}}>
                                    <div className="col-md-8 col-sm-12"></div>
                                    <div className="col-md-4 col-sm-12">
                                        <button className="button primary" style={{margin:'0 auto'}}>Save</button>
                                    </div>
                                </div>
                            </div>
                        
                        </form>
                    </div>
                    <div style={{ maxWidth: "100%" }}>
                        
                        <MaterialTable
                            icons={tableIcons}
                            columns={[
                                {
                                    title: "Bank",
                                    field: "bankName",
                                    lookup: { 0: "First Bank", 1: "Access Bank" }
                                    },
                                { title: "Account Name", field: "accountName" },
                                { title: "Account Number", field: "accountNumber" },
                                { title: "Date Added", field: "dateAdded", type:"date" },
                                
                            ]}
                            data={[
                                { bankName: 0, accountName: "Baran", accountNumber: '020919101', dateAdded: '2019-09-07' },
                                { bankName: 1, accountName: "Baran", accountNumber: '020919101', dateAdded: '2019-09-07' },
                            ]}
                            title=""

                            editable={{
                                isEditable: () => true, // only name(a) rows would be editable
                                isDeletable: (rowData) => true, // only name(a) rows would be deletable
                                onRowAdd: newData =>
                                    
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                console.log('new data', newData)
                                                /* const data = this.state.data;
                                                data.push(newData);
                                                this.setState({ data }, () => resolve()); */
                                            }
                                            resolve();
                                        }, 1000);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                /* const data = this.state.data;
                                                const index = data.indexOf(oldData);
                                                data[index] = newData;                
                                                this.setState({ data }, () => resolve()); */
                                            }
                                            resolve();
                                        }, 1000);
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                /* let data = this.state.data;
                                                const index = data.indexOf(oldData);
                                                data.splice(index, 1);
                                                this.setState({ data }, () => resolve()); */
                                            }
                                            resolve();
                                        }, 1000);
                                    })
                            }}
                        />
                    </div>
                </div>
            </UserLayout>
        );
    }
}

export default connect(null, actions)(Bank);