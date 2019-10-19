import React, { Component } from 'react';
import UserLayout from "../HOC/UserLayout";

class index extends Component {
    componentDidMount(){
        const { match: {params: {id}}} = this.props
        console.log('parmas', id)
    }
    render() {
        return (
            <UserLayout>
                
            </UserLayout>
        );
    }
}

export default index;