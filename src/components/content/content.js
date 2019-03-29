import React, { Component } from 'react';
// import Entrance from '../entrance';
import Table from '../content/table';
import { connect } from 'react-redux';
import AddOrder from './add-order';
import DeleteOrder from './delete-order';
import Customers from './customers';
import { Route } from 'react-router-dom';

class Content extends Component {

  render() {

    const date = (((new Date()).getFullYear()) + '').slice(-2);
    console.log(date)

    return (
        <div className="content">
          <Route path='/' component = { Table } exact/>
          <Route path='/customers' component = { Customers } />
          <Route path='/add-order' component = { AddOrder } />
          <Route path='/del-order' component = { DeleteOrder } />
        </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Content);
