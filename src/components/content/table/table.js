import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../../actions';
import { getProductsNames } from '../../../service';

class Table extends Component {

  constructor(props) {
    super(props);
    const { year } = this.props.state.period
    this.props.getData(year);
  }

  mounthFilter = () => {
    const { orders } = this.props.state
    const { mounth } = this.props.state.period
    if (mounth.length === 0) return orders;
    return orders.filter((item) => {
      const state_mounth = item.date.slice(3,5);
      return state_mounth === mounth;
    })
  }

  dayFilter = (obj) => {
    const day = ('0' + this.props.state.period.day).slice(-2)
    if (day === '0' || day === '00') return obj;
    return obj.filter((item) => {
      const state_day = item.date.slice(0,2);
      return state_day === day;
    })
  }

  render() {
    const { orders } = this.props.state;
    const { length } = orders;
    let items;

    if (length !== 0) {

      const mounth_filter = this.mounthFilter();
      const day_filter = this.dayFilter(mounth_filter);
      items = day_filter.map((item, i) => {
        return (
          <tr key={ item._id }>
            <th>{ item.namber }</th>
            <td>{ item.customer }</td>
            <td>{ item.date }</td>
            <td>{ item.name }</td>
            <td>{ item.contacts }</td>
            <td>{ getProductsNames(item) }</td>
            <td>{ item.price }</td>
          </tr>
        )
      });
    }

    return (
      <div className="table">
      <table className="table table-hover table-sm">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Заказчик</th>
            <th scope="col">Дата заказа</th>
            <th scope="col">Контактное лицо</th>
            <th scope="col">Почта/телефон</th>
            <th scope="col">Товары</th>
            <th scope="col">Цена</th>
          </tr>
        </thead>
        <tbody>{ items }</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ state: state });
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (url) => dispatch(getData(url))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
