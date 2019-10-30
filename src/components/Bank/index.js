import React, { Component, forwardRef } from 'react';
import UserLayout from "../HOC/UserLayout";
import { connect } from "react-redux";
import MaterialTable from "material-table";
import { withToastManager } from 'react-toast-notifications';
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
import ErrorAlert from "../../common/ErrorAlert";
import SuccessAlert from "../../common/SuccessAlert";

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
        validationMessage: [],
        banks: []
    }
    validateFormData = (formdata) => {
        const { accountNumber, accountName, longcode,} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(longcode && longcode.trim() !== '')){
            isValid = false
            inValidElments.push('longcode')
            
            validationMessage['longcode'] = 'Please select Bank'
        }
        if(!(accountName && accountName.trim() !== '')){
            isValid = false;
            inValidElments.push('accountName')
            validationMessage['accountName'] = 'Account Name required'
        }
        if(!(accountNumber && accountNumber.trim() !== '')){
            isValid = false;
            inValidElments.push('accountNumber')
            validationMessage['accountNumber'] = 'Account Number required'
        }
        return {
            isValid,
            validationMessage,
            inValidElments,
            formdata
        }
    }
    handleInputChange = e => {
        const {target:{ name, value}} = e
        const index = this.state.inValidElments.indexOf(name)
        let newInvalidElements = []
        if(index !== -1){
            this.state.inValidElments.splice(index, 1)
        }
        newInvalidElements = [...this.state.inValidElments]
        this.setState({
            [name]: value,
            newInvalidElements
        })
    }
    renderLookUp = () => {
        const lookupdata = {}
        this.props.banks.forEach((element) => {
            lookupdata[element.longcode] = element.name
        })
        return lookupdata
    }
    componentDidMount(){
        this.props.switchActiveLink('bank')
        this.props.getBanks()
        this.props.getSavedBanks();
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.banks.length > 0){
            return {...state, banks: nextProps.banks}
        }
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.processForm()
    }
    processForm = (target = null) => {
        const {isValid, inValidElments, validationMessage} = this.validateFormData(this.state)
        const {add} = this.props.toastManager;
        if(!isValid){
            if(target === 'data-table-add'){
                add('Action cannot be performed,one or more fields required', { appearance: 'error' })
            }else{
                this.setState({
                    inValidElments, validationMessage
                })
            }
            
        }
        const selectedBank = this.state.banks.filter(element => element.longcode === this.state.longcode)
        const {accountNumber, accountName} = this.state
        if(selectedBank.length > 0){
            const bankDetails = selectedBank[0]
           return this.props.saveBank({
                ...bankDetails, accountName, accountNumber
            })
        }
        console.log('some errror were encounteered')
    }
    closeSnackBar = () => {
        this.props.closeSnackBar()
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
                                            <span className="card-icon"><i className="fas fa-wallet"></i></span>
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
                                            <span className="card-icon"><i className="fas fa-coins"></i></span>
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
                                            <select name="longcode" 
                                                className={`${this.state.inValidElments.includes('longcode') ? 'invalid' : '' }`}
                                                value={this.state.longcode} onChange={this.handleInputChange}>
                                                <option value="">Select Bank</option>
                                                {
                                                    this.props.banks.map(({name, longcode}, i) => (
                                                        <option key={i} value={longcode}>{name}</option>
                                                    ))
                                                }
                                                
                                            </select>
                                        {
                                                this.state.inValidElments.includes('longcode') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['longcode']}
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
                                                this.state.inValidElments.includes('accountName') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['accountName']}
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
                                        <button onClick={this.handleFormSubmit} className="button primary" style={{margin:'0 auto'}}>Save</button>
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
                                    field: "longcode",
                                    lookup: this.renderLookUp()
                                    },
                                { title: "Account Name", field: "accountName" },
                                { title: "Account Number", field: "accountNumber" },
                                { title: "Date Added", field: "createdAt", type:"date",
                                render: rowData => {
                                    const createdDate = new Date(rowData.createdAt)
                                    const LocalDate = createdDate.getDate() + '-' + (createdDate.getMonth() + 1) + '-'+ createdDate.getFullYear()
                                    
                                    return LocalDate
                                }
                                },
                                
                            ]}
                            data={this.props.savedBanks}
                            title=""

                            editable={{
                                isEditable: () => true, // only name(a) rows would be editable
                                isDeletable: (rowData) => true, // only name(a) rows would be deletable
                                onRowAdd: newData =>
                                    
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                const $ = this;
                                                const longcode = newData.longcode
                                                const accountName = newData.accountName
                                                const accountNumber = newData.accountNumber
                                                this.setState({
                                                    longcode,
                                                    accountName,
                                                    accountNumber
                                                }, () => $.processForm('data-table-add'))
                                            }
                                            resolve();
                                        }, 1000);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                const longcode = newData.longcode
                                                const accountName = newData.accountName
                                                const accountNumber = newData.accountNumber

                                                console.log({longcode, accountNumber, accountName})
                                            }
                                            resolve();
                                        }, 1000);
                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                const longcode = oldData.longcode
                                                const accountName = oldData.accountName
                                                const accountNumber = oldData.accountNumber

                                                console.log({longcode, accountNumber, accountName})
                                            }
                                            resolve();
                                        }, 1000);
                                    })
                            }}
                        />
                    </div>
                    <SuccessAlert 
                    open={this.props.showSuccessBar} closeSnackBar={this.closeSnackBar}
                    message={this.props.successMessage} 
                />
                <ErrorAlert open={this.props.error} closeSnackBar={this.closeSnackBar} errorMessage={this.props.errorMessage} />
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    const {bank:{ loading, error, errorMessage, successMessage, 
        showSuccessBar, banks, savedBanks}} = state;
    const sortedBanks = banks.sort((item1, item2) => item1.name.toLowerCase() > item2.name.toLowerCase() )
    return {
        banks: sortedBanks,
        loading,
        error,
        errorMessage,
        successMessage,
        showSuccessBar,
        savedBanks
    }
}

export default connect(mapStateToProps, actions)(withToastManager(Bank));