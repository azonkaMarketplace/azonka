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
    render() {
        return (
            <UserLayout>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-pull-12 col-md-12">
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
        );
    }
}



export default connect(null, actions)(Cart)