import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../actions";
import UserLayout from "../HOC/UserLayout";

class changePassword extends Component {
    state = { inValidElments: [], currentPassword: '', newPassword:''}
    handleFormSubmit = (e) => {
        if(!this.state.currentPassword){
            return this.props.renderError('Please provide current password')
        }
        if(!this.state.newPassword){
            return this.props.renderError('Please provide new password')
        }
        if(this.state.currentPassword.trim() !== '' && this.state.newPassword.trim() !== ''){
            this.props.initiateRegistration()
            const {currentPassword, newPassword} = this.state
            this.props.updatePassword({currentPassword, newPassword})
        }else{
            this.props.renderError('Please provide current password')
        }
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
            <UserLayout>
                <div className="headline buttons primary">
                    <h4>Reset Password</h4>
                    <button form="profile-info-form" onClick={this.handleFormSubmit} className="button mid-short primary">Save Changes</button>
                </div>
                <div className="resetpassword-container container-fluid">
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                            <label htmlFor="currentPassword" className="rl-label">Current Password</label>
                            <input type="password" id="currentPassword"
                                className={`${this.state.inValidElments.includes('currentPassword') ? 'invalid' : '' }`}
                                value={this.state.currentPassword} onChange={this.handleInputChange} 
                                name="currentPassword" placeholder="Current password..." />
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <label htmlFor="newPassword" className="rl-label">New Password</label>
                            <input type="password" id="newPassword"
                                className={`${this.state.inValidElments.includes('newPassword') ? 'invalid' : '' }`}
                                value={this.state.newPassword} onChange={this.handleInputChange} 
                                name="newPassword" placeholder="New password..." />
                        </div>
                    </div>
                </div>
            </UserLayout>
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