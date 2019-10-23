import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import withStyles from "@material-ui/core/styles/withStyles";
import * as actions from "../../actions";

class UserLayout extends Component {

    componentDidMount(){

        this.props.fetchUser()
    }
    renderReferral = () => {
        const {currentUser} = this.props;
        if(currentUser && currentUser.type === 'agent')
            return (
                <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'referals'? 'active': ''}`}
                    onClick={() => this.sideMenuListItemClick('referals')}
                >
                    <Link to={`/users/${currentUser.id}/referals`}>Referals</Link>
                </li>
            )
        return null
    }
    renderAvatar = () => {
        const {currentUser, classes} = this.props
        return currentUser ? currentUser.profileImage ? (
            <img src={currentUser.profileImage} alt="avatar" />            
        ): <Avatar className={classes.orangeAvatar}>{`${currentUser.firstName.substr(0,1).toUpperCase()}${currentUser.lastName.substr(0,1).toUpperCase()}`}</Avatar>
        : null
    }
    sideMenuListItemClick = clickedItem => {
        this.props.switchActiveLink(clickedItem)
    }
    render() {
        const {currentUser} = this.props
        return (
            <div>
                <div>
                    <div className="section-headline-wrap">
                        <h2 className="hide-on-sm">Dashboard</h2>
                        <div className="section-headline">
                            <h2>Dashboard</h2>
                        </div>
                    </div>
                    <div className="author-profile-meta-wrap">
                        <div className="author-profile-meta">
                            
                            <div className="author-profile-info">
                                <div className="author-profile-info-item">
                                    <p className="text-header">{currentUser && currentUser.type === 'seller'
                                    ? 'Company Name' : 'Full Name'
                                }</p>
                                    <p>{
                                        currentUser ? currentUser.type === 'seller' ?
                                        currentUser.companyName : `${currentUser.firstName} ${currentUser.lastName}`
                                        : null
                                    }</p>
                                </div>
                                {
                                    currentUser && currentUser.type === 'seller' ?
                                    (
                                        <div className="author-profile-info-item">
                                            <p className="text-header">Total Sales:</p>
                                            <p>{currentUser && currentUser.sales ? currentUser.sales : 0}</p>
                                        </div>
                                    ) : null
                                }
                                <div className="author-profile-info-item">
                                    <p className="text-header">Email Adress</p>
                                    <p>{currentUser && currentUser.emailAddress ? currentUser.emailAddress : null}</p>
                                </div>
                                <div className="author-profile-info-item">
                                    <p className="text-header">Contact Number</p>
                                    <p>{currentUser && currentUser.phoneNumber ? currentUser.phoneNumber : null}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="section-wrap">
                        <div className="section overflowable">
                            
                            <div className="sidebar left author-profile">
                                {/*START*/}
                                <div className="sidebar-item author-bio">
                                    <a href="user-profile.html" className="user-avatar-wrap medium">
                                        <figure className="user-avatar medium">
                                            {this.renderAvatar()}
                                        </figure>
                                    </a>
                                    <p className="text-header" style={{paddingTop:'20px'}}>{
                                      currentUser ?  `${currentUser.firstName} ${currentUser.lastName}` : null
                                    }</p>
                                    <ul className="share-links">
                                        <li><span className="fb"></span></li>
                                        <li><span className="twt"></span></li>
                                        <li><span className="db"></span></li>
                                    </ul>
                                </div>
                                <ul className="dropdown hover-effect">
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'profile'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('profile')}
                                    >
                                        <Link to="/users/profile">Profile Page</Link>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'account-setting'? 'active': ''}`}
                                        onClick={ () => this.sideMenuListItemClick('account-setting')}
                                    >
                                        <Link to="/users/profile/account">Account Setting</Link>
                                    </li>
                                    {this.renderReferral()}
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'cart'? 'active': ''}`}
                                    onClick={() => this.sideMenuListItemClick('cart')}
                                    >
                                        <Link to="/users/cart">Cart</Link>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'wishlist'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('wishlist')}
                                    >
                                        <Link to={`/users/${currentUser ? currentUser.id: ''}/wishlist`}>Wishlist</Link>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'purchases'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('purchases')}
                                    >
                                        <Link to="/users/purchases">Your Purchases</Link>
                                    </li>
                                    {
                                        currentUser && currentUser.type === 'seller' ?
                                        (
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'sales-statement'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('sales-statement')}
                                            >
                                                <Link to="/users/sales">Sales statement</Link>
                                            </li>
                                        ) : null
                                    }
                                    {
                                        currentUser && currentUser.type === 'user' ?
                                        (
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'buy-credit'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('buy-credit')}
                                            >
                                                <Link to="/users/buycredit">Buy Credit</Link>
                                            </li>
                                        ) : null
                                    }
                                    {
                                        currentUser && (currentUser.type === 'agent' || currentUser.type === 'seller')
                                          ?
                                        (
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'withdrawal'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('withdrawal')}
                                            >
                                                <Link to="/users/withdrawal">Withdrawal</Link>
                                            </li>
                                        ): null
                                    }
                                    {
                                        currentUser && (currentUser.type === 'agent' || currentUser.type === 'seller')
                                          ?
                                        (
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'bank'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('bank')}
                                            >
                                                <Link to="/users/banks">Banks</Link>
                                            </li>
                                        ): null
                                    }
                                    {
                                        currentUser && currentUser.type === 'seller' ?
                                        (
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'create-store'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('create-store')}
                                            >
                                                <Link to="/users/create-store">Create Store</Link>
                                            </li>
                                        ) : null
                                    }
                                    {
                                        currentUser && currentUser.type === 'agent' ?
                                        (
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'create-shop'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('create-shop')}
                                            >
                                                <Link to="/users/create/shop">Create Shop</Link>
                                            </li>
                                        ) : null
                                    }
                                    {
                                        currentUser && currentUser.type === 'seller' ?
                                        (
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'uploadItem'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('uploadItem')}
                                            >
                                                <Link to="/users/items/upload">Upload Item</Link>
                                            </li>
                                        ) : null
                                    }
                                    {
                                        currentUser && currentUser.type === 'seller' ?
                                        (
                                            <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'manageItems'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('manageItems')}
                                            >
                                                <Link to="/users/items/manage">Manage Items</Link>
                                            </li>
                                        ) : null
                                    }
                                    {
                                        currentUser && currentUser.type === 'seller' ?
                                        (
                                            <li 
                                            className=
                                            {`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'customer-review'? 'active': ''}`}
                                                onClick={() => this.sideMenuListItemClick('customer-review')}
                                            >
                                                <Link to="/users/customer/review">Customer Review</Link>
                                            </li>
                                        ) : null
                                    }
                                    
                                    
                                </ul>
                                {/*END*/}
                                {this.props.homeActiveLink === 'cart' ? (
                                    <div class="sidebar-item">
                                        <h4>Redeem Code</h4>
                                        <hr className="line-separator" />
                                        <form id="coupon-code-form">
                                            <input type="text" name="coupon_code" placeholder="Enter your coupon code..."/>
                                            <button className="button mid secondary">Apply Coupon Code</button>
                                        </form>
                                    </div>
                                ) : null}
                            </div>
                            <div className="content right">
                                <div>

                                </div>
                                {this.props.children}
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

const styles = theme => ({
    avatar: {
        // margin: 10,
        paddingBottom: 20,
        width: 80,
        height: 80
      },
      orangeAvatar: {
        // margin: 10,
        color: '#fff',
        width: 80,
        height: 80,
        fontSize: '2em',
        backgroundColor: deepOrange[500],
      },
      purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
      },
})

const mapStateToProps = state => {
    const {home: { currentUser, cart, likes, homeActiveLink}} = state;
    return {
        currentUser, 
        cart,
        likes,
        homeActiveLink
    }
}
export default connect(mapStateToProps, actions)(withStyles(styles)(UserLayout));