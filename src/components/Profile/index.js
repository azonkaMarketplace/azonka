import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import UserLayout from "../HOC/UserLayout";
import Card from "../../common/Card";
import cardImage from "../../images/items/miniverse_m.jpg";
import Header from "../../common/StoreHeader";
import ListCard from "../../common/ListCard";
import * as actions from "../../actions";

class index extends Component {
    logout = () => {
        this.props.logout()
        return <Redirect to="/users/login" />
    }
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
                <ListCard image={cardImage}  rating={1} feature/>
                <ListCard image={cardImage}  rating={3} feature/>
                <ListCard image={cardImage}  rating={2}/>
                <ListCard image={cardImage}  rating={4} feature/>
                <ListCard image={cardImage}  rating={3}/>
                <ListCard image={cardImage}  rating={5} feature/>
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
    const {home:{viewType}, reg:{unAuthorized}} = state;
    console.log('in authorized', unAuthorized)
    return {
        viewType,
        unAuthorized
    }
}

export default connect(mapStateToProps, actions)(index)