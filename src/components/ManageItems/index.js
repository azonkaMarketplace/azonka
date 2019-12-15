import React, { Component } from 'react';
import uploadNew from "../../images/dashboard/uploadnew-bg.jpg";
import StoreItem from "../../common/StoreItem";
import cardImage from "../../images/items/miniverse_m.jpg";
import * as actions from "../../actions";
import { connect } from "react-redux";
import AdminLayout from '../HOC/AdminLayout';

class index extends Component {
    componentDidMount(){
        this.props.initiateRegistration()
        this.props.fetchItems()
        this.props.switchActiveLink('manageItems')
	}
    uploadNewItem = (e) => {
        e.preventDefault()
        return this.props.history.push('/users/items/upload')
    }
    render() {
        return (
            <AdminLayout>
            <div className="dashboard-content" style={{marginTop: -30}}>
                <div className="headline filter primary">
                    <h4>Manage Items</h4>
                    <form>
                        <label htmlFor="price_filter" className="select-block">
                            <select name="price_filter" id="price_filter">
                                <option value="0">Price (High to Low)</option>
                                <option value="1">Date Created</option>
                            </select>
                        </label>
                    </form>
                </div>
                <div className="product-list grid column4-wrap">
                    <div className="product-item upload-new column" onClick={this.uploadNewItem}>
                        <div className="product-preview-actions">
                            <figure className="product-preview-image">
                                <img src={uploadNew} alt="product" />
                            </figure>
                            
                        </div>
                        <div className="product-info">
                                <p className="text-header">Upload New Item</p>
                                <p className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
                                    sed do eiusmod tempor incididunt ut labore.</p>
                            </div>
                    </div>
                    {
                        this.props.products.map(product => (
                            <StoreItem 
                                key={product.id}
                                name={product.name}
                                price={product.sellingPrice} 
                                id={product.id}
                                description={product.description}
                                category="electronics" 
                                onwer="onuorah charles" 
                                image={product.mainImageUrl}
                            />
                        ))
                    }
                    
                    <StoreItem 
                        name="mobile phone"
                        price="1200"
                        id={2} 
                        description="Lorem ipsum dolor"
                         category="electronics" 
                         onwer="onuorah charles" 
                         image={cardImage}
                    />
                    <StoreItem 
                        name="mobile phone"
                        price="1200" 
                        id={3}
                        description="Lorem ipsum dolor"
                         category="electronics" 
                         onwer="onuorah charles" 
                         image={cardImage}
                    />
                    <StoreItem 
                        name="mobile phone"
                        price="1200" 
                        id={4}
                        description="Lorem ipsum dolor"
                         category="electronics" 
                         onwer="onuorah charles" 
                         image={cardImage}
                    />
                    <StoreItem 
                        name="mobile phone"
                        price="1200" 
                        id={5}
                        description="Lorem ipsum dolor"
                         category="electronics" 
                         onwer="onuorah charles" 
                         image={cardImage}
                    />
                    <div className="clearfix"></div>
                </div>
            </div>
            </AdminLayout>
        );
    }
}

const mapStateToProps = state => {
    const {inventory: {products}} = state;
    return {
        products
    }
}

export default connect(mapStateToProps, actions)(index);