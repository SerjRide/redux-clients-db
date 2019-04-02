import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getAutorize } from '../../actions';

class Login extends Component {

  check = () => {
    const log = this.loginInput.value;
    const pass = this.passInput.value;
    this.props.getAutorize(log, pass);
  }

  componentDidUpdate() {
    if (this.props.state.token !== null) {
      this.check();
    }
  }

  render() {

    return (
      <div className="login">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-header">
                Авторизация
              </div>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="input_login">Логин: </label>
                    <input type="text" className="form-control"
                      ref={ (e) => { this.loginInput = e } }
                      id="input_login" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="input_pass">Пароль: </label>
                    <input type="password" className="form-control"
                    ref={ (e) => { this.passInput = e } }
                    id="input_pass" />
                  </div>
                  <button type="button" className="btn btn-primary"
                  onClick={ this.check }>
                  Вход</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return {
    getAutorize: (log, pass) => dispatch(getAutorize(log, pass))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
