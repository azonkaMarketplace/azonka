import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";
import * as actions from "../../actions";
import { connect } from "react-redux";
class index extends Component {
    render() {
        return (
            <UserLayout>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps, actions)(index);