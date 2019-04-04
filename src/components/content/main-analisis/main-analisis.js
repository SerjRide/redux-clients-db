import React, { Component } from 'react';

import {
  XYPlot,
  LineSeries,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  Crosshair,
  RadialChart } from 'react-vis';

import { connect } from 'react-redux';

import { alertSaccess, getCustomers } from '../../../actions';

import '../../../../node_modules/react-vis/dist/style.css';

class MainAnalisis extends Component {

  constructor(props) {
    super(props);
    const { year, mounth, day } = this.props.state.filter
    const token = localStorage.getItem('token')
    this.props.getCustomers(year, token);
    this.state = {
      crosshairValues: [],
      orders: this.getGlobal('orders', year, mounth, day),
      customers: this.getGlobal('customers', year, mounth, day),
      percent: this.getGlobal('percent', year, mounth, day),
      price: this.getGlobal('price', year, mounth, day),
      prev_filter: null,
      prev_main_analysis: -1,
      forSchedule: [],
      schedule: 'orders'
    };
  };

  componentDidUpdate(pp, ps) {
    const { mainAnalysis } = this.props.state;
    const { prev_main_analysis } = this.state;
    const { year, mounth, day } = this.props.state.filter;

    if (mainAnalysis !== prev_main_analysis) {
      this.setState({
        orders: this.getGlobal('orders', year, mounth, day),
        customers: this.getGlobal('customers', year, mounth, day),
        percent: this.getGlobal('percent', year, mounth, day),
        price: this.getGlobal('price', year, mounth, day),
        prev_main_analysis: mainAnalysis,
        forSchedule : this.getSchedule()
      });
    }
  };

  getGlobal = (type, year, mounth = '', day = '') => {
    const { customers } = this.props.state
    if (day === '0')  day = '';
    let res = 0;
    for (let i = 0; i < customers.length; i++) {
      for (let j = 0; j < customers[i].date.length; j++) {

        const year_exp = customers[i].date[j].date.slice(-2);
        const mounth_exp = customers[i].date[j].date.slice(3, 5);
        const day_exp = customers[i].date[j].date.slice(0, 2);
        let year_condition = (year === '0') ? year : year_exp;
        let mounth_condition = (mounth === '') ? mounth : mounth_exp;
        let day_condition = (day === '') ? ('0' + day).slice(-2) : day_exp;

        if (type === 'percent') {
          const this_year = this.getGlobal('customers', year, mounth, day);
          const all_year = this.getGlobal('customers', '0', '', '');
          res = Math.round((this_year / all_year) * 100);
        }

        if (year_condition === year) {
          if (mounth_condition === mounth) {
            if (day_condition === ('0' + day).slice(-2)) {
              if (type === 'orders') res += 1;
              if (type === 'price') res += customers[i].date[j].price;
              if (type === 'customers') {
                if (year === '0' && mounth !== '') {
                  return this.getGlobal('customers', '0', '');
                } else {
                  res += 1;
                  j = customers[i].date.length;
                }
              }
            } else if (type === 'customers') j = customers[i].date.length;
          } else if (type === 'customers') j = customers[i].date.length;
        } else if (type === 'customers') j = customers[i].date.length;
      }
    }
    return res;
  }

  getSchedule = (schedule = this.selectSchedule.value) => {
    const { year } = this.props.state.filter;
    let arr = [];
    arr[0] = [];
    for (let i = 0; i < 11; i++) {
      arr[0][i] = {x: i + 1, y: this.getGlobal(schedule, year, ('0' + (i + 1)).slice(-2), '')};
    }
    return arr;
  }

  changeSchedule = () => {
    const { value } = this.selectSchedule;
    setTimeout(this.setState({ forSchedule : this.getSchedule(value) }));
  }

  render() {
    const { year } = this.props.state.filter;
    const { forSchedule } = this.state
    let changed_text = (year !== '0') ? 'Новых клиентов:' : 'Всего клиентов:'

    const forDiagram = [
      {angle: 1, radius: 10},
      {angle: 2, label: 'Super Custom label', subLabel: 'With annotation', radius: 20},
      {angle: 5, radius: 5, label: 'Alt Label'},
      {angle: 3, radius: 14},
      {angle: 5, radius: 12, subLabel: 'Sub Label only', className: 'custom-class'}
    ];

    const content = (
      <div className="row">
        <div className="col-md-3">
          <h6>Статистика</h6>
          <p>Результаты анализа по установленному в фильтре периоду времени</p>
        </div>
        <div className="col-md-2">
          <h6>Всего заказов:</h6>
          <h3>{ this.state.orders }</h3>
        </div>
        <div className="col-md-2">
          <h6>{ changed_text }</h6>
          <h3>{ this.state.customers }</h3>
        </div>
        <div className="col-md-2">
          <h6>Прошлый период:</h6>
          <h3>{ this.state.percent }%</h3>
        </div>
        <div className="col-md-2">
          <h6>Сумма:</h6>
          <h3>{ this.state.price } ₽</h3>
        </div>
      </div>
    )

    const schedule = (
      <div className="schedule">
      <span>Кривая</span>
        <select
          ref={ (e) => {this.selectSchedule = e } }
          onChange={ this.changeSchedule }>
          <option value="orders">Количества заказов от периода</option>
          <option value="customers">Новых клиентов от периода</option>
          <option value="price">Суммы от периода</option>
        </select>
        <div>
        <XYPlot height={300} width={650}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data = { forSchedule[0] }
            onNearestX = { (value, {index} ) =>
              this.setState( {crosshairValues: forSchedule.map(d => d[index])} )}/>
          <LineSeries data = {forSchedule[1]}/>
          <Crosshair values={ this.state.crosshairValues }/>
        </XYPlot>
        </div>
      </div>
    )

    const diagram = (
      <div>
        <h6>Статистика</h6>
        <div>
          <RadialChart data={forDiagram} height={300} width={490} />
        </div>
      </div>
    )

    return (
      <div className="main-analisis">
        <div className="container-fluid">
            <div className="row">

              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    { content }
                  </div>
                </div>
              </div>

              <div className="col-md-7">
                <div className="card">
                  <div className="card-body">
                    { schedule }
                  </div>
                </div>
              </div>

              <div className="col-md-5">
                <div className="card">
                  <div className="card-body">
                    { diagram }
                  </div>
                </div>
              </div>

            </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    alertSaccess: (text) => dispatch(alertSaccess(text)),
    getCustomers: (year, token) => dispatch(getCustomers(year, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAnalisis);
