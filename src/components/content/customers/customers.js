import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllCustomers, extractCustomersByYeat } from '../../../actions';

class Customers extends Component {

  constructor(props) {
    super(props);
    // this.props.extractCustomersByYeat(17);
    this.props.getAllCustomers();
    this.state = { col: 'date', method: true, dateType: '' }
  }

  addCounts = () => {
    const newArr = this.props.state.customers;
    for (var i = 0; i < newArr.length; i++) {
      newArr[i].count = newArr[i].date.length
    }
    return newArr;
  }

  infoFilter = (obj) => {
    const { info } = this.props.state.filter;
    if (info.length === 0) return obj;
    return obj.filter((item) => {
      return item.customer.toLowerCase()
                 .indexOf(info.toLowerCase()) > -1
    })
  }

  sortCustomers = (obj, type, method = true) => {
    const compare = (a, b) => {
      const { dateType } = this.state
      let val_a, val_b, var_1, var_2, comparison, col_a, col_b;

      switch(type) {
        case 'customer':
          val_a = a[type].toUpperCase();
          val_b = b[type].toUpperCase();
          break;
        case 'date':
          if (dateType === 'first') { col_a = 0; col_b = 0 }
          else { col_a = a[type].length - 1; col_b = b[type].length - 1};
          val_a = a[type][col_a].slice(6);
          val_b = b[type][col_b].slice(6);
          break;
        case 'dateMounth':
          if (dateType === 'first') { col_a = 0; col_b = 0 }
          else { col_a = a.date.length - 1; col_b = b.date.length - 1 };
          val_a = a.date[col_a].slice(3,-3);
          val_b = b.date[col_b].slice(3,-3);
          break;
        case 'dateDay':
          if (dateType === 'first') { col_a = 0; col_b = 0 }
          else { col_a = a.date.length - 1; col_b = b.date.length - 1 };
          val_a = a.date[col_a].slice(0,2);
          val_b = b.date[col_b].slice(0,2);
          break;
        case 'price':
          val_a = a[type];
          val_b = b[type];
          break;
        default:
          val_a = a[type];
          val_b = b[type];
      }

      if (method) { var_1 = 1; var_2 = -1 }
      else { var_1 = -1; var_2 = 1 }

      if (val_a > val_b) comparison = var_1;
      else if (val_a < val_b) comparison = var_2;


      return comparison;
    }
    if (type === "date") this.sortCustomers(obj.sort(compare), 'dateMounth', method);
    if (type === "dateMounth") this.sortCustomers(obj.sort(compare), 'dateDay', method);
    return obj.sort(compare)
  }

  changeSort = (e) => {
    let col = e.target.getAttribute('data-name'), method;
    const dateType = e.target.getAttribute('data-type');
    if (e.target.tagName !== 'TH') return null;
    if (e.target.lastChild.className === 'fas fa-caret-down'){
      e.target.lastChild.className = 'fas fa-caret-up'
    } else e.target.lastChild.className = 'fas fa-caret-down'
    if (this.state.method) method = false;
    else  method = true

    this.setState({ col, method, dateType })
  }

  renderRow = () => {
    const { col, method } = this.state;
    const { customers } = this.props.state;
    const { length } = customers;
    let items;

    if (length !== 0) {

      const newArr = this.addCounts();
      const info_filter = this.infoFilter(newArr);
      this.sortCustomers(info_filter, col, method);
      items = info_filter.map((item, i) => {
        return (
          <tr key={ item._id }>
            <td>{ item.customer }</td>
            <td>{ item.count }</td>
            <td>{ item.date[0] }</td>
            <td>{ item.date[item.date.length - 1] }</td>
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
      <div className="customers">
      <table className="table table-hover table-sm">
        <thead>
          <tr className="sort-btn">
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="customer">
              Заказчик <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="count">
              Кол-во заказов <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="date" data-type="first">
              Первый заказ <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="date" data-type="last">
              Последний заказ <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="price">
              Сумма <i className={`fas fa-caret-${type}`}></i></th>
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
    getAllCustomers: () => dispatch(getAllCustomers()),
    extractCustomersByYeat: (year) => dispatch(extractCustomersByYeat(year))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
