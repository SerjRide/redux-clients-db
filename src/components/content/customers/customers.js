import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomers } from '../../../actions';

class Customers extends Component {

  constructor(props) {
    super(props);
    const { year } = this.props.state.filter
    const token = localStorage.getItem('token')
    this.props.getCustomers(year, token);
    this.state = { col: 'date', method: true, dateType: '' }
  }

  addExtra = (obj) => {
    const newArr = obj;
    for (let i = 0; i < newArr.length; i++) {
      newArr[i].total_amount = 0;
      newArr[i].true_amount = 0;
      for (let j = 0; j < obj[i].date.length; j++) {
        newArr[i].total_amount += obj[i].date[j].price
        if (obj[i].date[j].passed) {
          newArr[i].true_amount += obj[i].date[j].price
        }
      }
    }
    for (let i = 0; i < newArr.length; i++) {
      const  TruA = newArr[i].true_amount,
             TotA = newArr[i].total_amount;
      newArr[i].count = newArr[i].date.length
      newArr[i].deviation = TruA - TotA
      newArr[i].percent = Number(((TruA / TotA) * 100).toFixed())
    }
    return newArr;
  }

  dateFilter = () => {
    const { customers } = this.props.state;
    const { year, mounth } = this.props.state.filter;
    if (year === '0') return customers;
    let newArr = []
    for (let i = 0; i < customers.length; i++) {
      let obj = {};
      obj._id = customers[i]._id
      obj.customer = customers[i].customer;
      obj.date = [];
      for (let j = 0; j < customers[i].date.length; j++) {
        let date_item = {}
        if (customers[i].date[j].date.slice(-2) === year) {
          const expression = customers[i].date[j].date.slice(3, 5)
          let condition = (mounth === '') ? mounth : expression;
          if(condition === mounth) {
            date_item.date = customers[i].date[j].date;
            date_item.price = customers[i].date[j].price;
            date_item.passed = customers[i].date[j].passed;
            obj.date.push(date_item);
          }
        }
      }
      if (obj.date.length !== 0) newArr.push(obj);
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
          val_a = a[type][col_a].date.slice(6);
          val_b = b[type][col_b].date.slice(6);
          break;
        case 'dateMounth':
          if (dateType === 'first') { col_a = 0; col_b = 0 }
          else { col_a = a.date.length - 1; col_b = b.date.length - 1 };
          val_a = a.date[col_a].date.slice(3,-3);
          val_b = b.date[col_b].date.slice(3,-3);
          break;
        case 'dateDay':
          if (dateType === 'first') { col_a = 0; col_b = 0 }
          else { col_a = a.date.length - 1; col_b = b.date.length - 1 };
          val_a = a.date[col_a].date.slice(0,2);
          val_b = b.date[col_b].date.slice(0,2);
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
      const date_filter = this.dateFilter()
      const newArr = this.addExtra(date_filter);
      const info_filter = this.infoFilter(newArr);
      this.sortCustomers(info_filter, col, method);
      items = info_filter.map((item, i) => {
        const condition = (item.true_amount - item.total_amount < 0 )
        let color = condition ? 'text-danger' : 'text-success'
        return (
          <tr key={ item._id }>
            <td>{ item.customer }</td>
            <td>{ item.count }</td>
            <td>{ item.date[0].date }</td>
            <td>{ item.date[item.date.length - 1].date }</td>
            <td>{ `${item.true_amount} ₽` }</td>
            <td>{ `${item.total_amount} ₽` }</td>
            <td className = { color }>
                { `${item.deviation} ₽` }
            </td>
            <td>{ `${item.percent} %` }</td>
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
              Заказы <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="date" data-type="first">
              Первый<i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="date" data-type="last">
              Последний<i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="true_amount">
              Выполненные <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="total_amount">
              Общая Сумма <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="deviation">
              Отклонение <i className={`fas fa-caret-${type}`}></i></th>
            <th onClick={ (e) => this.changeSort(e) } scope="col"
              data-name="percent">
              % <i className={`fas fa-caret-${type}`}></i></th>
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
    getCustomers: (year, token) => dispatch(getCustomers(year, token))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
