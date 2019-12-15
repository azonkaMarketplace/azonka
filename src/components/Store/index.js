import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import StoreListItem from "../../common/StoreListItem";
import NoRecordFound from "../../common/NoRecordFound";
import AdminLayout from '../HOC/AdminLayout';
class Store extends Component {
    state = {
        name: '',
        country: '',
        address: '',
        state: '',
        validationMessage: [],
        inValidElments: [],
        actionMode: 'save',
        isoCode: '234',
        id: null
    }
    componentDidMount(){
        this.props.switchActiveLink('shop')
        this.props.initiateRegistration()
        this.props.getStores()
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.resetForm){
            return {...state, name: '', state: '', country: '', address: '', actionMode:'save'}
        }
        return null
    }
    _handleRowClick = (id) => {
        const store = this.props.stores.find(store => store.id === id)
        const {name, address, country, state} = store
        this.setState({
            name,
            address,
            country,
            state,
            actionMode: 'edit',
            id
        })
    }
    validateFormData = (formdata) => {
        const { name, state, country, address} = formdata;
        let isValid = true;
        const inValidElments = []
        const validationMessage = {}
        if(!(name && name.trim() !== '')){
            isValid = false
            inValidElments.push('name')
            
            validationMessage['name'] = 'Store name is required'
        }
        if(!(state && state.trim() !== '')){
            isValid = false;
            inValidElments.push('state')
            validationMessage['state'] = 'Please select state'
        }
        if(!(country && country.trim() !== '')){
            isValid = false;
            inValidElments.push('country')
            validationMessage['country'] = 'Please select country'
        }
        if(!(address && address.trim() !== '')){
            isValid = false;
            inValidElments.push('address')
            validationMessage['address'] = 'Address is required'
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
    processForm = (actionType = 'save') => {
        const {isValid, inValidElments, validationMessage} = this.validateFormData(this.state)
        if(!isValid){
            this.props.renderError('Action cannot be performed,one or more fields required', { appearance: 'error' })
        
            this.setState({
                inValidElments, validationMessage
            })
            
        }

        this.props.initiateRegistration()
        switch(actionType){
            case 'save':
                return this.props.createStore(this.state, 0, 10)
            case 'update':
                return this.props.updateStore(this.state);
            case 'delete':
                return this.props.deleteStore(this.state.id)
            default: 
                return ;
        }
        
    }
    handleFormSubmit = e => {
        e.preventDefault()
        this.processForm()
    }
    handleFormDelete = e => {
        e.preventDefault()
        this.processForm('delete')
    }
    handleFormUpdate = e => {
        e.preventDefault();
        this.processForm('update')
    }
    converToDate = timestamp => {
        const MONTHS = ['January','February', 'March', 'April', 'May', 'June', 'July'
            ,'August','September', 'October', 'November', 'Decemeber']
        const date = new Date(timestamp)
        return `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}`
    }
    _renderStoreList = () => {
            return this.props.stores.map((store, i) => {
                const {id, country, state, address,name, createdAt} = store
               return (<StoreListItem
                    country={country}
                    state={state}
                    name={name}
                    address={address}
                    date={this.converToDate(createdAt)}
                    key={id}
                    id={id}
                    handleRowClick={(id) => this._handleRowClick(id)}
                />)
            })
        
    }
    render() {
        return (
            <AdminLayout>
                <div className="headline buttons primary">
                    <h4>Store</h4>
                </div>
                <div className="add-bank">
                    <h4 className="popup-title verify-email" style={{
                            fontWeight: 'normal',
                            fontFamily: 'Roboto, sans-serif',
                            marginLeft: 20
                        }}>Add Store</h4>
                    <hr className="line-separator" />
                    <form>
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="name" className="rl-label">Store Name</label>
                                            <input type="text" name='name' className={`${this.state.inValidElments.includes('name') ? 'invalid' : '' }`}  
                                                value={this.state.name} onChange={this.handleInputChange} placeholder="Store Name"
                                            />
                                        {
                                                this.state.inValidElments.includes('name') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['name']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="address" className="rl-label">Store Address</label>
                                        <input type="text" id="password5" 
                                            className={`${this.state.inValidElments.includes('address') ? 'invalid' : '' }`} 
                                            value={this.state.address} onChange={this.handleInputChange} 
                                            name="address" placeholder="Store Address" />
                                        {
                                                this.state.inValidElments.includes('address') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['address']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="country" className="rl-label">Country</label>
                                        <select name="country" 
                                                className={`${this.state.inValidElments.includes('country') ? 'invalid' : '' }`}
                                                value={this.state.country} onChange={this.handleInputChange}>
                                                <option value="">Select Country</option>
                                                <option value="Nigeria">Nigeria</option>
                                                
                                            </select>
                                        {
                                                this.state.inValidElments.includes('country') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['country']}
                                                    </div>
                                                ): null 
                                        }
                                        
                                    </div>
                                    <div className="col-md-4 col-sm-12">
                                        <label htmlFor="state" className="rl-label">State</label>
                                         <select name="state" 
                                                className={`${this.state.inValidElments.includes('state') ? 'invalid' : '' }`}
                                                value={this.state.state} onChange={this.handleInputChange}>
                                                <option value="">Select State</option>
                                                <option value="Lagos">Lagos</option>
                                                
                                            </select>
                                        {
                                                this.state.inValidElments.includes('state') ?
                                                (
                                                    <div className="error-message required">
                                                        {this.state.validationMessage['state']}
                                                    </div>
                                                ): null 
                                        }
                                    </div>
                                </div>
                                <div style={{padding: '20px 0 10px'}}>
                                    {
                                        this.state.actionMode === 'save' ? (
                                            <div className="row">
                                                <div className="col-md-8 col-sm-12"></div>
                                                <div className="col-md-4 col-sm-12">
                                                    <button onClick={this.handleFormSubmit} className="button primary" style={{margin:'0 auto'}}>Save</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="row">
                                                <div className="col-md-8 col-sm-12"></div>
                                                <div className="col-md-4 col-sm-12">
                                                    <div style={{marginBottom: 10}}>
                                                        <button onClick={this.handleFormUpdate} className="btn btn-warning" 
                                                        style={{margin:'0 auto',borderColor:'#ffc107',
                                                         background: '#ffc107', width:'100%'}}>Update</button>
                                                    </div>
                                                    <div style={{marginBottom: 10}}>
                                                        <button onClick={this.handleFormDelete} className="btn btn-danger" 
                                                        style={{margin:'0 auto', width:'100%'}}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        
                        </form>
                    <div>
                        <h4 className="popup-title verify-email" style={{
                                fontWeight: 'normal',
                                fontFamily: 'Roboto, sans-serif',
                                marginLeft: 20,
                                marginTop: 30,
                                marginBottom: 10
                            }}>Stores</h4>

                        <table class="table table-hover">
                            <thead class="thead-light">   
                                <th scope="col">Country</th>
                                <th scope="col">State</th>
                                <th scope="col">Shop Adress</th>
                                <th scope="col">Shop Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Action</th>
                            </thead>
                            {
                                this.props.stores.length > 0 ?
                                <tbody>
                                {this._renderStoreList()}
                                </tbody> 
                                
                                : <NoRecordFound />
                            }
                            
                        </table>
                        <div className="pager-wrap">
                                <div className="pager primary">
                                    <div className="pager-item active"><p>1</p></div>
                                    <div className="pager-item "><p>2</p></div>
                                    <div className="pager-item"><p>3</p></div>
                                    <div className="pager-item"><p>...</p></div>
                                    <div className="pager-item"><p>17</p></div>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </AdminLayout>
        );
    }
}
const mapStateToProps = state => {
    const {store: {stores, resetForm, pageNumber, lastId}, home: {
        subCategories, categories
    }} = state;
    return {
        stores,
        resetForm,
        pageNumber,
        lastId,
        subCategories,
        categories
    }
}

export default connect(mapStateToProps, actions)(Store);