import React, { Component } from 'react';
import { connect } from 'react-redux';
import { timestampToDate } from '../../../service'
import { getData } from '../../../actions';
import ContactsInfo from './contacts-info';
import VisitCard from './visit-card';

class AddOrder extends Component {

  state = {
    products: []
  }

  addProduct = (obj) => {
    const products = this.state.products;
    products.push(obj)
    this.setState({ products: products });
  };

  addOrder = () => {
    const customer = document.getElementById('inputCustomer').value;
    const date = Date.now();
    const name = document.getElementById('inputName').value;
    const contacts = document.getElementById('inputContacts').value;
    const { products } = this.state
    const price = 1000;
    const obj = {
      namber: 19666,
      customer: customer,
      date: date,
      name: name,
      contacts: contacts,
      product: products,
      price: price
    }
    console.log(timestampToDate(date))
    console.log(obj)
  }

  render() {
    const { products } = this.state
    const { length } = products
    let product = <VisitCard addProduct={ this.addProduct }/>
    let newProduct, addOrederButton;

    if (length !== 0) {
      newProduct = products.map((item, i) => {
        let viewBorder, viewLam
        if (item.border) viewBorder = <p>Со скругленными уграми</p>
        if (item.lam !== '') viewLam = <p>{ item.lam } ламинация</p>
        return (
          <div key={ i }>
            <h4><span className="badge badge-success">
              { item.name }
            </span></h4>
            <p>
              <span>{ item.count } шт. </span>
              <span>({ item.colors })</span>
            </p>
            <p>{ item.tech }</p>
            <p>Бумага: { item.material }</p>
            { viewLam }
            { viewBorder }
            <p>Цена: 1000 руб.</p>
          </div>
        )
      });
      addOrederButton = (
        <button type="button"
          onClick={ this.addOrder }
          className="btn btn-success btn-sm">
          Добавить Заказ
        </button>
      )
    } else {
      newProduct = null;
    }

    return (
      <div className="add-order">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              Добавить заказ
            </div>
            <div className="card-body">
              <div className="row">

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <ContactsInfo />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      { product }
                    </div>
                  </div>
                </div>

                <div className="products-list col-md-12">
                  { newProduct }
                </div>

                <div className="products-list col-md-12">
                  { addOrederButton }
                </div>

              </div>
            </div>
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddOrder);
