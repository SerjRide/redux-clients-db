import React, { Component } from 'react';
import Head from '../head';
import Content from '../content';
import LeftNavbar from '../left-navbar';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import '../../css/main.css';

class App extends Component {

  render() {
    let leftNavbar = null
    const { navbarPanel } = this.props.state
    if (navbarPanel === true) {
      leftNavbar = <LeftNavbar />
    }

    return (
      <Router>
        <div className="App">
          { leftNavbar }
          <Head />
          <Content />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(App);
