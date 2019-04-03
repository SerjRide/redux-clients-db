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

import { alertSaccess, delData, getCustomers } from '../../../actions';

import '../../../../node_modules/react-vis/dist/style.css';

class MainAnalisis extends Component {

  constructor(props) {
    super(props);
    const { year } = this.props.state.filter
    const token = localStorage.getItem('token')
    this.props.getCustomers(year, token);
    this.state = {
      crosshairValues: []
    };
  };

  getGlobal = (type, year) => {
    const { customers } = this.props.state
    let res = 0;
    for (let i = 0; i < customers.length; i++) {

      switch (type) {
        case 'orders':
          for (let j = 0; j < customers[i].date.length; j++) {
            const expression = customers[i].date[j].date.slice(-2)
            let condition = (year === '0') ? year : expression;
            if (condition === year) {
              res += customers[i].date.length
            }
          }
          break;
        case 'price':
          for (let j = 0; j < customers[i].date.length; j++) {
            const expression = customers[i].date[j].date.slice(-2)
            let condition = (year === '0') ? year : expression;
            if (condition === year) {
              res += customers[i].date[j].price
            }
          }
          break;
        case 'customers' :
          for (let j = 0; j < customers[i].date.length; j++) {
            const expression = customers[i].date[j].date.slice(-2)
            let condition = (year === '0') ? year : expression;
            if (condition !== year) j = customers[i].date.length;
            else {
              res += 1;
              j = customers[i].date.length;
            }
          }
          break;
        case 'percent' :
          const this_year = this.getGlobal('customers', year);
          const all_year = this.getGlobal('customers', '0');
          res = Math.round((this_year / all_year) * 100);
          break;
        default :
          res = null;
      }

    }
    return res;
  }

  render() {
    const { year } = this.props.state.filter
    let changed_text = (year !== '0') ? 'Новых клиентов:' : 'Всего клиентов:'

    const forSchedule = [
      [
        {x: 1, y: 10},
        {x: 2, y: 7},
        {x: 3, y: 15}
      ]
    ];

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
          <p>Welcom to the SerjRide dashboard</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
        <div className="col-md-2">
          <h6>Всего заказов:</h6>
          <h3>{ this.getGlobal('orders', year) }</h3>
        </div>
        <div className="col-md-2">
          <h6>{ changed_text }</h6>
          <h3>{ this.getGlobal('customers', year) }</h3>
        </div>
        <div className="col-md-2">
          <h6>Прошлый период:</h6>
          <h3>{ this.getGlobal('percent', year) }%</h3>
        </div>
        <div className="col-md-2">
          <h6>Сумма:</h6>
          <h3>{ this.getGlobal('price', year) } ₽</h3>
        </div>
      </div>
    )

    const schedule = (
      <div>
        <h6>Статистика</h6>
        <div>
        <XYPlot height={300} width={650}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries data = {forSchedule[0]}
            onNearestX = {(value, {index} ) =>
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
    delData: (url) => dispatch(delData(url)),
    getCustomers: (year, token) => dispatch(getCustomers(year, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAnalisis);
