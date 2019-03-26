import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getData, changePeriod } from '../../../actions';

class PeriodSettings extends Component {

  componentDidMount() {
    this.inputYear.value = this.props.state.period.year;
    this.inputMounth.value = this.props.state.period.mounth;
    this.inputDay.value = this.props.state.period.day;
    if (this.props.state.period.mounth === '') this.inputMounth.value = ''
  }

  apply = () => {
    const { value: year } = this.inputYear;
    const { value: mounth } = this.inputMounth;
    const { value: day } = this.inputDay;
    this.props.changePeriod(year, mounth, day);
  }

  render() {

    const form = (
      <form>
        <div className="form-row">

          <div className="form-group col-md-4">
            <label htmlFor="inputYear">
              Год
            </label>
            <select id="inputYear"
              ref={ (e) => { this.inputYear = e} }
              className="form-control">
              <option value='19'>2019</option>
              <option value='18'>2018</option>
              <option value='17'>2017</option>
              <option value='16'>2016</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputMounth">
              Месяц
            </label>
            <select id="inputMounth"
              ref={ (e) => { this.inputMounth = e} }
              className="form-control">
              <option value=''>Все месяцы</option>
              <option value="01">Январь</option>
              <option value="02">Февраль</option>
              <option value="03">Март</option>
              <option value="04">Апрель</option>
              <option value="05">Май</option>
              <option value="06">Июнь</option>
              <option value="07">Июль</option>
              <option value="08">Август</option>
              <option value="09">Сентябрь</option>
              <option value="10">Октябрь</option>
              <option value="11">Ноябрь</option>
              <option value="12">Декабрь</option>
            </select>
          </div>

          <div className="form-group col-md-4">
            <label htmlFor="inputMounth">
              День
            </label>
            <input id="inputDay" type="number"
              min="0" max="31"
              ref={ (e) => { this.inputDay = e} }
              className="form-control" />
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
      <div className="period-setting">
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
    getData: (url) => dispatch(getData(url)),
    changePeriod: (year, mounth, day) => dispatch(changePeriod(year, mounth, day))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(PeriodSettings);
