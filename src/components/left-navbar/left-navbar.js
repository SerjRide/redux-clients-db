import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideNavbar, showAddOrder } from '../../actions';

class LeftNavbar extends Component {

  render() {
    return (
      <React.Fragment>
      <div className="modal-shadow"
        onClick={ () => this.props.hideNavbar() }>
      </div>
      <div className="left-navbar">
        <nav className="nav flex-column">
          <ul className="navbar-head">
            <li className="el">
              <button
                onClick={ () => this.props.hideNavbar() }
                type="button">
                <i className="fas fa-bars"></i>
              </button>
            </li>
            <li className="el">
              <div className="navbar-brand">
                Redux Clients DB
              </div>
            </li>
          </ul>
          <hr />
          <button className="nav-link"
            onClick={ () => this.props.showAddOrder() }>
            Добавить заказ
          </button>
          <hr />
          <button className="nav-link">
            Аналитика
          </button>
          <button className="nav-link disabled">
            Disabled
          </button>
        </nav>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return {
    hideNavbar: () => dispatch(hideNavbar()),
    showAddOrder: () => dispatch(showAddOrder())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavbar);
