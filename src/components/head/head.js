import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getData,
  showNavbar,
  changeFilter,
  extractCustomersByYeat } from '../../actions';

class Head extends Component {

  componentDidUpdate() {
    const { year, mounth, day } = this.props.state.filter;
    this.inputYear.value = year;
    this.inputMounth.value = mounth;
    this.inputDay.value = day;
  }

  applyFilter = () => {
    const { value: year } = this.inputYear;
    const { value: mounth } = this.inputMounth;
    const { value: day } = this.inputDay;
    const { value: info } = this.inputInfo;
    const { pathname } = document.location;
    if (pathname === '/orders') this.props.getData(year);
    if (pathname === '/customers') this.props.extractCustomersByYeat(year);
    this.props.changeFilter(year, mounth, day, info);
  }

  removeFilter = () => {
    const nowYear = (((new Date()).getFullYear()) + '').slice(-2);
    const nowMounth = '0' + ((new Date()).getMonth() + 1)
    const { pathname } = document.location;
    if (pathname === '/orders') this.props.getData(nowYear);
    if (pathname === '/customers') this.props.extractCustomersByYeat(nowYear);
    this.props.changeFilter(nowYear, nowMounth, '', '');
    this.inputMounth.value = '';
    this.inputInfo.value = '';
  }

  render() {

    const { pathname } = document.location;
    let extra = null;
    if (pathname === '/customers') extra = <option value="0">Все года</option>;

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

          <div className="input-group">

              <div className="form-group col-md-5 filter first">
                <input
                  ref={ (e) => { this.inputInfo = e} }
                  onChange={ this.applyFilter }
                  className="form-control"
                  type="search"
                  placeholder="Поиск по словам"
                  aria-label="Search"/>
              </div>

              <div className="form-group col-md-2 filter middle">
                <select id="inputYear"
                  ref={ (e) => { this.inputYear = e} }
                  onChange={ this.applyFilter }
                  className="form-control">
                  { extra }
                  <option value="19">2019</option>
                  <option value="18">2018</option>
                  <option value="17">2017</option>
                  <option value="16">2016</option>
                </select>
              </div>

              <div className="form-group col-md-2 filter middle">
                <select id="inputMounth"
                  onChange={ this.applyFilter }
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

              <div className="form-group col-md-1 filter middle">
                <input id="inputDay" type="number"
                  onChange={ this.applyFilter }
                  min="0" max="31"
                  ref={ (e) => { this.inputDay = e} }
                  className="form-control" />
              </div>

              <div className="form-group col-md-2 filter last">
              <button
                className="btn btn-outline-primary"
                onClick={ this.removeFilter }
                type="button">
                Сброс
              </button>
              </div>

          </div>

            <div className="form-group col-md-2 end">
              <button
                className="btn btn-outline-danger"
                type="button">
                Выход
              </button>
            </div>

          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state: state })
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (url) => dispatch(getData(url)),
    showNavbar: () => dispatch(showNavbar()),
    extractCustomersByYeat: (year) => dispatch(extractCustomersByYeat(year)),
    changeFilter: (year, mounth, day, info) => dispatch(changeFilter(
      year,
      mounth,
      day,
      info
    ))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Head);
