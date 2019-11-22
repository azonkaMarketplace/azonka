import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";
import { connect } from "react-redux";
import * as actions from "../../actions";

import ReferralItem from "../../common/ReferralItem";
import NoRecordFound from "../../common/NoRecordFound";

class index extends Component {
    constructor(props){
        super(props)
        this.state = { currentPageCount: 10, lastIndex: 4, limit:0}
        this.referralCode = React.createRef()
        this.referralLink = React.createRef()
        this.refCode = React.createRef();
        this.refLink = React.createRef()
    }
    componentDidMount(){
        this.props.switchActiveLink('referals')
        const { match: {params: {id}}} = this.props
        console.log('parmas', id)
    }
    copyToClipBoard = ( emitter, targetElement) => {
        this[`${targetElement}`].current.select()
        document.execCommand("copy");
        this[`${emitter}`].current.classList.add('copied-container')
        setTimeout(() => {
            this[`${emitter}`].current.classList.remove('copied-container')
        }, 3000)
    }
    renderReferrals = () => {
        const referral = this.props.currentUser ? [...this.props.currentUser.referrals, 
                ...this.props.currentUser.referredSellers] : []
        return referral.length > 0 ? (
            referral.map(element => (
                <ReferralItem 
                    date={element.date}
                    fullName={element.fullName}
                    email={element.email}
                    type={element.type}
                />
            ))
        ): <NoRecordFound />
    }
    render() {
        console.log('current user', this.props.currentUser)
        const user = this.props.currentUser ? this.props.currentUser  : {}
        const {referralCode} = user;
        return (
            <UserLayout>
                <div className="headline buttons primary">
                    <h4>Referral Details</h4>
                </div>
                <div className="rerral-block">
                    <div className="ref-div">
                        <div className="ref-heading">
                            <span>Referral Code</span>
                            <div className="ref-icon" ref={this.refCode} onClick={(e) => this.copyToClipBoard('refCode','referralCode')}>
                                <span><i className="far fa-clipboard"></i></span>
                            </div>
                        </div>
                        <div className="ref-text">
                            <textarea className="select-area" readOnly ref={this.referralCode}  value={`${referralCode }`}></textarea>
                        </div>
                    </div>
                    <div className="ref-div">
                        <div>
                            <div className="ref-heading">
                                <span>Referral Link</span>
                                <div className="ref-icon" ref={this.refLink} onClick={(e) => this.copyToClipBoard('refLink','referralLink')}>
                                    <span><i className="far fa-clipboard"></i></span>
                                </div>
                                
                            </div>
                        </div>
                        <div className="ref-text">
                        <textarea className="select-area referralLink" readOnly ref={this.referralLink} 
                         value={`http://167.99.154.149:1337/users/register?referral=${referralCode}`}></textarea>
                        </div>
                    </div>
                </div>
                <div className="headline buttons primary">
                    <h4>Referrals</h4>
                </div>
                <div className="transaction-list">
                    <div className="transaction-list-header" >
                        <div className="transaction-list-header-date" style={{width:'25%'}}>
                            <p className="text-header small">Date</p>
                        </div>
                        <div className="transaction-list-header-author" style={{width:'30%'}}>
                            <p className="text-header small">Full Name</p>
                        </div>
                        <div className="transaction-list-header-item email-header" style={{width:'30%'}}>
                            <p className="text-header small">Email Address</p>
                        </div>
                        <div className="transaction-list-header-item mobile-header" style={{width:'100%'}}>
                            <p className="text-header small">Referrals</p>
                        </div>
                        <div className="transaction-list-header-detail" style={{width:'15%'}}>
                            <p className="text-header small">Type</p>
                        </div>
                        <div className="transaction-list-header-icon"></div>
                    </div>
                    {this.renderReferrals()}
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
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    const {home: { currentUser}} = state;
    return {
        currentUser
    }
}

export default connect(mapStateToProps, actions)(index);