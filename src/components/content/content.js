import React, { Component } from 'react';
// import Entrance from '../entrance';
import Table from '../content/table';
import { connect } from 'react-redux';
import AddOrder from './add-order';
import DeleteOrder from './delete-order';
import Customers from './customers';
import MainAnalisis from './main-analisis';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Content extends Component {

  render() {
    const { authorize } = this.props.state;
    const log = <Redirect to='/login'/>;
    const content = <Redirect to='/orders'/>;
    let Main = () => authorize === null ? log : content

    return (
        <div className="content">
          <Route path='/' component = { Main } exact/>
          <Route path='/login' component = { Main } exact/>
          <Route path='/orders' component = { Table } exact/>
          <Route path='/customers' component = { Customers } />
          <Route path='/add-order' component = { AddOrder } />
          <Route path='/del-order' component = { DeleteOrder } />
          <Route path='/main-analisis' component = { MainAnalisis } />
        </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Content);
