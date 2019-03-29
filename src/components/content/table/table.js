import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../../actions';
import { getProductsNames } from '../../../service';

class Table extends Component {

  constructor(props) {
    super(props);
    const { year } = this.props.state.filter
    this.props.getData(year);
    this.state = { col: 'date', method: true }
  }

  mounthFilter = () => {
    const { orders } = this.props.state;
    const { mounth } = this.props.state.filter;
    if (mounth.length === 0) return orders;
    return orders.filter((item) => {
      const state_mounth = item.date.slice(3,5);
      return state_mounth === mounth;
    })
  }

  dayFilter = (obj) => {
    const day = ('0' + this.props.state.filter.day).slice(-2)
    if (day === '0' || day === '00') return obj;
    return obj.filter((item) => {
      const state_day = item.date.slice(0,2);
      return state_day === day;
    })
  }

  infoFilter = (obj) => {
    const { info } = this.props.state.filter;
    if (info.length === 0) return obj;
    return obj.filter((item) => {
      return item.customer.toLowerCase()
                 .indexOf(info.toLowerCase()) > -1
    })
  }

  sortOrders = (obj, type, method = true) => {
    const compare = (a, b) => {
      let val_a, val_b, var_1, var_2, comparison;

      switch(type) {
        case 'product':
          val_a = a[type][0].toUpperCase();
          val_b = b[type][0].toUpperCase();
          break;
        case 'date':
          val_a = a[type].slice(3,-3);
          val_b = b[type].slice(3,-3);
          break;
        case 'dateDay':
          val_a = a.date.slice(0,2);
          val_b = b.date.slice(0,2);
          break;
        case 'price':
          val_a = a[type];
          val_b = b[type];
          break;
        default:
          val_a = a[type].toUpperCase();
          val_b = b[type].toUpperCase();
      }

      if (method) { var_1 = 1; var_2 = -1 }
      else { var_1 = -1; var_2 = 1 }

      if (val_a > val_b) comparison = var_1;
      else if (val_a < val_b) comparison = var_2;


      return comparison;
    }
    if (type === "date") this.sortOrders(obj.sort(compare), 'dateDay', method);
    return obj.sort(compare)
  }

  changeSort = (e) => {
    let col = e.target.getAttribute('data-name'), method;
    if (e.target.tagName !== 'TH') return null;
    if (e.target.lastChild.className === 'fas fa-caret-down'){
      e.target.lastChild.className = 'fas fa-caret-up'
    } else e.target.lastChild.className = 'fas fa-caret-down'
    if (this.state.method) method = false;
    else  method = true

    this.setState({ col, method })
  }

  renderRow = () => {
    const { col, method } = this.state;
    const { orders } = this.props.state;
    const { length } = orders;
    let items;

    if (length !== 0) {

      const mounth_filter = this.mounthFilter();
      const day_filter = this.dayFilter(mounth_filter);
      const info_filter = this.infoFilter(day_filter);
      this.sortOrders(info_filter, col, method);
      items = info_filter.map((item, i) => {
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
    return items;
  }

  render() {
    const items = this.renderRow();
    let type = 'down';
    return (
      <div className="table">
      <table className="table table-hover table-sm">
        <thead>
          <tr className="sort-btn">
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="namber">
              № <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="customer">
              Заказчик <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="date">
              Дата заказа <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="name">
              Контактное лицо <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="contacts">
              Почта/телефон <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="product">
              Товары <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="price">
              Цена <i className={`fas fa-caret-${type}`}></i></th>
          </tr>
        </thead>
        <tbody>{ items }</tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => {
  return {
    getData: (url) => dispatch(getData(url))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Table);
