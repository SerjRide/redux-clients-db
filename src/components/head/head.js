import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showNavbar } from '../../actions';
import { Link } from 'react-router-dom';

class Head extends Component {

  render() {
    return (
      <div className="head">
        <nav className="navbar navbar-light bg-light">
          <button
            className="btn"
            onClick={ () => this.props.showNavbar() }
            type="button">
            <i className="fas fa-bars"></i>
          </button>
          <Link className="navbar-brand"
            to="/">
            Redux Clients DB
          </Link>
          <div className="form">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"/>
            <button
              className="btn btn-outline-danger"
              type="button">
              Выход
            </button>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return {
    showNavbar: () => dispatch(showNavbar())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Head);
