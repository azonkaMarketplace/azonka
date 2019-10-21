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
        return currentUser ? currentUser.imageUrl ? (
            <img src={currentUser.imageUrl} alt="avatar" />            
        ): <Avatar className={classes.orangeAvatar}>{currentUser.emailAddress.substr(0,2).toUpperCase()}</Avatar>
        : null
    }
    sideMenuListItemClick = clickedItem => {
        this.props.switchActiveLink(clickedItem)
    }
    render() {
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
                                    <p className="text-header">Full Name</p>
                                    <p>Charles Onuorah</p>
                                </div>
                                <div className="author-profile-info-item">
                                    <p className="text-header">Total Sales:</p>
                                    <p>820</p>
                                </div>
                                <div className="author-profile-info-item">
                                    <p className="text-header">Email Adress</p>
                                    <p>charles.onuorah@yahoo.com</p>
                                </div>
                                <div className="author-profile-info-item">
                                    <p className="text-header">Contact Number</p>
                                    <p>08163113450</p>
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
                                    <p className="text-header" style={{paddingTop:'20px'}}>Odin_Design</p>
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
                                        <a href="author-profile-messages.html">Cart</a>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'wishlist'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('wishlist')}
                                    >
                                        <a href="author-profile-reviews.html">Wishlist</a>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'purchases'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('purchases')}
                                    >
                                        <a href="author-profile-followers.html">Your Purchases</a>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'sales-statement'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('sales-statement')}
                                    >
                                        <a href="author-profile-following.html">Sales Statement</a>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'buy-credit'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('buy-credit')}
                                    >
                                        <a href="author-badges.html">Buy Credits</a>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'withdrawal'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('withdrawal')}
                                    >
                                        <a href="author-badges.html">Withdrawal</a>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'create-store'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('create-store')}
                                    >
                                        <a href="author-badges.html">Create Store</a>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'uploadItem'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('uploadItem')}
                                    >
                                        <a href="author-badges.html">Upload Item</a>
                                    </li>
                                    <li className={`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'manageItems'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('manageItems')}
                                    >
                                        <a href="author-badges.html">Manage Items</a>
                                    </li>
                                    <li 
                                    className=
                                    {`dropdown-item normalize-sidebar ${this.props.homeActiveLink === 'customer-review'? 'active': ''}`}
                                        onClick={() => this.sideMenuListItemClick('customer-review')}
                                    >
                                        <a href="author-badges.html">Customer Review</a>
                                    </li>
                                </ul>
                                {/*END*/}
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
        margin: 10,
        paddingBottom: 20,
        width: 80,
        height: 80
      },
      orangeAvatar: {
        margin: 10,
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