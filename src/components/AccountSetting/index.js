import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";
import * as actions from "../../actions";
import profileImage from "../../images/dashboard/profile-default-image.png";
import { connect } from "react-redux";
class index extends Component {
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
                                    <img src={profileImage} alt="profile-default-image" />
                                </figure>
                                <p className="text-header">Profile Photo</p>
                                <p className="upload-details">Minimum size 70x70px</p>
                            </div>
                            <a href="#" className="button mid-short dark-light">Upload Image...</a>
                        </div>

                        <form id="profile-info-form">
                            <div className="input-container">
                                <label htmlFor="acc_name" className="rl-label required">Account Name</label>
                                <input type="text" id="acc_name" name="acc_name" value="Johnny Fisher" placeholder="Enter your account name here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="new_pwd" className="rl-label">New Password</label>
                                <input type="password" id="new_pwd" name="new_pwd" placeholder="Enter your password here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="new_pwd2" className="rl-label">Repeat Password</label>
                                <input type="password" id="new_pwd2" name="new_pwd2" placeholder="Repeat your password here..." />
                            </div>
                            <div className="input-container">
                                <label htmlFor="new_email" className="rl-label">Email</label>
                                <input type="email" id="new_email" name="new_email" placeholder="Enter your email address here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="website_url" className="rl-label">Website</label>
                                <input type="text" id="website_url" name="website_url" placeholder="Enter your website link here..." />
                            </div>
                            <div className="input-container half">
                                <label htmlFor="country1" className="rl-label required">Country</label>
                                <label htmlFor="country1" className="select-block">
                                    <select name="country1" id="country1">
                                        <option value="0">Select your State/City...</option>
                                        <option value="Nigeria">Nigeria</option>
                                    </select>
                                </label>
                            </div>
                            <div className="input-container">
                                <label htmlFor="about" className="rl-label">About</label>
                                <input type="text" id="about" name="about" placeholder="This will appear bellow your avatar... (max 140 char)" />
                            </div>
                            <div className="input-container">
                                <label className="rl-label">Preferences</label>
                                <input type="checkbox" id="show_balance" name="show_balance" checked />
                                <label htmlFor="show_balance" className="label-check">
                                    <span className="checkbox primary"><span></span></span>
                                    Show account balance in the status bar
                                </label>
                                <input type="checkbox" id="email_notif" name="email_notif" />
                                <label htmlFor="email_notif" className="label-check">
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
                            <input type="text" form="profile-info-form" id="first_name2" name="first_name2" placeholder="Enter your first name here..."/>
					    </div>
                        <div className="input-container half">
                            <label htmlFor="last_name2" className="rl-label required">Last Name</label>
                            <input type="text" form="profile-info-form" id="last_name2" name="last_name2" placeholder="Enter your last name here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email_address2" className="rl-label required">Email Address</label>
                            <input type="email" form="profile-info-form" id="email_address2" name="email_address2" placeholder="Enter your email address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="country2" className="rl-label required">Country</label>
                            <label htmlFor="country2" className="select-block">
                                <select form="profile-info-form" name="country2" id="country2">
                                    <option value="0">Select your Country...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="state_city2" className="rl-label required">State/City</label>
                            <label htmlFor="state_city2" className="select-block">
                                <select form="profile-info-form" name="state_city2" id="state_city2">
                                    <option value="0">Select your State/City...</option>
                                    <option value="Nigeria">Nigeria</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="zipcode2" className="rl-label required">Zip Code</label>
                            <input form="profile-info-form" type="text" id="zipcode2" name="zipcode2" placeholder="Enter your Zip Code here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="address2" className="rl-label required">Full Address</label>
                            <input form="profile-info-form" type="text" id="address2" name="address2" placeholder="Enter your address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="notes2" className="rl-label">Aditional Notes</label>
                            <textarea form="profile-info-form" id="notes2" name="notes2" placeholder="Enter aditional notes here..."></textarea>
                        </div>
                        <div className="input-container">
                            <input type="checkbox" form="profile-info-form" id="copy_shipping" name="copy_shipping"  />
                            <label htmlFor="copy_shipping" className="label-check">
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
                            <input type="text" form="profile-info-form" id="first_name2" name="first_name2" placeholder="Enter your first name here..."/>
					    </div>
                        <div className="input-container half">
                            <label htmlFor="last_name2" className="rl-label required">Last Name</label>
                            <input type="text" form="profile-info-form" id="last_name2" name="last_name2" placeholder="Enter your last name here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="company_name2" className="rl-label">Company Name</label>
                            <input type="text" form="profile-info-form" id="company_name2" name="company_name2" placeholder="Enter your company name here..."></input>
                        </div>
                        <div className="input-container">
                            <label htmlFor="email_address2" className="rl-label required">Email Address</label>
                            <input type="email" form="profile-info-form" id="email_address2" name="email_address2" placeholder="Enter your email address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="country2" className="rl-label required">Country</label>
                            <label htmlFor="country2" className="select-block">
                                <select form="profile-info-form" name="country2" id="country2">
                                    <option value="0">Select your Country...</option>
                                    <option value="1">United States</option>
                                    <option value="2">Argentina</option>
                                    <option value="3">Brasil</option>
                                    <option value="4">Japan</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="state_city2" className="rl-label required">State/City</label>
                            <label htmlFor="state_city2" className="select-block">
                                <select form="profile-info-form" name="state_city2" id="state_city2">
                                    <option value="0">Select your State/City...</option>
                                    <option value="1">New York</option>
                                    <option value="2">Buenos Aires</option>
                                    <option value="3">Brasilia</option>
                                    <option value="4">Tokyo</option>
                                </select>
                            </label>
                        </div>
                        <div className="input-container half">
                            <label htmlFor="zipcode2" className="rl-label required">Zip Code</label>
                            <input form="profile-info-form" type="text" id="zipcode2" name="zipcode2" placeholder="Enter your Zip Code here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="address2" className="rl-label required">Full Address</label>
                            <input form="profile-info-form" type="text" id="address2" name="address2" placeholder="Enter your address here..."/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="notes2" className="rl-label">Aditional Notes</label>
                            <textarea form="profile-info-form" id="notes2" name="notes2" placeholder="Enter aditional notes here..."></textarea>
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