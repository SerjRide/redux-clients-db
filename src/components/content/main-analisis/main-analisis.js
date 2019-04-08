import React, { Component } from 'react';

import {
  XYPlot, VerticalGridLines, Hint,
  HorizontalGridLines, XAxis, YAxis,
  Crosshair, RadialChart, VerticalBarSeries
} from 'react-vis';

import { connect } from 'react-redux';
import { alertSaccess, getCustomers } from '../../../actions';
import '../../../../node_modules/react-vis/dist/style.css';

const mounths_names = [
  'Янв.','Фев.','Март',
  'Апр.','Май','Июнь',
  'Июль','Авг.','Сен.',
  'Окт.','Ноя.','Дек.'
];

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
      schedule: 'orders',
      local_filter: { year: '0', mounth: '' }
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
        forSchedule : this.getSchedule(),
        local_filter: { year, mounth },
        diagram_value: false
      });
    }
  };

  days_names = (pos) => {
    const { year, mounth } = this.props.state.filter
    let arr = [];
    for (let i = 0; i <= 31; i++) {
      arr[i] = `${('0' + (i + 1)).slice(-2)}.${mounth}.${year}`
    }
    return arr[pos];
  }

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
              if (type === 'price') {
                if (customers[i].date[j].passed === true) {
                  res += customers[i].date[j].price;
                }
              }
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
    let { year, mounth } = this.props.state.filter;
    let periods = 12;
    if (year === '0') periods = 4;
    if (year !== '0' && mounth !== '') periods = 31;
    let arr = [];
    arr[0] = [];
    for (let i = 0; i < periods; i++) {
      let year_condition = year;
      let mounth_condition = ('0' + (i + 1)).slice(-2);
      let day_condition = '', x_name = mounths_names[i];

      if (year === '0') {
        year_condition = i + 16 + '';
        mounth_condition = ''
        x_name = '20' + (i + 16);
      }

      if (year === '0' && schedule === 'customers') {
        mounth_condition = '';
        year_condition = i + 16 + '';
      }

      if (year === '0' && schedule === 'price') {
        year_condition = i + 16 + '';
        mounth_condition = '';
      }

      if (mounth !== '' && year !== '0') {
        x_name = this.days_names(i);
        mounth_condition = mounth;
        day_condition = ('0' + (i + 1)).slice(-2);
      }

      arr[0][i] = {
        x: x_name,
        y: this.getGlobal(schedule, year_condition, mounth_condition, day_condition)
      };
    }
    return arr;
  }

  changeSchedule = () => {
    const { value } = this.selectSchedule;
    this.setState({ forSchedule : this.getSchedule(value) });
  }

  render() {
    const { year } = this.props.state.filter;
    const { year: local_year, mounth: local_mounth } = this.state.local_filter;
    const { forSchedule } = this.state
    let changed_text = (year !== '0') ? 'Новых клиентов:' : 'Всего клиентов:';


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
          <h6>От прошлого периода:</h6>
          <h3>{ this.state.percent }%</h3>
        </div>
        <div className="col-md-2">
          <h6>Выручка:</h6>
          <h3>{ this.state.price } ₽</h3>
        </div>
      </div>
    )

    const schedule = (
      <div className="schedule">
        <select
          ref={ (e) => {this.selectSchedule = e } }
          onChange={ this.changeSchedule }>
          <option value="orders">Количесто заказов за период</option>
          <option value="customers">Новых клиентов за период</option>
          <option value="price">Выручки за период</option>
        </select>
        <div>
        <XYPlot xType="ordinal" height={300} width={650}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickLabelAngle={
            (local_year !== '0' && local_mounth !== '') ? -45 : 0
          }/>
          <YAxis />
          <VerticalBarSeries
            data = { forSchedule[0] }
            onNearestX = { (value, {index} ) =>
              this.setState({
                crosshairValues: forSchedule.map(d => d[index])
              })
            }/>
          <Crosshair values={ this.state.crosshairValues }/>
        </XYPlot>
        </div>
      </div>
    );

    const { diagram_value: value } = this.state
    const forDiagram = [
      {angle: 1, color: '#89DAC1', name: 'green', opacity: 0.2},
      {angle: 2, color: '#F6D18A', name: 'yellow'},
      {angle: 5, color: '#1E96BE', name: 'cyan'},
      {angle: 3, color: '#DA70BF', name: 'magenta'},
      {angle: 5, color: '#F6D18A', name: 'yellow again'}
    ];

    const diagram = (
      <div className="diagram">
        <select
          ref={ (e) => {this.selectDiagram = e } }
          onChange={ this.changeDiagram }>
          <option value="orders">Количесто заказов за период</option>
          <option value="customers">Новых клиентов за период</option>
          <option value="price">Выручки за период</option>
        </select>
        <div>
        <RadialChart
      colorType={'literal'}
      colorDomain={[0, 100]}
      colorRange={[0, 10]}
      margin={{top: 100}}
      getLabel={d => d.name}
      data={forDiagram}
      labelsRadiusMultiplier={1.1}
      labelsStyle={{fontSize: 16, fill: '#222'}}
      showLabels
      style={{stroke: '#fff', strokeWidth: 2}}
      width={400}
      height={300}
    />
        </div>
      </div>
    );

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
