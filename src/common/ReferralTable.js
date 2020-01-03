import React, { Component } from 'react';
// import "../css/dataTable.css";
const $ = require('jquery')

$.DataTable = require('datatables.net')

class ReferralTable extends Component {
    componentDidMount(){
        this.$el = $(this.el)
        console.log('this props', this.props.data)
        this.$el.DataTable({
            responsive: true,
            data:this.props.data,
            columns: [
                {title:'First Name',
                 render: (data, type, row, meta ) => {
                    if ( type === 'display' ) {
                        return row.firstName
                    }
                     return ''
                 },
                 
                },
                {title: 'last Name', 
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.lastName
                        }
                        return row.lastName   
                    },
                    
                },
                {title: 'Phone Number',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.phoneNumber
                        }  
                         return row.phoneNumber
                        
                    },
                    
                },
                {title: 'Email Address',
                    render: (data, type, row, meta ) => {
                        if ( type === 'display' ) {
                            return row.emailAddress
                        } 
                        return row.emailAddress
                    },
                
                }
            ]
        })
    }
    componentWillUnmount(){
        this.$el = $(this.el)
        this.$el.DataTable().destroy(true)
    }
    reloadTableData(data, $el){
        $el.DataTable().clear()
        $el.DataTable().rows.add(data)
        $el.DataTable().draw()
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.data.length !== this.props.data.length) {
            this.reloadTableData(nextProps.data, $(this.el));
        }
        return false;
    }
    render() {
        return (
            <div>
                <table className="display" width="100%" ref={el => this.el = el}></table>
            </div>
        );
    }
}

export default ReferralTable;