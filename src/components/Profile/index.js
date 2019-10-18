import React, { Component } from 'react';
import { connect } from "react-redux";
import UserLayout from "../HOC/UserLayout";
import Card from "../../common/Card";
import cardImage from "../../images/items/miniverse_m.jpg";
import Header from "../../common/StoreHeader";
import ListCard from "../../common/ListCard";
import * as actions from "../../actions";

class index extends Component {

    renderItems = () => {
        const {viewType} = this.props;
        if(viewType === 'grid'){
            return (
                <div className="product-list grid column3-4-wrap product-grid">
                    <Card image={cardImage} />
                    <Card image={cardImage} feature />
                    <Card image={cardImage} feature />
                    <Card image={cardImage} feature />
                    <Card image={cardImage} feature />
                    <Card image={cardImage} feature />
                </div>
            )
        }
        return (<div className="">
                <ListCard image={cardImage}  rating={5}/>
                <ListCard image={cardImage}  rating={1}/>
                <ListCard image={cardImage}  rating={3}/>
                <ListCard image={cardImage}  rating={2}/>
                <ListCard image={cardImage}  rating={4}/>
                <ListCard image={cardImage}  rating={3}/>
                <ListCard image={cardImage}  rating={5}/>
            </div>)
    }
    render() {
        return (
            <UserLayout>
                <Header title="Recommended For You" />
                {this.renderItems()}
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    const {home:{viewType}} = state;
    return {
        viewType
    }
}

export default connect(mapStateToProps, actions)(index)