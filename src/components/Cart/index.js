import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CartPrice from "../../common/CartPrice";
import CartItem from "../../common/CartItem";
import CartActions from "../../common/CartActions";

class Cart extends Component {
    componentDidMount(){
        this.props.switchActiveLink('cart')
    }
    renderAuthDashboard = () => (
        <UserLayout>
                <div className="container-fluid">
                    <div className="row">
                        
                        <div className="col-sm-pull-12 col-md-12 col-sm-12">
                            <div className="cart">
                                <div className="cart-header">
                                    <div className="cart-header-product">
                                        <p className="text-header small">Product Details</p>
                                    </div>
                                    <div className="cart-header-category">
                                        <p className="text-header small">Category</p>
                                    </div>
                                    <div className="cart-header-price">
                                        <p className="text-header small">Price</p>
                                    </div>
                                    <div className="cart-header-actions">
                                        <p className="text-header small">Remove</p>
                                    </div>
                                </div>
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartPrice />
                                <CartActions />
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
    )
    noAuthDashboard = () => {
        return (
            <div className="container">
                    <div className="row">
                    <div className="col-sm-push-12 col-md-4 col-sm-12">
                            <div className="sidebar-item">
                                <h4>Redeem Code</h4>
                                <hr className="line-separator" />
                                <form id="coupon-code-form">
                                    <input type="text" name="coupon_code" placeholder="Enter your coupon code..." />
                                    <button className="button mid secondary">Apply Coupon Code</button>
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-pull-12 col-md-8">
                            <div className="cart">
                                <div className="cart-header">
                                    <div className="cart-header-product">
                                        <p className="text-header small">Product Details</p>
                                    </div>
                                    <div className="cart-header-category">
                                        <p className="text-header small">Category</p>
                                    </div>
                                    <div className="cart-header-price">
                                        <p className="text-header small">Price</p>
                                    </div>
                                    <div className="cart-header-actions">
                                        <p className="text-header small">Remove</p>
                                    </div>
                                </div>
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartItem />
                                <CartPrice />
                                <CartActions />
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
    
    render() {
        return localStorage.getItem('azonta-user') ? this.renderAuthDashboard() : this.noAuthDashboard()
    }
}



export default connect(null, actions)(Cart)