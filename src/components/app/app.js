import React, { Component } from 'react';
import Head from '../head';
import Content from '../content';
import LeftNavbar from '../left-navbar';
import EditOrder from '../content/edit-order';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Alert from '../alerts';
import Login from '../login';

import '../../css/main.css';

class App extends Component {

  render() {
    let leftNavbar = null, get_alert, get_modal;
    const { navbarPanel, alert, modal } = this.props.state
    const token = localStorage.getItem('token');

    if (token === null) {
      return (
        <Router>
          <Route path='/' component = { Login } />
        </Router>
      );
    }

    if (navbarPanel === true) {
      leftNavbar = <LeftNavbar />
    }

    if (modal.active) {
      get_modal = <EditOrder />
    }

    if (alert.text) {
      get_alert = <Alert />
    }

    return (
      <React.Fragment>
        { get_alert }
        { get_modal }
        <Router>
          <div className="App">
            { leftNavbar }
            <Head />
            <Content />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(App);
