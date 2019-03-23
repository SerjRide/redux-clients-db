import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getData } from '../../../actions';
import { getProductsNames } from '../../../service';

class Table extends Component {

  constructor(props) {
    super(props);
    console.log('before');
    this.props.getData('getorders');
    console.log('after');
  }

  render() {
    const { orders } = this.props.state;
    const { length } = orders;
    let items;

    if (length !== 0) {

      items = orders.map((item, i) => {
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
