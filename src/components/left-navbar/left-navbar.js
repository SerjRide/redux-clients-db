import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideNavbar } from '../../actions';
import { Link } from 'react-router-dom';

class LeftNavbar extends Component {

  render() {
    const { hideNavbar } = this.props

    return (
      <React.Fragment>
      <div className="modal-shadow"
        onClick={ () => hideNavbar() }>
      </div>
      <div className="left-navbar">
        <nav className="nav flex-column">
          <ul className="navbar-head">
            <li className="el">
              <button
                onClick={ () => hideNavbar() }
                type="button">
                <i className="fas fa-bars"></i>
              </button>
            </li>
            <li className="el">
              <Link className="navbar-brand"
                onClick={ () => hideNavbar() }
                to="/">
                Redux Clients DB
              </Link>
            </li>
          </ul>
          <hr />
          <Link className="nav-link"
            to="/"
            onClick={ () => hideNavbar() }>
            База заказов
          </Link>
          <Link className="nav-link"
            to="/customers"
            onClick={ () => hideNavbar() }>
            База клиентов
          </Link>
          <Link className="nav-link"
          onClick={ () => hideNavbar() }
          to="/main-analisis">
          Аналитика
          </Link>
          <hr />
          <Link className="nav-link"
          to="/add-order"
          onClick={ () => hideNavbar() }>
          Добавить заказ
          </Link>
          <Link className="nav-link"
          to="/del-order"
          onClick={ () => hideNavbar() }>
          Удалить заказ
          </Link>
        </nav>
      </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return {
    hideNavbar: () => dispatch(hideNavbar())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftNavbar);
