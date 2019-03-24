import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setData, alertSaccess, changePeriod } from '../../../actions';

class PeriodSettings extends Component {

  componentDidMount() {
    this.inputYear.value = '20' + this.props.state.period.year;
    this.inputMounth.value = this.props.state.period.mounth;
  }

  apply = () => {
    const { value: year } = this.inputYear;
    const { value: mounth } = this.inputMounth;
    this.props.changePeriod(year.slice(2), mounth);
  }

  render() {

    const form = (
      <form>
        <div className="form-row">

          <div className="form-group col-md-6">
            <label htmlFor="inputYear">
              Год
            </label>
            <select id="inputYear"
              ref={ (e) => { this.inputYear = e} }
              className="form-control">
              <option>2019</option>
              <option>2018</option>
              <option>2017</option>
              <option>2016</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="inputMounth">
              Месяц
            </label>
            <select id="inputMounth"
              ref={ (e) => { this.inputMounth = e} }
              className="form-control">
              <option></option>
              <option>Январь</option>
              <option>Февраль</option>
              <option>Март</option>
              <option>Апрель</option>
              <option>Май</option>
              <option>Июнь</option>
              <option>Июль</option>
              <option>Август</option>
              <option>Сентябрь</option>
              <option>Октябрь</option>
              <option>Ноябрь</option>
              <option>Декабрь</option>
            </select>
          </div>

          <div className="form-group col-md-6">
            <button type="button"
              onClick={ this.apply }
              className="btn btn-success">
              Применить
            </button>
          </div>

        </div>
      </form>
    )

    const discription = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

    return (
      <div className="add-order">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              Выбор периода
            </div>
            <div className="card-body">
              <div className="row">

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      { form }
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      { discription }
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    setData: (url, body) => dispatch(setData(url, body)),
    alertSaccess: (text) => dispatch(alertSaccess(text)),
    changePeriod: (year, mounth) => dispatch(changePeriod(year, mounth))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(PeriodSettings);
