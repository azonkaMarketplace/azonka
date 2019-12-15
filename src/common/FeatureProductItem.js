import React, { Component } from 'react';
import homeProduct from "../css/images/products/home-featured-1.jpg";

class FeatureProductItem extends Component {
    render() {
        return (
            <div class="product">
                <figure class="product-image-container">
                    <a href="product.html" class="product-image">
                        <img src={homeProduct} alt="product" />
                    </a>
                    <a href="ajax\product-quick-view.html" class="btn-quickview">Quick View</a>
                </figure>
                <div class="product-details">
                    <div class="ratings-container">
                        <div class="product-ratings">
                            <span class="ratings" style={{width:"80%"}}></span>
                        </div>
                    </div>

                    <h2 class="product-title">
                        <a href="product.html">Wireless Headset</a>
                    </h2>
                    <div class="price-box">
                        <span class="product-price">$28.00</span>
                    </div>

                    <div class="product-action">
                        <a href="#" class="paction add-wishlist" title="Add to Wishlist">
                            <span>Add to Wishlist</span>
                        </a>

                        <a href="product.html" class="paction add-cart" title="Add to Cart">
                            <span>Add to Cart</span>
                        </a>

                        <a href="#" class="paction add-compare" title="Add to Compare">
                            <span>Add to Compare</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default FeatureProductItem;