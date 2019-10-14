import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import pullIcon from "../../images/pull-icon.png";
import avatar_01 from "../../images/avatars/avatar_01.jpg";
import avatar_02 from "../../images/avatars/avatar_02.jpg";
import avatar_03 from "../../images/avatars/avatar_03.jpg";
import avatar_04 from "../../images/avatars/avatar_04.jpg";
import avatar_05 from "../../images/avatars/avatar_05.jpg";
import avatar_06 from "../../images/avatars/avatar_06.jpg";
// import avatar_07 from "../../images/avatars/avatar_07.png";
import logo_mobile from "../../images/logo_mobile.png";
import pixel_s from "../../images/items/pixel_s.jpg";
import monsters_s from "../../images/items/monsters_s.jpg";
import flat_s from "../../images/items/flat_s.jpg"
import avatar_08 from "../../images/avatars/avatar_08.jpg"
import searchIcon from "../../images/search-icon.png";


class Header extends Component {
    state = {featureDrpdown: false, showLeftMenu: false, showRightMenu: false}
    componentDidMount(){
        this.watchForMouseOverEvent()
    }
    watchForMouseOverEvent = () => {
        Array.from(document.querySelectorAll('.hover-menu')).forEach(element => {
            const $drpMenu = document.querySelector('.small-menu')
            element.addEventListener('mouseenter', (e) => {
                if($drpMenu.classList.contains('closed')){
                    $drpMenu.classList.remove('closed')
                    $drpMenu.classList.add('open')
                }
            })
            
        })
        document.querySelector('body').addEventListener('click', (e) => {
            const $drpMenu = document.querySelector('.small-menu')
            if($drpMenu.classList.contains('open')){
                $drpMenu.classList.remove('open')
                $drpMenu.classList.add('closed')
            }
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
    toggleShowSmallDropdown = () => {
        console.log('called')
        // this.setState({
        //     showDrpDownSmall: !this.state.showDrpDownSmall
        // })
    }
    render() {
        const useTag1 = '<use xlink:href="#svg-arrow"></use>'
        const userTag2 = '<use xlink:href="#svg-arrow"></use>'
        const useTag3 = '<use xlink:href="#svg-plus"></use>'
        const useTag4 = '<use xlink:href="#svg-plus"></use>'
        const useTag5 = '<use xlink:href="#svg-plus"></use>'
        const useTag6 = '<use xlink:href="#svg-arrow"></use>'
        const useTag7 = '<use xlink:href="#svg-arrow"></use>'
        const useTag9 = '<use xlink:href="#svg-arrow"></use>'
        return (
            <div>
                <div className="header-wrap">
                    <header >
                        {/* LOGO  */}
                        <Link to="/">
                            <figure className="logo">
                                <img src={logo} alt="logo"/>
                            </figure>
                        </Link>

                        <div className="mobile-menu-handler left primary" onClick={this.toggleLeftMenu}>
                            <img src={pullIcon} alt="pull-icon"/>
                        </div>

                        <Link to="/index.html">
                            <figure className="logo-mobile">
                                <img src={logo_mobile} alt="logo-mobile" />
                            </figure>
                        </Link>

                        <div className="mobile-account-options-handler right secondary" onClick={this.toggleRightMenu}>
                            <span className="icon-user"></span>
                        </div>

                        <div className="user-board">
                            <div className="user-quickview">
                                <Link to="/author-profile.html">
                                    <div className="outer-ring hover-menu"
                                        // onMouseEnter={this.toggleShowSmallDropdown} onMouseLeave={this.toggleShowSmallDropdown}
                                    >
                                        <div className="inner-ring"></div>
                                        <figure className="user-avatar">
                                            <img src={avatar_01} alt="avatar"/>
                                        </figure>
                                    </div>
                                </Link>
                                <p className="user-name hover-menu" ref="hoverElement" 
                                    // onMouseEnter={this.toggleShowSmallDropdown} onMouseLeave={this.toggleShowSmallDropdown}
                                >Johnny Fisher</p>
                                <svg className="svg-arrow  hover-menu" dangerouslySetInnerHTML={{__html: useTag1}}
                                    // onMouseEnter={this.toggleShowSmallDropdown} onMouseLeave={this.toggleShowSmallDropdown}
                                >
                                    
                                </svg>
                                <p className="user-money hover-menu">$745.00</p>
                                
                                <ul 
                                    className={`dropdown small hover-effect closed small-menu `}
                                    
                                    >
                                    <li className="dropdown-item">
                                        <div className="dropdown-triangle"></div>
                                        <Link to="/author-profile.html">Profile Page</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to="/dashboard-settings.html">Account Settings</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to="/dashboard-purchases.html">Your Purchases</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to="/dashboard-statement.html">Sales Statement</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to="/dashboard-buycredits.html">Buy Credits</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to="/dashboard-withdrawals.html">Withdrawals</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to="/dashboard-uploaditem.html">Upload Item</Link>
                                    </li>
                                    <li className="dropdown-item">
                                        <Link to="/dashboard-manageitems.html">Manage Items</Link>
                                    </li>
                                </ul>

                            </div>
                            <div className="account-information">
                                <Link to="/favourites.html">
                                    <div className="account-wishlist-quickview">	
                                        <span className="icon-heart"></span>
                                    </div>
                                </Link>
                                <div className="account-cart-quickview">
                                    <span className="icon-present">
                                        <svg className="svg-arrow" dangerouslySetInnerHTML={{__html:userTag2}}>
                                        </svg>
                                    </span>
                                    <span className="pin soft-edged secondary">7</span>
                                    <ul className="dropdown cart closed">
                                        <li className="dropdown-item">
                                            <Link to="/item-v1.html" className="link-to"></Link>
                                            <svg className="svg-plus" dangerouslySetInnerHTML={{ __html: useTag3 }}>
                                            </svg>
                                            <div className="dropdown-triangle"></div>
                                            <figure className="product-preview-image tiny">
                                                <img src={pixel_s} alt="pixels" />
                                            </figure>
                                            <p className="text-header tiny">Pixel Diamond Gaming Shop</p>
                                            <p className="category tiny primary">Shopify</p>
                                            <p className="price tiny"><span>$</span>86</p>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/item-v1.html" className="link-to"></Link>
                                            <svg className="svg-plus" dangerouslySetInnerHTML={{ __html: useTag4 }} >
                                            </svg>
                                            <figure className="product-preview-image tiny">
                                                <img src={monsters_s} alt="monsters" />
                                            </figure>
                                            <p className="text-header tiny">Little Monsters - 40 Pack Button Badge Maker</p>
                                            <p className="category tiny primary">Graphics</p>
                                            <p className="price tiny"><span>$</span>10</p>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/item-v1.html" className="link-to"></Link>
                                            <svg className="svg-plus" dangerouslySetInnerHTML={{ __html: useTag5 }}>
                                            </svg>
                                            <figure className="product-preview-image tiny">
                                                <img src={flat_s} alt="flat" />
                                            </figure>
                                            <p className="text-header tiny">Flatland - Hero Image Composer</p>
                                            <p className="category tiny primary">Shopify</p>
                                            <p className="price tiny"><span>$</span>12</p>
                                        </li>
                                        <li className="dropdown-item">
                                            <p className="text-header tiny">Total</p>
                                            <p className="price"><span>$</span>108.00</p>
                                            <Link to="/cart.html" className="button primary half">Go to Cart</Link>
                                            <Link to="/checkout.html" className="button secondary half">Go to Checkout</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="account-email-quickview">
                                    <span className="icon-envelope">
                                        <svg className="svg-arrow" dangerouslySetInnerHTML={{__html:useTag6}}>
                                        </svg>
                                    </span>
                                    <span className="pin soft-edged secondary">!</span>

                                    <ul className="dropdown notifications closed">
                                        <li className="dropdown-item">
                                            <div className="dropdown-triangle"></div>
                                            <Link to="/dashboard-openmessage.html" className="link-to"></Link>
                                            <figure className="user-avatar">
                                                <img src={avatar_06} alt="avatar" />
                                            </figure>
                                            <p className="text-header tiny"><span>Sarah-Imaginarium</span></p>
                                            <p className="subject">Product Question</p>
                                            <p className="timestamp">May 18th, 2014</p>
                                            <span className="notification-type secondary-new icon-envelope"></span>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/dashboard-openmessage.html" className="link-to"></Link>
                                            <figure className="user-avatar">
                                                <img src={avatar_04} alt="avatar" />
                                            </figure>
                                            <p className="text-header tiny"><span>Red Thunder Graphics</span></p>
                                            <p className="subject">Support Inquiry</p>
                                            <p className="timestamp">May 5th, 2014</p>
                                            <span className="notification-type icon-envelope-open"></span>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/dashboard-openmessage.html" className="link-to"></Link>
                                            <figure className="user-avatar">
                                                <img src={avatar_04}alt="" />
                                            </figure>
                                            <p className="text-header tiny"><span>Twisted Themes</span></p>
                                            <p className="subject">Collaboration</p>
                                            <p className="timestamp">Feb 24th, 2014</p>
                                            <span className="notification-type secondary-new icon-envelope"></span>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/dashboard-openmessage.html" className="link-to"></Link>
                                            <figure className="user-avatar">
                                                <img src={avatar_08} alt="vavatr" />
                                            </figure>
                                            <p className="text-header tiny"><span>GregSpiegel1820</span></p>
                                            <p className="subject">How to Install the Theme...</p>
                                            <p className="timestamp">Jan 3rd, 2014</p>
                                            <span className="notification-type icon-action-undo"></span>
                                            <Link to="/dashboard-inbox.html" className="button secondary">View all Messages</Link>
                                        </li>
                                    </ul>

                                </div>
                                <div className="account-settings-quickview">
                                    <span className="icon-settings">
                                        <svg className="svg-arrow" dangerouslySetInnerHTML={{__html:useTag7}}>
                                        </svg>
                                    </span>
                                    <span className="pin soft-edged primary">49</span>

                                    <ul className="dropdown notifications no-hover closed">
                                        <li className="dropdown-item">
                                            <div className="dropdown-triangle"></div>
                                            <Link to="/author-profile.html">
                                                <figure className="user-avatar">
                                                    <img src={avatar_02} alt="avatar" />
                                                </figure>
                                            </Link>
                                            <p className="title">
                                                <Link to="/author-profile.html"><span>MeganV.</span></Link> added
                                                <Link to="/item-v1.html"><span>Pixel Diamond Gaming Shop</span></Link> to favourites
                                            </p>
                                            <p className="timestamp">2 Hours ago</p>
                                            <span className="notification-type primary-new icon-heart"></span>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/author-profile.html">
                                                <figure className="user-avatar">
                                                    <img src={avatar_03} alt="avatar" />
                                                </figure>
                                            </Link>
                                            <p className="title">
                                                <Link to="/author-profile.html"><span>Thomas_Ket</span></Link> wrote you an
                                        <Link to="/author-reputation.html"><span>Author’s Reputation</span></Link>
                                            </p>
                                            <p className="timestamp">17 Hours ago</p>
                                            <span className="notification-type icon-star"></span>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/author-profile.html">
                                                <figure className="user-avatar">
                                                    <img src={avatar_04} alt="avatar" />
                                                </figure>
                                            </Link>
                                            <p className="title">
                                                <Link to="/author-profile.html"><span>Red Thunder Graphics</span></Link> commented on
                                        <Link to="/item-v1.html"><span>3D Layers - Web Mockup</span></Link>
                                            </p>
                                            <p className="timestamp">8 Days Ago</p>
                                            <span className="notification-type primary-new icon-bubble"></span>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/author-profile.html">
                                                <figure className="user-avatar">
                                                    <img src={avatar_05} alt="avatar" />
                                                </figure>
                                            </Link>
                                            <p className="title">
                                                <Link to="/author-profile.html"><span>DaBebop</span></Link> purchased
                                        <Link to="/item-v1.html"><span>Miniverse - Hero Image Composer</span></Link>
                                            </p>
                                            <p className="timestamp">1 Week ago</p>
                                            <span className="notification-type icon-tag"></span>
                                            <Link to="/dashboard-notifications.html" className="button primary">View all Notifications</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="account-actions">
                                <Link to="/" className="button primary">Become a Seller</Link>
                                <Link to="/" className="button secondary">Logout</Link>
                            </div>
                        </div>
                    </header>
                </div>
                <div id="mobile-menu" className={`side-menu left ${this.state.showLeftMenu ? 'open' : 'closed'} `}>
                    {/* <svg className="svg-plus" dangerouslySetInnerHTML={{__html:useTag8}}>
                    </svg> */}
                    <span className="svg-plus" onClick={this.toggleLeftMenu}>+</span>
                    <div className="side-menu-header">
                        <figure className="logo small">
                            <img src={logo} alt="logo"/>
                        </figure>
                    </div>

                    <p className="side-menu-title">Main Links</p>
                    <ul className="dropdown dark hover-effect interactive">
                        <li className="dropdown-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/how-to-shop.html">How to Shop</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/products.html">Products</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/services.html">Services</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/shop-gridview-v1.html">Online Goods</Link>
                        </li>
                        <li className="dropdown-item interactive" onClick={this.toggleFeatureDrpdown}>
                            <Link to="/">
                                Features
					            <svg className="svg-arrow" dangerouslySetInnerHTML={{ __html: useTag9 }}>
                                </svg>
                            </Link>

                            <ul className="inner-dropdown" style={{display: `${this.state.featureDrpdown ? 'block': 'none'}`}}>
                                <li className="inner-dropdown-item">
                                    <p>Emerald Dragon</p>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/">Homepage V1</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/home-v2.html">Homepage V2</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/itemview-versions.html">Item View Versions</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/shop-gridview-v1.html">Shop Grid View V1</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/shop-gridview-v2.html">Shop Grid View V2</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/shop-listview-v1.html">Shop List View V1</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/shop-listview-v2.html">Shop List View V2</Link>
                                    <span className="pin soft-edged primary">hot</span>

                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/author-profile.html">Profile Page</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/blog-v1.html">Blog Page V1</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/blog-v2.html">Blog Page V2</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/open-post.html">Open Post</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/forum.html">Forum Board</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/subforum.html">Subforum</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/open-topic.html">Open Topic</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/login-register.html">Login and Register</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/menu-dropdowns.html">Menu and Dropdowns</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <p>Product Pages</p>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/item-v1.html">Item Page V1</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/item-v2.html">Item Page V2</Link>
                                    <span className="pin soft-edged secondary">new</span>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/product-page.html">Product Page</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/auction-page.html">Auction Page</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/service-page.html">Service Page</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/favourites.html">Favourite Products Grid View</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/favourites-listview.html">Favourite Products List View</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/alerts-notifications.html">Alerts &amp; Notifications</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <p>Dashboard</p>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/dashboard-settings.html">Account Settings</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/dashboard-statistics.html">Statistics Page</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/dashboard-statement.html">Sales Statement</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/dashboard-inbox.html">Inbox Page</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/dashboard-openmessage.html">Open Message</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/dashboard-uploaditem.html">Upload Page</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <p>Gamification</p>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/community-badges.html">Author Badges Page</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/badges.html">All Badges (Big and Small)</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/flag-badges.html">Flag Badges (Big and Small)</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/badges-boxes.html">Badge Boxes Versions</Link>
                                </li>
                                <li className="inner-dropdown-item">
                                    <Link to="/author-badges.html">Public Author Badges</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

                <div id="account-options-menu" className={`side-menu right ${this.state.showRightMenu ? 'open' : 'closed' } `}>
                    <span className="svg-plus" onClick={this.toggleRightMenu}>+</span>
                    <div className="side-menu-header">
                        <div className="user-quickview">
                            <Link to="author-profile.html">
                                <div className="outer-ring">
                                    <div className="inner-ring"></div>
                                    <figure className="user-avatar">
                                        <img src={avatar_01} alt="avatar" />
                                    </figure>
                                </div>
                            </Link>
                            <p className="user-name">Johnny Fisher</p>
				            <p className="user-money">$745.00</p>
                        </div>
                    </div>

                    <p className="side-menu-title">Your Account</p>
                    
                    <ul className="dropdown dark hover-effect">
                        <li className="dropdown-item">
                            <Link to="/dashboard-notifications.html">Notifications</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/dashboard-inbox.html">Messages</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/cart.html">Your Cart</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/favourites.html">Favourites</Link>
                        </li>
                    </ul>

                    <p className="side-menu-title">Dashboard</p>
                    <ul className="dropdown dark hover-effect">
                        <li className="dropdown-item">
                            <Link to="/author-profile.html">Profile Page</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/dashboard-settings.html">Account Settings</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/dashboard-purchases.html">Your Purchases</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/dashboard-statement.html">Sales Statement</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/dashboard-buycredits.html">Buy Credits</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/dashboard-withdrawals.html">Withdrawals</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/dashboard-uploaditem.html">Upload Item</Link>
                        </li>
                        <li className="dropdown-item">
                            <Link to="/dashboard-manageitems.html">Manage Items</Link>
                        </li>
		            </ul>
                    <Link to="/" className="button medium secondary">Logout</Link>
		            <Link to="/" className="button medium primary">Become a Seller</Link>
                </div>

                {/* MENU ITEMS*/}

                <div className="main-menu-wrap">
                    <div className="menu-bar">
                        <nav>
                            <ul className="main-menu">
                                <li className="menu-item">
                                    <a href="index.html">Home</a>
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
                                            <h6 className="feature-list-title">Emerald Dragon</h6>
                                            <hr className="line-separator"></hr>
                                            <ul className="feature-list">
                                                <li className="feature-list-item">
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
                                                </li>
                                            </ul>
                                            <ul className="feature-list">
                                                <li className="feature-list-item">
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
                                                </li>
                                            </ul>

                                        </div>
                                        <div className="feature-list-block">
                                            <h6 className="feature-list-title">Product Pages</h6>
                                            <hr className="line-separator"></hr>
                                            <ul className="feature-list">
                                                <li className="feature-list-item">
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
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="feature-list-block">
                                            <h6 className="feature-list-title">Dashboard</h6>
                                            <hr className="line-separator"></hr>
                                            <ul className="feature-list">
                                                <li className="feature-list-item">
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
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="feature-list-block">
                                            <h6 className="feature-list-title">Gamification</h6>
                                            <hr className="line-separator"></hr>
                                            <ul className="feature-list">
                                                <li className="feature-list-item">
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
                                                </li>
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

export default Header;