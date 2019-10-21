import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";
import * as actions from "../../actions";
import profileImage from "../../images/dashboard/profile-default-image.png";
import { connect } from "react-redux";

class index extends Component {
    state = {
        profileInformation: {},
        billingInformation: {},
        shippingInformation: {},
        copyToShip: false,
        showBalanceInStatusBar: true,
        sendEmails: true
    }
    componentDidMount(){
        this.props.switchActiveLink('account-setting')
    }
    handleInputChange = ({event, field}) => {
        const { target: {name, value}} = event;

        this.setState({
            [field] : {...this.state[field], [name]: value}
        })
    }
    copyToShipInformation = (event) => {
        this.setState({
            copyToShip: !this.state.copyToShip
        }, () => {
            if(this.state.copyToShip){
                this.setState({
                    shippingInformation: {...this.state.billingInformation}
                })
            }
        })
    }
    toggleSendEmailNotification = (event) => {
        this.setState({
            sendEmails: !this.state.sendEmails
        })
    }
    toggleShowAccountBalance = (event) => {
        this.setState({
            showBalanceInStatusBar: !this.state.showBalanceInStatusBar
        })
    }
    render() {
        return (
            <UserLayout>
                <div className="headline buttons primary">
                    <h4>Account Settings</h4>
                    <button form="profile-info-form" className="button mid-short primary">Save Changes</button>
                </div>
                <div className="form-box-items">
                    <div className="form-box-item">
                        <h4>Profile Information</h4>
                        <hr className="line-separator" />
                        <div className="profile-image">
                            <div className="profile-image-data">
                                <figure className="user-avatar medium">
                                    <img src={profileImage} alt="profile-default" />
                                </figure>
                                <p className="text-header">Profile Photo</p>
                                <p className="upload-details">Minimum size 70x70px</p>
                            </div>
                            <a href="/" className="button mid-short dark-light">Upload Image...</a>
                        </div>

                        <form id="profile-info-form">
                            <div className="input-container">
                                <label htmlFor="acc_name" className="rl-label required">Account Name</label>
                                <input type="text" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="acc_name" name="acc_name" value={this.state.profileInformation.acc_name} placeholder="Enter your account name here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="new_pwd" className="rl-label">New Password</label>
                                <input type="password" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="new_pwd" name="new_pwd" value={this.state.profileInformation.new_pwd} placeholder="Enter your password here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="new_pwd2" className="rl-label">Repeat Password</label>
                                <input type="password" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} id="new_pwd2" name="new_pwd2" value={this.state.profileInformation.new_pwd2} placeholder="Repeat your password here..." />
                            </div>
                            <div className="input-container">
                                <label htmlFor="new_email" className="rl-label">Email</label>
                                <input type="email" id="new_email" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} name="new_email" value={this.state.profileInformation.new_email} placeholder="Enter your email address here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="website_url" className="rl-label">Website</label>
                                <input type="text" id="website_url" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} name="website_url" value={this.state.profileInformation.website_url} placeholder="Enter your website link here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="country" className="rl-label required">Country</label>
                                <label htmlFor="country" className="select-block">
                                    <select name="country" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} value={this.state.profileInformation.country} id="country1">
                                        <option value="0">Select your State/City...</option>
                                        <option value="Nigeria">Nigeria</option>
                                    </select>
                                </label>
                            </div>
                            <div className="input-container">
                                <label htmlFor="about" className="rl-label">About</label>
                                <input type="text" id="about" onChange={(event) => this.handleInputChange({event, field:'profileInformation'})} value={this.state.profileInformation.about} name="about" placeholder="This will appear bellow your avatar... (max 140 char)" />
                            </div>
                            <div className="input-container">
                                <label className="rl-label">Preferences</label>
                                <input type="checkbox" id="show_balance" onChange={this.handleInputChange} checked={this.state.showBalanceInStatusBar} value={this.state.profileInformation.show_balance} name="show_balance" />
                                <label htmlFor="show_balance" onClick={this.toggleShowAccountBalance} className="label-check">
                                    <span className="checkbox primary"><span></span></span>
                                    Show account balance in the status bar
                                </label>
                                <input type="checkbox" onChange={this.handleInputChange} value={this.state.profileInformation.email_notif} checked={this.state.sendEmails} id="email_notif" name="email_notif" />
                                <label htmlFor="email_notif" onClick={this.toggleSendEmailNotification} className="label-check">
                                    <span className="checkbox primary"><span></span></span>
                                    Send me email notifications
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="form-box-item">
                        <h4>Biling Information</h4>
                        <hr className="line-separator"/>
                        <div className="input-container half">
                            <label htmlFor="first_name2" className="rl-label required">First Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="text" form="profile-info-form" id="first_name2" value={this.state.billingInformation.firstName} name="firstName" placeholder="Enter your first name here..."/>
					    </div>
                        <div className="input-container half">
                            <label htmlFor="last_name2" className="rl-label required">Last Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="text" form="profile-info-form" value={this.state.billingInformation.lastName} id="last_name2" name="lastName" placeholder="Enter your last name here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email_address2" className="rl-label required">Email Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} type="email" value={this.state.billingInformation.email} form="profile-info-form" id="email_address2" name="email" placeholder="Enter your email address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="country2" className="rl-label required">Country</label>
                            <label htmlFor="country2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} value={this.state.billingInformation.country} form="profile-info-form" name="country" id="country2">
                                    <option value="0">Select your Country...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="state_city2" className="rl-label required">State/City</label>
                            <label htmlFor="state_city2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} value={this.state.billingInformation.city} form="profile-info-form" name="city" id="state_city2">
                                    <option value="0">Select your State/City...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="zipcode2" className="rl-label required">Zip Code</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} form="profile-info-form" value={this.state.billingInformation.zipcode} type="text" id="zipcode2" name="zipcode" placeholder="Enter your Zip Code here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="address2" className="rl-label required">Full Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} form="profile-info-form" value={this.state.billingInformation.address} type="text" id="address" name="address" placeholder="Enter your address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="notes2" className="rl-label">Aditional Notes</label>
                            <textarea onChange={(event) => this.handleInputChange({event, field:'billingInformation'})} value={this.state.billingInformation.note} form="profile-info-form" id="notes2" name="note" placeholder="Enter aditional notes here..."></textarea>
                        </div>
                        <div className="input-container">
                            <input type="checkbox" onChange={this.handleInputChange} form="profile-info-form" id="copy_shipping" checked={this.state.copyToShip} name="copy_shipping"  />
                            <label htmlFor="copy_shipping" onClick={this.copyToShipInformation} className="label-check">
                                <span className="checkbox primary"><span></span></span>
                                Copy information to shipping
                            </label>
                        </div>
                    </div>
                    <div className="form-box-item last-item">
                        <h4>Shipping Information</h4>
                        <hr className="line-separator"/>
                        <div className="input-container half">
                            <label htmlFor="first_name2" className="rl-label required">First Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} type="text" form="profile-info-form" id="first_name21" value={this.state.shippingInformation.firstName} name="firstName" placeholder="Enter your first name here..."/>
					    </div>
                        <div className="input-container half">
                            <label htmlFor="last_name2" className="rl-label required">Last Name</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} type="text" form="profile-info-form" value={this.state.shippingInformation.lastName} id="last_name21" name="lastName" placeholder="Enter your last name here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email_address2" className="rl-label required">Email Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} type="email" value={this.state.shippingInformation.email} form="profile-info-form" id="email_address21" name="email" placeholder="Enter your email address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="country2" className="rl-label required">Country</label>
                            <label htmlFor="country2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} value={this.state.shippingInformation.country} form="profile-info-form" name="country" id="country21">
                                    <option value="0">Select your Country...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="state_city2" className="rl-label required">State/City</label>
                            <label htmlFor="state_city2" className="select-block">
                                <select onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} value={this.state.shippingInformation.city} form="profile-info-form" name="city" id="state_city21">
                                    <option value="0">Select your State/City...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="zipcode2" className="rl-label required">Zip Code</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} form="profile-info-form" value={this.state.shippingInformation.zipcode} type="text" id="zipcode21" name="zipcode" placeholder="Enter your Zip Code here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="address2" className="rl-label required">Full Address</label>
                            <input onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} form="profile-info-form" value={this.state.shippingInformation.address} type="text" id="address1" name="address" placeholder="Enter your address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="notes2" className="rl-label">Aditional Notes</label>
                            <textarea onChange={(event) => this.handleInputChange({event, field:'shippingInformation'})} value={this.state.shippingInformation.note} form="profile-info-form" id="notes2" name="note1" placeholder="Enter aditional notes here..."></textarea>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(index);