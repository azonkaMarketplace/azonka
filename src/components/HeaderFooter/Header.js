import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";


import pullIcon from "../../images/pull-icon.png";
import logoHeader from "../../images/logo_header.png";
import searchIcon from "../../images/search-icon.png";
import * as actions from "../../actions";
import logoSmall from "../../images/logo_small.png";
import DropdownItem from "../../common/DropdownItem";
import DropdownTotal from '../../common/DropdownTotal';
import Avatar from '../../common/Avatar';


class Header extends Component {
    state = {featureDrpdown: false,showDrpDownSmall:false,showCartDropDown: false,
         showLeftMenu: false, showRightMenu: false}
    componentDidMount(){
        this.props.fetchUser()
    }
    showCartDropDown = () => {
        this.setState({
            showCartDropDown: true
        })
    }
    hideCartDropdown = () => {
        this.setState({
            showCartDropDown: false
        })
        
    }
    toggleFeatureDrpdown = (event) => {
        event.preventDefault();
        this.setState({
            featureDrpdown: !this.state.featureDrpdown
        })
    }
    toggleLeftMenu = (event) => {
        event.preventDefault();
        this.setState({
            showLeftMenu: !this.state.showLeftMenu
        })
    }
    closeAllMenu = () => {
        this.setState({
            showLeftMenu: false
        })
    }
    toggleRightMenu = (event) => {
        event.preventDefault();
        this.setState({
            showRightMenu: !this.state.showRightMenu
        })
    }
    showSmallDropdown = () => {

    }
    setAccountTypeToSeller = () => {
        sessionStorage.setItem('reg-type', 'seller')
    }
    toggleShowSmallDropdownOpen = () => {
        this.setState({
            showDrpDownSmall: true
        })
    }
    toggleShowSmallDropdownClosed = () => {
        this.setState({
            showDrpDownSmall: false
        })
    }
    sideMenuListItemClick = clikedLink => {
        this.setState({
            showLeftMenu: false,
            showRightMenu: false
        })
    }
    logout = () => {
        this.props.logout()
    }
    updateUserLevel = accountType => {
        console.log('acc', accountType)
    }
    render() {
        const useTag1 = '<use xlink:href="#svg-arrow"></use>'
        const useTag9 = '<use xlink:href="#svg-arrow"></use>'
        let user = this.props.currentUser
        user = Array.isArray(user) ? user[0] : user;
        const cart = this.props.cart
        const likes = this.props.likes
        return (
            <div>
                <section className="account-info-mobile">
                    <div className="account-wishlist-quickview">
                        <Link to={`/users/wishlist`}>
                            <span className="fA-Icon"><i className="far fa-heart"></i></span>
                            <span className="pin soft-edged secondary">{
                                likes && likes.length > 0 ? likes.length : null
                            }</span>
                        </Link>
                    </div>
                    <div className="account-cart-quickview">
                        <Link to="/users/cart">
                            <span className="fA-Icon"><i className="fas fa-shopping-cart"></i></span>
                            <span className="pin soft-edged secondary" style={{color:'#717f82'}}>
                                {
                                    cart && cart.length > 0 ? cart.length : null
                                }
                            </span>
                        </Link>
                    </div>
                </section>
                <div className="header-wrap">
                    
                    <header >
                        {/* LOGO  */}
                        <Link to="/">
                            {/* PUT LOGO FOR DESKTOP */}
                            <figure className="logo">
                                <img src={logoHeader} alt="logo"/>
                            </figure>
                        </Link>

                        <div className="mobile-menu-handler left primary" onClick={this.toggleLeftMenu}>
                            <img src={pullIcon} alt="pull-icon"/>
                        </div>

                        <Link to="/">
                            {/* put logo for mobile */}
                            <figure className="logo-mobile">
                                <img src={logoHeader} alt="logo-mobile" />
                            </figure>
                        </Link>
                        {
                            user ? 
                            <div className="mobile-account-options-handler right secondary"
                               onClick={this.toggleRightMenu}>
                                <div className="user-avatar-placeholder">
                                    <i className="fas fa-user-alt" style={{color:'#fff', fontSize:35}}></i>
                                </div>
                            </div> : null
                        }
                        

                        <div className="user-board">
                            {
                                user ? (
                                    <div className="user-quickview" style={{display:'flex'}} onMouseEnter={this.toggleShowSmallDropdownOpen} onMouseLeave={this.toggleShowSmallDropdownClosed}>
                                        <Link to="/users/profile">
                                            {
                                                user.profileImage.trim() !== '' ? 
                                                    (
                                                        <div className="outer-ring hover-menu"
                                                        // onMouseEnter={this.toggleShowSmallDropdown} onMouseLeave={this.toggleShowSmallDropdown}  ${this.state.showDrpDownSmall? 'open': 'closed'}
                                                        >
                                                                        <div className="inner-ring"></div>
                                                                        <figure className="user-avatar">
                                                                            <img src={user.profileImage} alt="avatar" />
                                                                        </figure>
                                                            
                                                            
                                                        </div>
                                                    )
                                                : <Avatar styles={{width:'40px', height:'40px', fontSize:'1em'}}
                                                name={`${user.firstName.substr(0,1).toUpperCase()}${user.lastName.substr(0,1).toUpperCase()}`} />
                                            }
                                            
                                        </Link>
                                        <div>
                                        <p className="user-name hover-menu" ref="hoverElement"
                                        >{user ? `${user.firstName} ${user.lastName}` : null}</p>
                                        <svg className="svg-arrow  hover-menu" dangerouslySetInnerHTML={{ __html: useTag1 }}
                                            
                                        >

                                        </svg>
                                        {/* <p className="user-money hover-menu"><span>&#8358;</span>{
                                           user && user.wallet ? `${user.wallet}` : `0.00`
                                        }</p> */}
                                        </div>
                                        <ul
                                            className={`dropdown small hover-effect  small-menu ${this.state.showDrpDownSmall? 'open': 'closed'} `}

                                        >
                                            <li className="dropdown-item normalize-sidebar">
                                                <div className="dropdown-triangle"></div>
                                                <Link to="/users/profile"
                                                    onClick={ () => this.sideMenuListItemClick('profile')}
                                                >Profile Page</Link>
                                            </li>
                                            <li className="dropdown-item normalize-sidebar">
                                                <Link to="/users/profile/account"
                                                    onClick={ () => this.sideMenuListItemClick('account-setting')}
                                                >Account Settings</Link>
                                            </li>
                                            <li className="dropdown-item normalize-sidebar">
                                                <Link to="/users/cart">Your Cart</Link>
                                            </li>
                                            {
                                                user && user.type === 'agent' ? 
                                                (
                                                    <li className="dropdown-item normalize-sidebar">
                                                        <Link to={`/users/${user && user.id ? user.id : ''}/referals`}>Referals</Link>
                                                    </li>
                                                ) : null
                                            }
                                            
                                            <li className="dropdown-item normalize-sidebar">
                                                <Link to={`/users/${user && user.id ? user.id : ''}/wishlist`}>WishList</Link>
                                            </li>
                                            <li className="dropdown-item normalize-sidebar">
                                                <Link to="/users/purchases">Your Purchases</Link>
                                            </li>
                                            {
                                                user && user.type === 'seller' ?
                                                (
                                                    <li className="dropdown-item normalize-sidebar">
                                                        <Link to="/users/sales">Sales Statement</Link>
                                                    </li>
                                                ) : null
                                            }
                                            
                                            {
                                                user && user.type === 'user' ?
                                                (
                                                    <li className="dropdown-item normalize-sidebar">
                                                        <Link to="/users/buycredit">Buy Credits</Link>
                                                    </li>
                                                ): null
                                            }
                                            {
                                                user &&  user.type==='agent' ?
                                                (
                                                    <li className="dropdown-item normalize-sidebar">
                                                        <Link to="/users/create-shop">Create Shop</Link>
                                                    </li>
                                                ): null
                                            }
                                            {
                                                user &&  user.type==='agent' ?
                                                (
                                                    <li className="dropdown-item normalize-sidebar">
                                                        <Link to="/users/create-store">Create store</Link>
                                                    </li>
                                                ): null
                                            }
                                            {
                                                user && (user.type === 'agent' || user.type==='seller') ?
                                                (
                                                    <li className="dropdown-item normalize-sidebar">
                                                        <Link to="/users/withdrawal">Withdrawals</Link>
                                                    </li>
                                                ): null
                                            }
                                            {
                                                user && user.type==='seller' ?
                                                (
                                                    <li className="dropdown-item normalize-sidebar">
                                                        <Link to="/users/items/upload">Upload Item</Link>
                                                    </li>
                                                ): null
                                            }
                                            {
                                                user && user.type==='seller' ?
                                                (
                                                    <li className="dropdown-item normalize-sidebar">
                                                        <Link to="/users/items/manage">Manage Items</Link>
                                                    </li>
                                                ): null
                                            }
                                            
                                        </ul>

                                    </div>
                                ) : null
                            }
                            {
                                user ? (
                                    <div className="account-information" style={{display:'flex'}}>
                                        <div to="/users/wishlist" >
                                            <div className="account-wishlist-quickview" style={{marginTop: '-4px'}}>
                                                {/* <span className="icon-heart">
                                                </span> */}
                                                <Link to="/users/wishlist" style={{color:'#717f82'}}>
                                                    <span className="fA-Icon"><i className="far fa-heart"></i></span>
                                                    <span className="pin soft-edged secondary">
                                                        {
                                                            likes && likes.length > 0 ? likes.length : null
                                                        }
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div to="/users/cart" onMouseEnter={this.showCartDropDown}
                                             onMouseLeave={this.hideCartDropdown}>
                                            <div className="account-cart-quickview"  style={{marginTop: '-4px'}}>
                                                {/* <span className="icon-present">
                                                    <svg className="svg-arrow" dangerouslySetInnerHTML={{ __html: userTag2 }}>
                                                    </svg>
                                                </span> */}
                                                <Link to="/users/cart" style={{color:'#717f82'}}>
                                                    <span className="fA-Icon"><i className="fas fa-shopping-cart"></i></span>
                                                    <span className="pin soft-edged secondary">
                                                    {
                                                            cart && cart.length > 0 ? cart.length : null
                                                        }
                                                    </span>
                                                </Link>
                                                <ul className={`dropdown cart ${this.state.showCartDropdown ? 'open' : 'closed'}`}>
                                                    <DropdownItem />
                                                    <DropdownItem />
                                                    <DropdownItem />
                                                    <DropdownItem />
                                                    <DropdownTotal />
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                ) : 
                                    <div className="account-information" style={{display:'flex'}}>
                                        <div to="/users/wishlist">
                                            <div className="account-wishlist-quickview" style={{marginTop: '-4px'}}>
                                                {/* <span className="icon-heart"></span> */}
                                                <Link to="/users/whistlist" style={{color:'#717f82'}}>
                                                    <span className="fA-Icon"><i className="far fa-heart"></i></span>
                                                    <span className="pin soft-edged secondary">{
                                                    likes && likes.length > 0 ? likes.length : null
                                                    }</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div to="/users/cart" onMouseLeave={this.hideCartDropdown}
                                             onMouseEnter={this.showCartDropDown}>

                                            <div className="account-cart-quickview"  style={{marginTop: '-4px'}}>
                                                <Link to="/users/cart" style={{color:'#717f82'}}>
                                                    <span className="fA-Icon"><i className="fas fa-shopping-cart"></i></span>
                                                    <span className="pin soft-edged secondary">
                                                        {
                                                            cart && cart.length > 0 ? cart.length : null
                                                        }
                                                    </span>
                                                </Link>
                                                <ul className={ `dropdown cart ${this.state.showCartDropDown ? 'open' : 'closed'}`}>
                                                    <DropdownItem />
                                                    <DropdownItem />
                                                    <DropdownTotal />
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                
                            }
                            
                            <div className="account-actions">
                               
                                {
                                    user ? 
                                    (
                                        <div  onClick={this.logout} style={{color:'#fff'}} className="button secondary">Logout</div>
                                    )
                                    : 
                                    (
                                    <div>
                                         <Link to="/users/register" style={{color:'#fff'}} onClick={this.setAccountTypeToSeller} className="button primary">SignUp</Link>
                                         <Link to="/users/login" style={{color:'#fff'}} className="button secondary">Login</Link>
                                    </div>)
                                }
                            </div>
                        </div>
                    </header>
                </div>
                <div id="mobile-menu" className={`side-menu left ${this.state.showLeftMenu ? 'open' : 'closed'} `}>
                    {/* <svg className="svg-plus" dangerouslySetInnerHTML={{__html:useTag8}}>
                    </svg> */}
                    <span className="svg-plus" onClick={this.toggleLeftMenu}>+</span>
                    <div className="side-menu-header">
                        {/* <span style={{color: '#fff',margin: '10px', lineHeight:'100px',
                         fontFamily:'Roboto, sans-seriff', fontSize:'1.4em'}}>
                            Azonta Market Place</span> */}
                        <figure className="logo-small logo-side-menu" >
                            <img src={logoSmall} alt="company" />
                        </figure>
                    </div>

                    <p className="side-menu-title">Main Links</p>
                    <ul className="dropdown dark hover-effect interactive">
                        <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick} to="/">Home</Link>
                        </li>
                        {/* <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick}  to="/how-to-shop.html">How to Shop</Link>
                        </li> */}
                        <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick}  to="/products.html">Products</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick}  to="/services.html">Services</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick}  to="/shop-gridview-v1.html">Online Goods</Link>
                        </li>
                        {
                            user && user.type === 'user' ? (
                                <li className="dropdown-item interactive" onClick={this.toggleFeatureDrpdown}>
                                    <Link to="/">
                                        Features
                                        <svg className="svg-arrow" dangerouslySetInnerHTML={{ __html: useTag9 }}>
                                        </svg>
                                    </Link>
                                
                                    <ul className="inner-dropdown" style={{display: `${this.state.featureDrpdown ? 'block': 'none'}`}}>
                                        <li className="inner-dropdown-item" style={{marginBottom: '16px',marginTop:15,
                                         color:'#fff'}}>
                                            <Link to="/users/seller/signup" style={{color:'#fff'}}>Become a seller</Link>
                                        </li>
                                        <li className="inner-dropdown-item" style={{marginBottom: '16px', color:'#fff'}}>
                                            <Link to="/users/agent/signup" style={{color:'#fff'}}>Become an agent</Link>
                                            
                                        </li>
                                    </ul>
                                </li>
                            ): null
                        }
                        
                    </ul>
                    {/* <div>
                        <button className="button secondary login-button" onClick={this.toggleLeftMenu}>
                            <Link to="/users/login" style={{color:"#fff"}}>Login</Link>
                        </button>
                    </div> */}
                    {
                        user ? (
                            <div onClick={this.logout} style={{color:'#fff'}} className="button secondary">Logout</div>
                        ) : (
                            <Link to="/users/login" style={{color:'#fff'}} className="button secondary">Login</Link>
                        )
                    }
                </div>

                <div id="account-options-menu" className={`side-menu right ${this.state.showRightMenu ? 'open' : 'closed' } `}>
                    <span className="svg-plus" onClick={this.toggleRightMenu}>+</span>
                    <div className="side-menu-header">
                        <div className="user-quickview" style={{display:'flex', 
                            paddingLeft: `${user && user.profileImage.trim() !== '' ? '62px' : 0 }`}}>
                            <Link onClick={this.sideMenuListItemClick} to="/users/profile">
                                {
                                    user && user.profileImage.trim() !== '' ? (
                                        <div className="outer-ring">
                                    <div className="inner-ring"></div>
                                    <figure className="user-avatar">
                                        <img src={user.profileImage} alt="avatar" />{/**Johnny Fisher */}
                                    </figure>
                                </div>
                                    ): user ? <Avatar styles={{width:'40px', height:'40px', fontSize:'1em'}}
                                    name={`${user.firstName.substr(0,1).toUpperCase()}${user.lastName.substr(0,1).toUpperCase()}`} />
                                    : null
                                }
                                
                            </Link>
                            <div>
                                <p className="user-name">{user ? `${user.firstName} ${user.lastName}` : null}</p>
                                {/* <p className="user-money"><span>&#8358;</span>{
                                user && user.wallet ? `${user.wallet}` : `0.00`
                                }</p> */}
                            </div>
                            
                        </div>
                    </div>

                    <p className="side-menu-title">Your Account</p>
                    
                    <ul className="dropdown dark hover-effect">
                        <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick} to="/users/cart">Your Cart</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick} to={`/users/wishlist`}>Wishlist</Link>
                        </li>
                    </ul>

                    <p className="side-menu-title">Dashboard</p>
                    <ul className="dropdown dark hover-effect">
                        <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick} to="/users/profile">Recommended For You</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link onClick={this.sideMenuListItemClick} to="/users/profile/account">Account Settings</Link>
                        </li>
                        {
                            user && user.type !== 'user' ? 
                            (
                                <li className="dropdown-item">
                                    <Link onClick={this.sideMenuListItemClick} to={`/users/${user ? user.id: ''}/referals`}>Referals</Link>
                                </li>
                            ) : null
                        }
                        {
                            user && user.type !== 'user' ? 
                            (
                                <li className="dropdown-item">
                                    <Link onClick={this.sideMenuListItemClick} to={`/users/banks`}>Banks</Link>
                                </li>
                            ) : null
                        }
                        
                        <li className="dropdown-item">
                        <Link onClick={this.sideMenuListItemClick} to="/users/purchases">Your Purchases</Link>
                        </li>
                        {
                            user && user.type !== 'user' ?
                            (<li className="dropdown-item">
                                <Link onClick={this.sideMenuListItemClick} to="/users/sales">Sales statement</Link>
                            </li>) : null
                        }
                        
                        {
                            user && user.type === 'user' ?
                            (<li className="dropdown-item">
                                <Link onClick={this.sideMenuListItemClick} to="/users/buycredit">Buy Credit</Link>
                            </li>) : null
                        }
                        {
                            user && user.type !== 'user' ?
                            (<li className="dropdown-item">
                                <Link onClick={this.sideMenuListItemClick} to="/users/create/shop">Create Shop</Link>
                            </li>) : null
                        }
                        {
                            user && user.type !== 'user'  ?
                            (<li className="dropdown-item">
                                <Link onClick={this.sideMenuListItemClick} to="/users/withdrawal">Withdrawal</Link>
                            </li>) : null
                        }
                        {
                            user && user.type !== 'user'  ?
                            (<li className={`dropdown-item`}
                                onClick={() => this.sideMenuListItemClick('create-store')}
                            >
                                <Link onClick={this.sideMenuListItemClick} to="/users/create-store">Create Store</Link>
                            </li>) : null
                        }
                        {
                            user && user.type !== 'user' ?
                            (<li className="dropdown-item">
                                <Link onClick={this.sideMenuListItemClick} to="/users/items/upload">Upload Item</Link>
                            </li>) : null
                        }
                        {
                            user && user.type !== 'user' ?
                            (<li className="dropdown-item">
                                <Link onClick={this.sideMenuListItemClick} to="/users/items/manage">Manage Items</Link>
                            </li>) : null
                        }
                        {
                            user && user.type !== 'user'  ?
                            (<li className="dropdown-item">
                                <Link onClick={this.sideMenuListItemClick} to="/users/customer/review">Customer Review</Link>
                            </li>) : null
                        }
		            </ul>
                    <div onClick={this.logout} className="button medium secondary">Logout</div>
		            {/* <Link to="/" className="button medium primary">Become a Seller</Link> */}
                </div>

                {/* MENU ITEMS*/}

                <div className="main-menu-wrap">
                    <div className="menu-bar">
                        <nav>
                            <ul className="main-menu">
                                <li className="menu-item">
                                    <a href="/">Home</a>
                                </li>
                                <li className="menu-item">
                                    <a href="how-to-shop.html">How to shop</a>
                                </li>
                                <li className="menu-item">
                                    <a href="products.html">Products</a>
                                </li>
                                <li className="menu-item">
                                    <a href="services.html">Services</a>
                                </li>
                                <li className="menu-item">
                                    <a href="shop-gridview-v1.html">Online goods</a>
                                </li>
                                <li className="menu-item sub">
                                    <a href="/">
                                        Features
                                        <svg className="svg-arrow" dangerouslySetInnerHTML={{__html:useTag1}}>
                                        </svg>
                                    </a>
                                    <div className="content-dropdown">
                                        <div className="feature-list-block">
                                            <h6 className="feature-list-title">Azonka Market Place</h6>
                                            <hr className="line-separator"></hr>
                                            <ul className="feature-list">
                                                {/* <li className="feature-list-item">
                                                    <a href="index.html">Homepage V1</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="home-v2.html">Homepage V2</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="itemview-versions.html">Item View Versions</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="shop-gridview-v1.html">Shop Grid View V1</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="shop-gridview-v2.html">Shop Grid View V2</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="shop-listview-v1.html">Shop List View V1</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="shop-listview-v2.html">
                                                        Shop List View V2
                                                        <span className="pin primary">hot</span>
                                                    </a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="author-profile.html">Profile Page</a>
                                                </li> */}
                                            </ul>
                                            <ul className="feature-list">
                                                {/* <li className="feature-list-item">
                                                    <a href="blog-v1.html">Blog Page V1</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="blog-v2.html">Blog Page V2</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="open-post.html">Open Post</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="forum.html">Forum Board</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="subforum.html">Subforum</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="open-topic.html">Open Topic</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="login-register.html">Login and Register</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="menu-dropdowns.html">Menu and Dropdowns</a>
                                                </li> */}
                                            </ul>

                                        </div>
                                        <div className="feature-list-block">
                                            <h6 className="feature-list-title">Product Pages</h6>
                                            <hr className="line-separator"></hr>
                                            <ul className="feature-list">
                                                {/* <li className="feature-list-item">
                                                    <a href="item-v1.html">Item Page V1</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="item-v2.html">
                                                        Item Page V2
                                                        <span className="pin secondary">new</span>
                                                    </a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="product-page.html">Product Page</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="auction-page.html">Auction Page</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="service-page.html">Service Page</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="favourites.html">Favourite Products Grid View</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="favourites-listview.html">Favourite Products List View</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="alerts-notifications.html">Alerts &amp; Notifications</a>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <div className="feature-list-block">
                                            <h6 className="feature-list-title">Dashboard</h6>
                                            <hr className="line-separator"></hr>
                                            <ul className="feature-list">
                                                {/* <li className="feature-list-item">
                                                    <a href="dashboard-settings.html">Account Settings</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="dashboard-statistics.html">Statistics Page</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="dashboard-statement.html">Sales Statement</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="dashboard-inbox.html">Inbox Page</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="dashboard-openmessage.html">Open Message</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="dashboard-uploaditem.html">Upload Page</a>
                                                </li> */}
                                            </ul>
                                        </div>
                                        <div className="feature-list-block">
                                            <h6 className="feature-list-title">Featured</h6>
                                            <hr className="line-separator"></hr>
                                            <ul className="feature-list"> 
                                                {
                                                    user && user.type === 'user' ?
                                                    (
                                                        <li onClick={()=>this.updateUserLevel('seller')} className="button primary" style={{marginBottom:'16px'}} >
                                                            <Link to="/users/seller/signup" style={{color:'#fff'}}>Become a seller</Link>
                                                            
                                                        </li>
                                                    ): null
                                                }    
                                                {
                                                    user && user.type === 'user' ?
                                                    (
                                                        <li onClick={()=>this.updateUserLevel('agen')}  className="button secondary" >
                                                            <Link to="/users/agent/signup" style={{color:'#fff'}}>Become an agent</Link>
                                                        </li>
                                                    ): null
                                                }
                                                {/* <li className="feature-list-item">
                                                    <a href="community-badges.html">Author Badges Page</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="badges.html">All Badges (Big and Small)</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="flag-badges.html">Flag Badges (Big and Small)</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="badges-boxes.html">Badge Boxes Versions</a>
                                                </li>
                                                <li className="feature-list-item">
                                                    <a href="author-badges.html">Public Author Badges</a>
                                                </li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <form className="search-form">
                            <input type="text" className="rounded" name="search" id="search_products" placeholder="Search products here..."/>
                            <input type="image" src={searchIcon} alt="search-icon" />
                        </form>
                    </div>
                </div>
                <svg style={{display: 'none'}}>	
                    <symbol id="svg-arrow" viewBox="0 0 3.923 6.64014" preserveAspectRatio="xMinYMin meet">
                        <path d="M3.711,2.92L0.994,0.202c-0.215-0.213-0.562-0.213-0.776,0c-0.215,0.215-0.215,0.562,0,0.777l2.329,2.329
                            L0.217,5.638c-0.215,0.215-0.214,0.562,0,0.776c0.214,0.214,0.562,0.215,0.776,0l2.717-2.718C3.925,3.482,3.925,3.135,3.711,2.92z"/>
                    </symbol>
                </svg>
            </div>
        );
    }
}

const mapStateToProps = state => {

    const {home: {currentUser, cart, likes}} = state
    return {
        currentUser,
        cart, 
        likes
    }
}

export default connect(mapStateToProps, actions)(Header);