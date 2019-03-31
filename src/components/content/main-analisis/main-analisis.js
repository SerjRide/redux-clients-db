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
    this.props.getCustomers(year);
    this.state = {
      crosshairValues: []
    };
  };

  getGlobal = (type) => {
    const { customers } = this.props.state
    let res = 0;
    for (let i = 0; i < customers.length; i++) {
      res += (type === 'orders') ? customers[i].date.length : null
      if (type === 'price') for (let j = 0; j < customers[i].date.length; j++) {
        res += customers[i].date[j].price
      }
      if (type === 'customers') res = customers.length;
    }
    return res;
  }

  render() {

    const DATA = [
      [
        {x: 1, y: 10},
        {x: 2, y: 7},
        {x: 3, y: 15}
      ]
    ];

    const myData = [
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
          <h3>{ this.getGlobal('orders') }</h3>
        </div>
        <div className="col-md-2">
          <h6>Новых клиентов:</h6>
          <h3>{ this.getGlobal('customers') }</h3>
        </div>
        <div className="col-md-2">
          <h6>Прошлый год:</h6>
          <h3>100%</h3>
        </div>
        <div className="col-md-2">
          <h6>Сумма:</h6>
          <h3>{ this.getGlobal('price') } Р</h3>
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
          <LineSeries data = {DATA[0]}
            onNearestX = {(value, {index} ) =>
              this.setState( {crosshairValues: DATA.map(d => d[index])} )}/>
          <LineSeries data = {DATA[1]}/>
          <Crosshair values={ this.state.crosshairValues }/>
        </XYPlot>
        </div>
      </div>
    )

    const diagram = (
      <div>
        <h6>Статистика</h6>
        <div>
          <RadialChart data={myData} height={300} width={490} />
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
    getCustomers: (year) => dispatch(getCustomers(year))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAnalisis);
