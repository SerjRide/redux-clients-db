import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getData,
  showNavbar,
  changeFilter,
  getCustomers,
  sign_out,
  mainAnalysis } from '../../actions';

class Head extends Component {

  comonentDidMount() {

  }

  componentDidUpdate() {
    const { pathname } = document.location;
    const { year, mounth, day } = this.props.state.filter;
    this.inputYear.value = year;
    this.inputMounth.value = mounth;
    if (pathname === '/customers') this.inputDay.value = '';
    else this.inputDay.value = day;
  }

  applyFilter = () => {
    const { value: year } = this.inputYear;
    const { value: mounth } = this.inputMounth;
    let { value: day } = this.inputDay;
    const { value: info } = this.inputInfo;
    const { pathname } = document.location;
    const token = localStorage.getItem('token');
    if (pathname === '/orders') this.props.getData(year, token);
    if (pathname === '/customers') this.props.getCustomers(year, token);
    this.props.changeFilter(year, mounth, day, info);
  }

  removeFilter = () => {
    const nowYear = (((new Date()).getFullYear()) + '').slice(-2);
    const nowMounth = '0' + ((new Date()).getMonth() + 1)
    const { pathname } = document.location;
    const token = localStorage.getItem('token');
    if (pathname === '/orders') this.props.getData(nowYear, token);
    if (pathname === '/customers') this.props.getCustomers(nowYear, token);
    this.props.changeFilter(nowYear, nowMounth, '', '');
    this.inputMounth.value = '';
    this.inputInfo.value = '';
  }

  sign_out = () => {
    this.props.sign_out();
    localStorage.removeItem('token');
    localStorage.removeItem('login');
  }

  calcMainAnalysis = () => {
    this.props.mainAnalysis();
  }

  render() {
    const { pathname } = document.location;
    let extra = null, filter_action, filter_button;

    if (pathname === '/customers' || pathname === '/main-analisis') {
      extra = <option value="0">Все года</option>;
      if (this.inputDay !== undefined) {
        this.inputDay.disabled = false;
      }
    }

    if (pathname === '/customers') {
      if (this.inputDay !== undefined) {
        this.inputDay.disabled = true;
      }
    }

    if (pathname === '/main-analisis') {
      filter_action  = this.calcMainAnalysis;
      filter_button = 'Рассчитать';
    } else {
      filter_action  = this.removeFilter;
      filter_button = 'Сброс';
    }

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
                  <option value="15">2015</option>
                  <option value="14">2014</option>
                  <option value="13">2013</option>
                  <option value="12">2012</option>
                  <option value="11">2011</option>
                  <option value="10">2010</option>
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
                  className="form-control"/>
              </div>

              <div className="form-group col-md-2 filter last">
              <button
                className="btn btn-outline-primary"
                onClick={ filter_action }
                type="button">
                { filter_button }
              </button>
              </div>

          </div>

            <div className="form-group col-md-3 end">
              <span>{ localStorage.getItem('login') }</span>
              <Link
                className="btn btn-outline-danger"
                to="/login"
                onClick={ this.sign_out }
                type="button">
                Выход
              </Link>
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
    getData: (url, token) => dispatch(getData(url, token)),
    showNavbar: () => dispatch(showNavbar()),
    getCustomers: (year, token) => dispatch(getCustomers(year, token)),
    sign_out: () => dispatch(sign_out()),
    mainAnalysis: () => dispatch(mainAnalysis()),
    changeFilter: (year, mounth, day, info) => dispatch(changeFilter(
      year,
      mounth,
      day,
      info
    ))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Head);
