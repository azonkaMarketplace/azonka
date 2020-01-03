import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";
import Dashboard from '../HOC/Dashboard';

class changePassword extends Component {
    state = { inValidElments: [], currentPassword: '', newPassword:'', confirmPassword: ''}
    componentDidMount(){
        this.props.setActiveLink('changePassword')
    }
    handleFormSubmit = (e) => {
        e.preventDefault()
        if(this.state.currentPassword.trim() === ''){
            return this.props.renderError('Please provide current password')
        }
        if(this.state.newPassword.trim() === ''){
            return this.props.renderError('Please provide new password')
        }
        if(this.state.newPassword.trim() !== this.state.confirmPassword.trim()){
            return this.props.renderError('New Password and Confirm Password do not match')
        }
        this.props.initiateRegistration()
        const {currentPassword, newPassword} = this.state
        this.props.updatePassword({currentPassword, newPassword})
    }
    static getDerivedStateFromProps(nextProps, state){
        if(nextProps.success){
            return {...state, currentPassword: '', newPassword:''}
        }
        return null
    }
    handleInputChange = e => {
        const {target:{name, value}} = e;
        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <Dashboard {...this.props}>
                <h2>Update Password</h2>
                <form action="#">
                            <div className="row">
                                <div className="col-sm-11">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required-field">
                                                <label htmlFor="acc-name">Current Password</label>
                                                <input type="password" value={this.state.currentPassword} onChange={this.handleInputChange} className="form-control" id="acc-name" name="currentPassword" required="" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="acc-mname">New Password</label>
                                                <input type="password" value={this.state.newPassword} onChange={this.handleInputChange} className="form-control" id="acc-mname" name="newPassword" />
                                            </div>
                                        </div>

                                        
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-11">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group required-field">
                                                <label htmlFor="acc-lastname">Confirm Password</label>
                                                <input type="password" value={this.state.confirmPassword} onChange={this.handleInputChange} className="form-control" id="acc-lastname3" name="confirmPassword" required="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="mb-2"></div>
                            <div className="required text-right">* Required Field</div>
                            <div className="form-footer">
                                <Link to="/"><i className="icon-angle-double-left"></i>Back</Link>

                                <div className="form-footer-right">
                                    <button onClick={this.handleFormSubmit} type="submit" className="btn btn-primary">Update</button>
                                </div>
                            </div>
                        </form>
            </Dashboard>
        );
    }
}

const mapStateToProps = state => {
    const {home: {success}} = state
    return {
        success
    }
}

export default connect(mapStateToProps,actions)(changePassword);